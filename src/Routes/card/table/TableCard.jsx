import DataTable  from 'react-data-table-component';
import { ChevronDoubleDownIcon, FunnelIcon, XCircleIcon } from '@heroicons/react/24/solid'
import { useEffect, useState, useMemo } from 'react';
import Switch from '../../../components/Switch';
import apiFetch from '../../../axios/config'
import ThemeService from '../../../utils/style';

function TableCard(props) {

    ThemeService.themeDark
    ThemeService.themeLight

    const columns = [
        {
            name: 'Ativo',
            button: true,
            cell: row => <Switch handleChange={() => {handleChange(row)}} checked={row.active} />,
         },
        {
            name: 'Nome cartão',
            selector: row => row.nameCard,
            sortable: true,
        },
        {
            name: 'Titular',
            selector: row => row.owner,
            sortable: true,
        },
        {
            name: 'Limite',
            selector: row => row.limitCard,
            sortable: true,
        },
        {
            name: 'Melhor dia compra',
            selector: row => row.bestDayBuy,
            sortable: true,
        },
        {
            name: 'Data Vencimento',
            selector: row => row.duoDate,
            sortable: true,
        }
    ];

    const [theme, setTheme] = useState()
    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    
    const handleChange = async (values) => {

            try {
                await apiFetch.put(`cards/activateAndDeactivate/${values.id}`,{
                    active: !values.active
                })
                props.getCards()
            } catch (error) {
                console.log(error);
            }
    }

    const filteredItems = props.cards.filter(
        item => item.nameCard && item.nameCard.toLowerCase().includes(filterText.toLowerCase()),
    );

    const subHeaderComponentMemo = useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText('');
            }
        };

        return (
            <div className='flex gap-1 text-gray-900 dark:text-gray-200'>
                <FunnelIcon className='h-6' />
                <input 
                    value={filterText} 
                    onChange={e => setFilterText(e.target.value)} 
                    placeholder='Filtrar por cartão' 
                    className='rounded-md pl-2 text-black'>
                </input> 
                <XCircleIcon className='cursor-pointer h-6' onClick={handleClear}/>
            </div>
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
            noContextMenu={true}
            subHeader={true}
            subHeaderComponent={subHeaderComponentMemo}
            pagination={true}
            paginationPerPage={10}
            paginationRowsPerPageOptions={[5, 10, 15, 20]}
            paginationComponentOptions={{ rowsPerPageText: 'Linhas por página:', rangeSeparatorText: 'de', selectAllRowsItemText: 'Todos' }}
            FixedHeader={true}
            theme={theme}
        />
    );
};

export default TableCard