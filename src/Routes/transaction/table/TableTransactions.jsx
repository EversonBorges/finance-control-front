import DataTable from 'react-data-table-component';
import { ChevronDoubleDownIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react';
import ThemeService from '../../../utils/style';
import SubHeaderTable from './SubHeaderTable';

function TableTransactions(props) {
    ThemeService.themeDark
    ThemeService.themeLight

    const [theme, setTheme] = useState()

    const referenceMonth = props.formaterReferenceDate.substr(3)

    let totalPurchases = props.transactions.reduce((acc, transaction) => {
        return acc + transaction.price
    }, 0)

    let totalPay = props.transactions.reduce((acc, transaction) => {
        return acc + transaction.intallmentValue
    }, 0)

    const nameCard = props.transactions[0]?.nomeCard

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
            name: 'Valor compra',
            selector: row => row.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
            sortable: true,
        },
        {
            name: 'Parcelado',
            selector: row => row.installmentsTotal + ' X',
            sortable: true,
        },
        {
            name: 'Data compra',
            selector: row => new Date(row.referenceDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' }),
            sortable: true,
        },
        {
            name: 'Parcela',
            selector: row => `${row.installment} / ${row.installmentsTotal}`,
            sortable: true,
        },
        {
            name: 'Data parcela',
            selector: row => new Date(row.installmentDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' }),
            sortable: true,
        },
        {
            name: 'Valor parcela',
            selector: row => row.intallmentValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
            sortable: true,
        }
    ];



    useEffect(() => {
        setTheme(document.getElementsByClassName('dark').length === 1 ? 'dark' : 'light')
    }, [theme])

    return (
        <DataTable
            columns={columns}
            data={props.transactions}
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
            paginationRowsPerPageOptions={[5, 10, 15, 20, 50]}
            paginationComponentOptions={{ rowsPerPageText: 'Linhas por página:', rangeSeparatorText: 'de', selectAllRowsItemText: 'Todos' }}
            FixedHeader={true}
            theme={theme}
            noContextMenu={true}
            subHeader={true}
            subHeaderComponent={<SubHeaderTable nameCard={nameCard} referenceMonth={referenceMonth} totalPurchases={totalPurchases} totalPay={totalPay}/>}
            subHeaderAlign="center"
            subHeaderWrap={false}
            noHeader={true}
        />
    );
};

export default TableTransactions