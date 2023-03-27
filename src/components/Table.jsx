import DataTable, { createTheme } from 'react-data-table-component';
import { ChevronDoubleDownIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react';
import Switch from './Switch';
import apiFetch from '../axios/config'

createTheme('dark', {
    context: {
        background: '#1E2734',
        text: '#FFFFFF',
    },
    background: {
        default: '#1E2734',
    },
});

//'#1E2734' : '#B3B7BC'

createTheme('light', {
    text: {
        primary: '#000000',
        secondary: '#000000',
    },
    background: {
        default: '#B3B7BC',
    },
    context: {
        background: '#B3B7BC',
        text: '#000000',
    },
    divider: {
        default: 'black',
    },
});

function Table(props) {

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

    const [cards, setCards] = useState([])
    const [theme, setTheme] = useState()
    
    const getCards = async () => {
        try {
            const response = await apiFetch.get("cards")
            const content = response.data.content
            setCards(content)
        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = async (values) => {
       console.log("Values -> ", values);

            try {
                await apiFetch.put(`cards/activateAndDeactivate/${values.id}`,{
                    active: !values.active
                })
            } catch (error) {
                console.log(error);
            }
    }

    useEffect(() => {
        getCards()
    }, [cards])


    useEffect(() => {
        setTheme(document.getElementsByClassName('dark').length === 1 ? 'dark' : 'light')
    }, [theme])

    return (
        <DataTable
            columns={columns}
            data={cards}
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
            paginationPerPage={5}
            paginationRowsPerPageOptions={[2, 5, 10, 15]}
            paginationComponentOptions={{ rowsPerPageText: 'Linhas por página:', rangeSeparatorText: 'de', selectAllRowsItemText: 'Todos' }}
            FixedHeader={true}
            contextMessage={{ singular: '', plural: '', message: 'Cartão selecionado, você pode ativar ou desativar.' }}
            progressPending={cards.length < 0}
            theme={theme}
            noContextMenu={true}
        />
    );
};

export default Table