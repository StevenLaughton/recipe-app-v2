export type PaginatedList<T> = {
  hasNextPage: boolean;
  data: T[]
};
