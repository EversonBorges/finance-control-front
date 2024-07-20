const SummaryService = {
    getCustomStyle: getCustomStyle
}

function getCustomStyle(theme) {
    return {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '20px',
            background: theme === 'dark' ? '#424242' : '#D1D5DB'
        },
    };
}

export default SummaryService