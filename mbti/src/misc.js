module.exports = {
    link: "https://www.16personalities.com/fr/la-personnalite-",
    labels: ["ISTJ", "ISTP", "ESTP", "ESTJ", "ISFJ", "ISFP", "ESFP", "ESFJ", "INFJ", "INFP", "ENFP", "ENFJ", "INTJ", "INTP", "ENTP", "ENTJ"],
    chart_option: {
        maintainAspectRatio: false,
        scales: {
            yAxes: [
                {
                    ticks: {
                        fontColor: "white",
                        beginAtZero: true,
                        maxTicksLimit: 11,
                    },
                },
            ],
            xAxes: [
                {
                    ticks: {
                        fontColor: "white"
                    }
                }
            ]
        },
    },

};
