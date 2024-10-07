import { Box, Pagination } from '@mui/material';
import React from 'react';

interface PaginationComponentProps {
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

const PaginationComponent: React.FC<PaginationComponentProps> = ({
  totalItems,
  currentPage,
  itemsPerPage,
  onPageChange,
}) => {
  return (
    <Box display="flex" justifyContent="center" marginTop={2} marginBottom={4}>
      <Pagination
        count={Math.ceil(totalItems / itemsPerPage)}
        page={currentPage}
        onChange={onPageChange}
        shape="rounded"
      />
    </Box>
  );
};

export default PaginationComponent;
