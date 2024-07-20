import DataTable from 'react-data-table-component';
import { ChevronDoubleDownIcon } from '@heroicons/react/24/solid'
import { useContext, useState, useMemo } from 'react';
import SubHeaderTable from '../../../../../components/SubHeaderTable';
import { SummaryContext } from '../../../../../contexts/SummaryContext';
import CustomPaginator from '../../../../../components/CustomPaginator';
import '../../../style/DatableStyle.css'; 

function TableRevenues(props) {

    const columns = [

        {
            name: 'Data Recebimento',
            selector: row => row.receivingDate,
            sortable: true,
        },
        {
            name: 'Descrição',
            selector: row => row.category.description,
            sortable: true,
        },
        {
            name: 'Valor',
            selector: row => row.amount,
            sortable: true,
        }
    ];

    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(11);
    const { theme } = useContext(SummaryContext);

    const filteredItems = props.transactions.filter(
        item =>
            item.category.description && item.category.description.toLowerCase().includes(filterText.toLowerCase()) ||
            item.receivingDate && item.receivingDate.toLowerCase().includes(filterText.toLowerCase()) ||
            item.amount && item.amount.toLowerCase().includes(filterText.toLowerCase())
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
                onFilter={e => setFilterText(e.target.value)}
                onClear={handleClear}
                filterText={filterText}
            />
        );
    }, [filterText, resetPaginationToggle]);

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
            <div >
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
};

export default TableRevenues