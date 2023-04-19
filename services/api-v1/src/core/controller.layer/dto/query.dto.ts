export interface IQueryFilterDto {
  field: string;
  operator: string;
  value: string;
}

export interface IQueryDto {
  // Projection
  fields: string[] | null;

  // Pagination
  skip: string | null;
  limit: number;

  // Sort
  index: string | null;

  // Filters
  filters: IQueryFilterDto[];
}
