import DataTable from 'react-data-table-component';
import { ChevronDoubleDownIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react';
import apiFetch from '../../../axios/config'
import ThemeService from '../../../utils/style';
import SubHeaderTable from './SubHeaderTable';

function TableTransactions(props) {
    
    ThemeService.themeDark
    ThemeService.themeLight
    const [transactions, setTransactions] = useState([])
    const [theme, setTheme] = useState()
    
    const referenceMonth = props.formaterReferenceDate.substr(3)

    let totalPurchases = transactions.reduce((acc, transaction) =>{
             return acc + transaction.price
      },0)

    const nameCard = transactions[0]?.nomeCard

    const columns = [

        {
            name: 'Usuário cartão',
            selector: row => row.userCard,
            sortable: true,
        },
        {
            name: 'Descrição da compra',
            selector: row => row.purchaseDescription,
            sortable: true,
        },
        {
            name: 'Preço',
            selector: row => row.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
            sortable: true,
        },
        {
            name: 'Parcela',
            selector: row => row.installments,
            sortable: true,
        },
        {
            name: 'Data compra',
            selector: row => new Date(row.referenceDate).toLocaleDateString('pt-BR', {timeZone: 'UTC'}),
            sortable: true,
        }
    ];

    const getTransactions = async () => {

        try {
            const response = await apiFetch.get(`transactions/card_id/${props.id}?referenceDate=${props.formaterReferenceDate}`)
            const content = response.data.content
            setTransactions(content)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getTransactions()
    }, [])

    useEffect(() => {
        setTheme(document.getElementsByClassName('dark').length === 1 ? 'dark' : 'light')
    }, [theme])

    return (
        <DataTable
            columns={columns}
            data={transactions}
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
            subHeaderComponent={<SubHeaderTable nameCard={nameCard} referenceMonth={referenceMonth} totalPurchases={totalPurchases}/>}
            subHeaderAlign="center"
            subHeaderWrap={false}
            noHeader={true}
        />
    );
};

export default TableTransactions