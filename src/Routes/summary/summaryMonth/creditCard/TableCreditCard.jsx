import DataTable  from 'react-data-table-component';
import { ChevronDoubleDownIcon, FunnelIcon, XCircleIcon } from '@heroicons/react/24/solid'
import { useContext, useState, useMemo } from 'react';
import Switch from '../../../../components/Switch';
import SubHeaderTable from '../../../../components/SubHeaderTable';
import { SummaryContext } from '../../../../contexts/SummaryContext';
import '../../style/DatableStyle.css';
import CustomPaginator from '../../../../components/CustomPaginator';

function TableCreditCard(props) {

    const columns = [
        {
            name: 'Nome',
            selector: row => row.name,
            sortable: true,
             width:'150px'
        },
        {
            name: 'Bandeira',
            selector: row => row.flag,
            sortable: true,
             width:'150px'
        },
        {
            name: 'Dia compra',
            selector: row => row.dueDate,
            sortable: true,
             width:'100px'
        },
        {
            name: 'Vencimento',
            selector: row => row.referenceDayPurchase,
            sortable: true,
             width:'100px'
        },
        {
            name: 'Ativo',
            button: true,
            cell: row => <Switch checked={row.active} disabled={true}/>,
             width:'70px'
         }
    ];

    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const { theme } = useContext(SummaryContext);

    const filteredItems = props.creditCards?.filter(
        item => item.name && item.name.toLowerCase().includes(filterText.toLowerCase()) ||
                item.flag && item.flag.toLowerCase().includes(filterText.toLowerCase()) ||
                item.dueDate && item.dueDate === Number(filterText) ||
                item.referenceDayPurchase && item.referenceDayPurchase === Number(filterText)
    );

    const subHeaderComponentMemo = useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText('');
            }
        };

        return (
            <div className='f'>
                <SubHeaderTable
                onFilter={e => setFilterText(e.target.value)}
                onClear={handleClear}
                filterText={filterText}
            />
            </div>
   
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
        <div className="table-container  h-[300px]">
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
                    padding='py-2'
                />
            </div>
        </div>
    );
};

export default TableCreditCard