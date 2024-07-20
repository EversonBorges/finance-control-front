import DataTable  from 'react-data-table-component';
import { ChevronDoubleDownIcon} from '@heroicons/react/24/solid'
import { useContext, useState, useMemo } from 'react';
import Switch from '../../../../components/Switch';
import SubHeaderTable from '../../../../components/SubHeaderTable';
import { SummaryContext } from '../../../../contexts/SummaryContext';
import '../../style/DatableStyle.css';
import CustomPaginator from '../../../../components/CustomPaginator';

function TableCategory(props) {

    const columns = [
        {
            name: 'Descrição',
            selector: row => row.description,
            sortable: true,
            width:'200px'
        },
        {
            name: 'Classificação',
            selector: row => row.classification,
            sortable: true,
            width:'120px'
        },
        {
            name: 'Tipo',
            selector: row => row.type,
            sortable: true,
            width:'50px'
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

    const filteredItems = props.categories.filter(
        item => item.description && item.description.toLowerCase().includes(filterText.toLowerCase()) ||
                item.classification && item.classification.toLowerCase() === filterText.toLowerCase() ||
                item.type && item.type.toLowerCase() === filterText.toLowerCase()
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
                show={true}
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

export default TableCategory