export interface IQueryFilterEntity {
  field: string;
  operator: string;
  value: string;
}

export interface IQueryEntity {
  // Projection
  fields: string[] | null;

  // Pagination
  skip: string | null;
  limit: number;

  // Sort
  index: string | null;

  // Filters
  filters: IQueryFilterEntity[];
}

export type IQuery = IQueryEntity | null;
