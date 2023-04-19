/**
 * Api Filter Configuration
 */
export interface IApiFilter {
  type: "string" | "number" | "date";
  availableOperations: string[];
}

export interface IApiFilters {
  [field: string]: IApiFilter;
}

/**
 * Api Configuration
 */
export interface IApiConfig {
  // Projection
  availableFields: string[];

  // Pagination
  defaultLimit: number;
  maxLimit: number;

  // Sort
  availableIndexes: string[];

  // Filter
  availableFilters: IApiFilters;
}
