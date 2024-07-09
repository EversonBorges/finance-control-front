import DataTable from 'react-data-table-component';
import { ChevronDoubleDownIcon } from '@heroicons/react/24/solid'
import { useEffect, useState, useMemo } from 'react';
import ThemeService from '../../../../../utils/style';
import SubHeaderTable from '../../../../../components/SubHeaderTable';

function TableRevenues(props) {

    ThemeService.themeDark
    ThemeService.themeLight

    const columns = [

        {
            name: 'Descrição',
            selector: row => row.category.description,
            sortable: true,
        },
        {
            name: 'Valor',
            selector: row => row.amount,
            sortable: true,
        },
        {
            name: 'Data Recebimento',
            selector: row => row.receivingDate,
            sortable: true,
        }
    ];

    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const [theme, setTheme] = useState()

    const filteredItems = props.transactions.filter(
        item => item.category.description && item.category.description.toLowerCase().includes(filterText.toLowerCase()),
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

    useEffect(() => {
        setTheme(document.getElementsByClassName('dark').length === 1 ? 'dark' : 'light')
    }, [theme])

    return (
        <DataTable
            columns={columns}
            data={filteredItems}
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
            pagination={true}
            paginationPerPage={10}
            paginationRowsPerPageOptions={[5, 10, 15, 20]}
            paginationComponentOptions={{ rowsPerPageText: 'Linhas por página:', rangeSeparatorText: 'de', selectAllRowsItemText: 'Todos' }}
            FixedHeader={true}
            theme={theme}
            noContextMenu={true}
            subHeader={true}
            subHeaderComponent={subHeaderComponentMemo}
            subHeaderAlign="center"
            subHeaderWrap={false}
            noHeader={true}
        />
    );
};

export default TableRevenues