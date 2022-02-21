import './paginationComponent.css';
import Pagination from '@mui/material/Pagination';
import { PaginationComponentProps } from '../../types/PaginationComponent.types';

const PaginationComponent = ({
  productsPerPage,
  totalProducts,
  paginate,
}: PaginationComponentProps) => {
  const pageNumbers = Math.ceil(totalProducts / productsPerPage); // total number of page
  return (
    <div className="pagination-div">
      <Pagination
        count={pageNumbers}
        onChange={(event: React.ChangeEvent<unknown>, page: number) => {
          paginate(page);
        }}
      />
    </div>
  );
};

export default PaginationComponent;
