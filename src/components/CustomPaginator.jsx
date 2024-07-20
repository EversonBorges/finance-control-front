import React from 'react';
import { ChevronDoubleLeftIcon, ChevronLeftIcon, ChevronRightIcon, ChevronDoubleRightIcon} from '@heroicons/react/24/solid';

const CustomPaginator = ({ currentPage, rowsPerPage, totalRows, onPageChange, onRowsPerPageChange, padding }) => {
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  const handleFirstPage = () => {
    onPageChange(1);
  };

  const handleLastPage = () => {
    onPageChange(totalPages);
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      onPageChange(page);
    }
  };

  let style ='h-5 sm:h-6  text-gray-900 dark:text-gray-100 block cursor-pointer sm:hover:scale-110'

  return (
    <div className={`flex flex-row items-center justify-center bg-gray-300 dark:bg-dark-200 gap-1 ${padding}`}>
      <ChevronDoubleLeftIcon onClick={handleFirstPage} disabled={currentPage === 1} className={style}/>
      <ChevronLeftIcon onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className={style}/>
      <span className='text-gray-900 dark:text-gray-100'>{`Página ${currentPage} de ${totalPages}`}</span>
      <ChevronRightIcon onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className={style}/>
      <ChevronDoubleRightIcon onClick={handleLastPage} disabled={currentPage === totalPages} className={style}/>
      <span className='text-gray-900 dark:text-gray-100'>{`${totalRows} itens`}</span>
    </div>
  );
};

export default CustomPaginator;
