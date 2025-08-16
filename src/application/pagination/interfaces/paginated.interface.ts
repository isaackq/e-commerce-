export interface Paginated<T> {
  data: T[];
  meta: {
    itemsPerPage: number;
    totalItems: number;
    cuurentPage: number;
    totalPages: number;
  };

  links: {
    first: string;
    last: string;
    cuurent: string;
    next: string;
    previous: string;
  };
}
