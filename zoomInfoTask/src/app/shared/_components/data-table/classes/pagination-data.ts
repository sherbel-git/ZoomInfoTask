export class PaginationData {
  totalPages: number;
  totalItems: number;
  limit: number;
  currentPage: number;

  constructor(limit?: number, currentPage?: number) {
    this.limit = limit ? limit : 2;
    this.currentPage = currentPage && currentPage > 1 ? currentPage : 1;
  }
}
