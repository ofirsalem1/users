export type PaginationComponentProps = {
  usersPerPage: number;
  totalUsers: number;
  paginate: (pageNumber: number) => void;
};
