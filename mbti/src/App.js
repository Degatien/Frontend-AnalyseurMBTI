import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from "react-bootstrap/Spinner";

import { Bar } from 'react-chartjs-2';

const rand = () => Math.floor(Math.random() * 100);
const link = "https://www.16personalities.com/fr/la-personnalite-";

const options = {
    scales: {
        yAxes: [
            {
                ticks: {
                    fontColor: "white",
                    beginAtZero: true,
                    suggestedMax: 100,
                    maxTicksLimit: 11,
                    stepSize: 10
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
};

const App = () => {
    const [textInput, setTextInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [receivedAnswer, setReceivedAnswer] = useState(false);
    const [MBTIPercentage, setMBTIPercentage] = useState([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);

    const getElementAtEvent = element => {
        if (!element.length) return;

        const { _datasetIndex: datasetIndex, _index: index } = element[0];

        window.open(`${link}${data.labels[index].toLowerCase()}`, "_blank")
    };



    const data = {
        labels: ['ISTJ', 'ISTP', 'ESTP', 'ESTJ', 'ISFJ', 'ISFP', "ESFP", "ESFJ", "INFJ", "INFP", "ENFP", "ENFJ", "INTJ", "INTP", "ENTP", "ENTJ"],
        datasets: [
            {
                label: '% de type MBTI',
                data: MBTIPercentage,
                backgroundColor: [
                    'rgba(255, 208, 210, 0.2)',
                    'rgba(211, 208, 255, 0.2)',
                    'rgba(201, 255, 255, 0.2)',
                    'rgba(201, 255, 162, 0.2)',
                    'rgba(255, 159, 165, 0.2)',
                    'rgba(150, 144, 230, 0.2)',
                    'rgba(132, 230, 225, 0.2)',
                    'rgba(148, 253, 77, 0.2)',
                    'rgba(242, 146, 152, 0.2)',
                    'rgba(170, 164, 255, 0.2)',
                    'rgba(149, 255, 255, 0.2)',
                    'rgba(149, 255, 114, 0.2)',
                    'rgba(255, 83, 96, 0.2)',
                    'rgba(102, 86, 255, 0.2)',
                    'rgba(46, 253, 249, 0.2)',
                    'rgba(71, 255, 0, 0.2)',

                ],
                borderColor: [
                    'rgba(255, 208, 210, 1)',
                    'rgba(211, 208, 255, 1)',
                    'rgba(201, 255, 255, 1)',
                    'rgba(201, 255, 162, 1)',
                    'rgba(255, 159, 165, 1)',
                    'rgba(150, 144, 230, 1)',
                    'rgba(132, 230, 225, 1)',
                    'rgba(148, 253, 77, 1)',
                    'rgba(242, 146, 152, 1)',
                    'rgba(170, 164, 255, 1)',
                    'rgba(149, 255, 255, 1)',
                    'rgba(149, 255, 114, 1)',
                    'rgba(255, 83, 96, 1)',
                    'rgba(102, 86, 255, 1)',
                    'rgba(46, 253, 249, 1)',
                    'rgba(71, 255, 0, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };
    const handleChange = (event) => setTextInput(event.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (textInput.length < 1) {
            window.alert("Veuillez entrer un texte");
            return;
        }
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setReceivedAnswer(true);
            setMBTIPercentage([rand(),rand(),rand(),rand(),rand(),rand(),rand(),rand(),rand(),rand(),rand(),rand(),rand(),rand(),rand(),rand()]);
        }, 1000);
    };

    const handleReset = () => {
        setTextInput("");
        setIsLoading(false);
        setMBTIPercentage([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
        setReceivedAnswer(false);
    };

    if (!receivedAnswer && !isLoading) {
        return (
            <div className="App">
                <h1>Bienvenu sur notre application MBTI</h1>
                <h2>Veuillez entrer un texte ci-dessous. Notre application se chargera de déterminer votre type MBTI</h2>
                <form onSubmit={handleSubmit}>
                    <textarea className="Text-Input" type="text" value={textInput} onChange={handleChange} />
                    <br/>
                    <Button onClick={handleSubmit} variant="light" size="lg">Envoyer</Button>
                </form>
            </div>
        );
    } else if (!receivedAnswer && isLoading) {
        return (
            <div className="App">
                <Spinner animation="border" variant="light" size="lg" />
                <h2>Le serveur est en train de traiter votre demande</h2>
            </div>
        );
    } else if (receivedAnswer) {
        return (
            <div className="App">
                <h2>Cliquez sur l'une des colonnes pour obtenir des informations liées au type de personnalité</h2>
                <Bar data={data} options={options}
                     getElementAtEvent={getElementAtEvent}/>
                <Button variant="light" size="lg" onClick={handleReset}>Réinitialiser</Button>
            </div>
        );
    }
};

export default App;
