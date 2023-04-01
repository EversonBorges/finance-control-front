import DataTable  from 'react-data-table-component';
import { ChevronDoubleDownIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react';
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


    useEffect(() => {
        setTheme(document.getElementsByClassName('dark').length === 1 ? 'dark' : 'light')
    }, [theme])

    return (
        <DataTable
            columns={columns}
            data={props.cards}
            title="Cartões"
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
        />
    );
};

export default TableCard