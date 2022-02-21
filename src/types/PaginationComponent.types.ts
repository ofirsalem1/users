export type PaginationComponentProps = {
  productsPerPage: number;
  totalProducts: number;
  paginate: (pageNumber: number) => void;
};
