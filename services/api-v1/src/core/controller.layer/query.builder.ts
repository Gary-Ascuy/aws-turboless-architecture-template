import { GirisQuery, ServerlessEvent } from "core-functions";

import { IQueryDto, IQueryFilterDto } from "./dto/query.dto";
import { IApiConfig } from "./api.configuration";

export function buildFields(
  query: GirisQuery,
  config: Pick<IApiConfig, "availableFields">
): IQueryDto["fields"] {
  if (!query?.fields) {
    return null;
  }

  const { fields } = query;
  const value = fields.pop();
  if (!value) {
    return null;
  }

  const { availableFields: allFields } = config;
  const isValidField = (field: string): boolean => allFields.includes(field);

  const result = value.split(",").filter(isValidField);
  if (result.length === 0) {
    return null;
  }
  return result;
}

export function getSafeValue(
  initialValue: number | string | null | undefined,
  minValue: number,
  maxValue: number,
  defaultValue: number
): number {
  if (!initialValue) {
    return defaultValue;
  }

  const value = Number(initialValue);
  if (Number.isNaN(value)) {
    return defaultValue;
  }
  if (value < minValue) {
    return minValue;
  }
  if (value > maxValue) {
    return maxValue;
  }

  return value;
}

export function buildPagination(
  query: GirisQuery,
  config: Pick<IApiConfig, "defaultLimit" | "maxLimit">
): Pick<IQueryDto, "limit" | "skip"> {
  const { maxLimit, defaultLimit } = config;
  const skip = query?.skip?.pop() || null;
  const limit = getSafeValue(query?.limit?.pop(), 1, maxLimit, defaultLimit);
  return { skip, limit };
}

export function buildSort(
  query: GirisQuery,
  config: Pick<IApiConfig, "availableIndexes">
): IQueryDto["index"] {
  if (!query?.sort) {
    return null;
  }
  const values = query?.sort;
  const sort = values.filter(Boolean).pop();
  const { availableIndexes: indexes } = config;
  return sort && indexes.includes(sort) ? sort : null;
}

export function buildFilter(item: string): IQueryFilterDto | null {
  const pattern = /:(\$eq|\$ne|\$gt|\$gte|\$lt|\$lte|\$nin|\$nin):/i;
  const values = item.split(pattern);

  // Just ignore if it does not have 2 operands and operator
  if (values.length !== 3) {
    return null;
  }

  const [field, operator, value] = values;
  return { field, operator, value };
}

export function buildFilters(
  query: GirisQuery,
  config: Pick<IApiConfig, "availableFilters">
): IQueryFilterDto[] {
  if (!query?.filter) {
    return [];
  }

  const values = query?.filter;

  const allFields = Object.keys(config.availableFilters);
  const isValidField = (field: string): boolean => allFields.includes(field);
  const filters: IQueryFilterDto[] = values
    .map(buildFilter)
    .filter(Boolean) as IQueryFilterDto[];

  return filters.filter((filter) => {
    const isValid = filter?.field && isValidField(filter?.field);
    if (!isValid) {
      return false;
    }

    const fieldConfig = config.availableFilters[filter.field];
    const operations = fieldConfig.availableOperations;
    return operations.includes(filter.operator);
  });
}

export function buildQueryMetadata(
  query: GirisQuery,
  config: IApiConfig
): IQueryDto {
  return {
    fields: buildFields(query, config),
    ...buildPagination(query, config),
    index: buildSort(query, config),
    filters: buildFilters(query, config),
  };
}

export function getQuery(
  event: ServerlessEvent | ServerlessEvent<object>,
  config: IApiConfig
): IQueryDto {
  const query = event.multiValueQueryStringParameters;
  return buildQueryMetadata(query, config);
}
