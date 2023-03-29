import { createTheme } from 'react-data-table-component';

//'#1E2734' : '#B3B7BC'
const ThemeService = {
    themeLight: createTheme('light', {
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
    }),
    
    themeDark: createTheme('dark', {
        context: {
            background: '#1E2734',
            text: '#FFFFFF',
        },
        background: {
            default: '#1E2734',
        },
    })
}

export default ThemeService