import DataTable from 'react-data-table-component';
import { ChevronDoubleDownIcon } from '@heroicons/react/24/solid'
import { useEffect, useState, useMemo } from 'react';
import ThemeService from '../../../../../utils/style';
import SubHeaderTable from '../../../../../components/SubHeaderTable';

function TableExpenses(props) {

    ThemeService.themeDark
    ThemeService.themeLight

    const columns = [
        
        {
            name: 'Data',
            selector: row => row.transactionDate,
            sortable: true,
        },
        {
            name: 'Estabelecimento',
            selector: row => row.establishment,
            sortable: true,
        },
        {
            name: 'Categoria',
            selector: row => row.category.description,
            sortable: true,
        },
        {
            name: 'Metodo pagamento',
            selector: row => row.paymentMethods,
            sortable: true,
        },
        {
            name: 'Cartão crédito',
            selector: row => row.creditCard?.name,
            sortable: true,
        },
        {
            name: 'Nº parcela',
            selector: row => row.numberInstallment,
            sortable: true,
        },
        {
            name: 'Parcelas',
            selector: row => row.quantityInstallments,
            sortable: true,
        },
        {
            name: 'Valor',
            selector: row => row.valuesInstallment,
            sortable: true,
        },
        {
            name: 'Classificação',
            selector: row => row.category.classification,
            sortable: true,
        },
        {
            name: 'Semana',
            selector: row => row.week,
            sortable: true,
        }
        
    ];

    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const [theme, setTheme] = useState()

    const filteredItems = props.transactions.filter(
        item => item.category.description && item.category.description.toLowerCase().includes(filterText.toLowerCase()) ||
                item.category.classification && item.category.classification.toLowerCase() === filterText.toLowerCase() ||
                item.transactionDate && item.transactionDate.toLowerCase().includes(filterText.toLowerCase()) ||
                item.paymentMethods && item.paymentMethods.toLowerCase().includes(filterText.toLowerCase()) ||
                item.creditCard?.name && item.creditCard?.name.toLowerCase().includes(filterText.toLowerCase()) ||
                item.valuesInstallment && item.valuesInstallment.toLowerCase().includes(filterText.toLowerCase()) ||
                item.week && item.week.toLowerCase().includes(filterText.toLowerCase())
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

    useEffect(() => {
        setFilterText(props.filter)
    }, [])

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

export default TableExpenses