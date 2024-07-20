import { createTheme } from 'react-data-table-component';

const ThemeService = {
    themeLight: createTheme('light', {
        text: {
            primary: '#000000',
            secondary: '#000000',
        },
        background: {
            default: '#D1D5DB',
        },
        context: {
            background: '#D1D5DB',
            text: '#000000',
        },
        divider: {
            default: 'black',
        },
    })
}

export default ThemeService