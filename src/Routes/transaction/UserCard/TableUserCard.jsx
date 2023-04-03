import DataTable  from 'react-data-table-component';
import { ChevronDoubleDownIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react';
import Switch from '../../../components/Switch';
import ThemeService from '../../../utils/style';

function TableUserCard(props) {

    ThemeService.themeDark
    ThemeService.themeLight

    const columns = [
        {
            name: 'Nome usuário',
            selector: row => row.nameUser,
            sortable: true,
        },
        {
            name: 'Ativo',
            button: true,
            cell: row => <Switch handleChange={handleChange} checked={row.active} disabled={true}/>,
         }
    ];

    const [theme, setTheme] = useState()
    
    useEffect(() => {
        setTheme(document.getElementsByClassName('dark').length === 1 ? 'dark' : 'light')
    }, [theme])

    const handleChange = (event) => {
    }

    return (
        <DataTable
            columns={columns}
            title="USUÁRIOS CARTÃO"
            data={props.userCard}
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

export default TableUserCard