import './paginationComponent.css';
import Pagination from '@mui/material/Pagination';
import { PaginationComponentProps } from './PaginationComponent.types';

const PaginationComponent = ({
  usersPerPage,
  totalUsers,
  paginate,
  page: currentPage,
}: PaginationComponentProps) => {
  const pageNumbers = Math.ceil(totalUsers / usersPerPage); // total number of page
  return (
    <div className="pagination-div">
      <Pagination
        count={pageNumbers}
        page={currentPage}
        onChange={(event: React.ChangeEvent<unknown>, page: number) => {
          paginate(page);
        }}
      />
    </div>
  );
};

export default PaginationComponent;
