import DataTable  from 'react-data-table-component';
import { ChevronDoubleDownIcon, FunnelIcon, XCircleIcon } from '@heroicons/react/24/solid'
import { useEffect, useState, useMemo } from 'react';
import Switch from '../../../../components/Switch';
import ThemeService from '../../../../utils/style';
import SubHeaderTable from '../../../../components/SubHeaderTable';

function TableCategory(props) {

    ThemeService.themeDark
    ThemeService.themeLight

    const columns = [
        {
            name: 'Nome usuário',
            selector: row => row.description,
            sortable: true,
        },
        {
            name: 'Ativo',
            button: true,
            cell: row => <Switch handleChange={handleChange} checked={row.active} disabled={true}/>,
         }
    ];

    const [theme, setTheme] = useState()
    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

    const filteredItems = props.userCard.filter(
        item => item.description && item.description.toLowerCase().includes(filterText.toLowerCase()),
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
    
    useEffect(() => {
        setTheme(document.getElementsByClassName('dark').length === 1 ? 'dark' : 'light')
    }, [theme])

    const handleChange = (event) => {
    }

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
            paginationPerPage={5}
            paginationRowsPerPageOptions={[5, 10, 15, 20]}
            paginationComponentOptions={{ rowsPerPageText: 'Linhas por página:', rangeSeparatorText: 'de', selectAllRowsItemText: 'Todos' }}
            FixedHeader={true}
            theme={theme}
            noContextMenu={true}
            subHeader={true}
            subHeaderComponent={subHeaderComponentMemo}
        />
    );
};

export default TableCategory