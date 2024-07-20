const GraphicsServices = {
    getOptions: getOptions
}

export default GraphicsServices

function getOptions(header) {
    return {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
            x: {
                ticks: {
                    color: 'black', // Cor dos textos do eixo X
                },
                grid: {
                    color: 'rgba(211, 211, 211, 0.5)', // Cor mais clara das linhas de grade do eixo X
                },
            },
            y: {
                ticks: {
                    color: 'black', // Cor dos textos do eixo Y
                },
                grid: {
                    color: 'rgba(211, 211, 211, 0.5)', // Cor mais clara das linhas de grade do eixo Y
                },
            },
        },
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: 'black', // Cor do texto da legenda
                },
            },
            title: {
                display: true,
                text: header,
                color: 'black', // Cor do texto do título
            },
        },
        layout: {
            backgroundColor: 'rgba(200, 200, 200, 0.5)', // Cor de fundo do gráfico
        },
    };

}
