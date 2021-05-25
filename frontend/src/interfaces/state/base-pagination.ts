export default interface BasePagination<T> {
    docs: Array<T>;
    total: number | undefined;
    limit: number | undefined;
    page: number | undefined;
    pages: number | undefined;
  }
  