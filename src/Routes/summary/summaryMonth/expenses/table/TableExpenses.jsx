import React, { useEffect, useState, useMemo, useContext } from 'react';
import DataTable from 'react-data-table-component';
import { ChevronDoubleDownIcon } from '@heroicons/react/24/solid';
import SubHeaderTable from '../../../../../components/SubHeaderTable';
import { SummaryContext } from '../../../../../contexts/SummaryContext';
import CustomPaginator from '../../../../../components/CustomPaginator'; // Importar o paginator personalizado
import '../../../style/DatableStyle.css'; // Importar o arquivo CSS

function TableExpenses(props) {
  const columns = [
    {
      name: 'Data',
      selector: row => row.transactionDate,
      sortable: true,
    },
    {
      name: 'Estabelecimento',
      selector: row => row.establishment,
      sortable: true,
      width:'200px'
    },
    {
      name: 'Categoria',
      selector: row => row.category.description,
      sortable: true,
    },
    {
      name: 'Método pagamento',
      selector: row => row.paymentMethods,
      sortable: true,
      width:'150px'
    },
    {
      name: 'Cartão crédito',
      selector: row => row.creditCard?.name,
      sortable: true,
    },
    {
      name: 'Nº parcela',
      selector: row => row.numberInstallment,
      sortable: true,
    },
    {
      name: 'Parcelas',
      selector: row => row.quantityInstallments,
      sortable: true,
    },
    {
      name: 'Valor',
      selector: row => row.valuesInstallment,
      sortable: true,
    },
    {
      name: 'Classificação',
      selector: row => row.category.classification,
      sortable: true,
    },
    {
      name: 'Semana',
      selector: row => row.week,
      sortable: true,
    }
  ];

  const [filterText, setFilterText] = useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(11);
  const { theme } = useContext(SummaryContext);

  const filteredItems = props.transactions.filter(
    item => item.establishment && item.establishment.toLowerCase().includes(filterText.toLowerCase()) ||
            item.category.description && item.category.description.toLowerCase().includes(filterText.toLowerCase()) ||
            item.category.classification && item.category.classification.toLowerCase() === filterText.toLowerCase() ||
            item.transactionDate && item.transactionDate.toLowerCase().includes(filterText.toLowerCase()) ||
            item.paymentMethods && item.paymentMethods.toLowerCase().includes(filterText.toLowerCase()) ||
            item.creditCard?.name && item.creditCard?.name?.toLowerCase().includes(filterText.toLowerCase()) ||
            item.valuesInstallment && item.valuesInstallment.toLowerCase().includes(filterText.toLowerCase()) ||
            item.week && item.week.toLowerCase().includes(filterText.toLowerCase())
  );

  const subHeaderComponentMemo = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText('');
      }
    };

    return (
      <SubHeaderTable
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  useEffect(() => {
    setFilterText(props.filter);
  }, [props.filter]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleRowsPerPageChange = (rows) => {
    setRowsPerPage(rows);
    setCurrentPage(1); // Reset to first page when rows per page changes
  };

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentData = filteredItems.slice(startIndex, endIndex);

  return (
    <div className="table-container  h-[500px]">
      <div className="table-content">
        <DataTable
          columns={columns}
          data={currentData}
          highlightOnHover={true}
          pointerOnHover={true}
          dense={true}
          striped={true}
          noDataComponent={"Não há dados"}
          onRowDoubleClicked={(row) => props.onClick(row)}
          sortIcon={<ChevronDoubleDownIcon />}
          selectableRowsHighlight
          selectableRowsNoSelectAll
          selectableRowsSingle
          FixedHeader={true}
          theme={theme}
          noContextMenu={true}
          subHeader={true}
          subHeaderComponent={subHeaderComponentMemo}
          subHeaderAlign="center"
          subHeaderWrap={false}
          noHeader={true}
        />
      </div>
      <div>
        <CustomPaginator
          currentPage={currentPage}
          rowsPerPage={rowsPerPage}
          totalRows={filteredItems.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          padding='py-3'
        />
      </div>
    </div>
  );
}

export default TableExpenses;
