import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from "react-bootstrap/Spinner";

import { Bar } from 'react-chartjs-2';
import Detailed from './Detailed';
import {link, chart_option, labels} from './misc';

const {url, key} = require('./config');



const constructDataFromResult = (results) => {
    let values = {
        "ISTJ": 0,
        "ISTP": 0,
        "ESTP": 0,
        "ESTJ": 0,
        "ISFJ": 0,
        "ISFP": 0,
        "ESFP": 0,
        "ESFJ": 0,
        "INFJ": 0,
        "INFP": 0,
        "ENFP": 0,
        "ENFJ": 0,
        "INTJ": 0,
        "INTP": 0,
        "ENTP": 0,
        "ENTJ": 0,
    };
    let count = 0;

    for (const index in results) {
        count++;
        for (const label of labels) {
            values[label] += parseFloat(results[index][`Scored Probabilities for Class "${label}"`]);
        }
    }
    for (const label of labels) {
        values[label] = values[label] / count;
    }
    return values;
};
const constructGraphFromData = (data) => {
    let tab = [];
    for (const label of labels) {
        tab.push((data[label] * 100).toFixed(2));
    }
    return tab;
};

const getHigherPercentage = (data) => {
    let result = {type: "ISTJ", percentage: 0};
    for (const label of labels) {
        let actualValue = data[label];
        if (actualValue > result.percentage) {
            result.percentage = actualValue;
            result.type = label
        }
    }
    return result;
};

const App = () => {
    const [textInput, setTextInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [receivedAnswer, setReceivedAnswer] = useState(false);
    const [seeDetailed, setSeeDetailed] = useState(false);
    const [MBTIPercentage, setMBTIPercentage] = useState([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
    const [MBTIType, setMBTIType] = useState("");
    const [MBTITypePercentage, setMBTITypePercentage] = useState(0);
    const [actualData, setActualData] = useState(null);
    const postData = () => {
        const headers = {
            "Authorization" : `Bearer ${key}`,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        };

        const body = {
            "Inputs": {
                "input1": [{
                    "posts": textInput
                }]
            }
        };
        const options = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body),
        };
        fetch(url,options)
            .then(response => response.json())
            .then(data => data["Results"]["output1"])
            .then((results) => {
                const data = constructDataFromResult(results);
                const graph = constructGraphFromData(data);
                const higher = getHigherPercentage(data);
                setActualData(results);
                setMBTIPercentage(graph);
                setMBTIType(higher.type);
                setMBTITypePercentage((higher.percentage * 100).toFixed(2));
                setReceivedAnswer(true);
                setIsLoading(false);
            })
            .catch((errors) => console.log(errors));
    };
    const getElementAtEvent = element => {
        if (!element.length) return;

        const {_index: index } = element[0];

        window.open(`${link}${data.labels[index].toLowerCase()}`, "_blank")
    };

    const data = {
        labels : labels,
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

    const handleSeeDetail = () => setSeeDetailed(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (textInput.length < 1) {
            window.alert("Veuillez entrer un texte");
            return;
        }
        setIsLoading(true);
        postData();
    };

    const handleReset = () => {
        setTextInput("");
        setIsLoading(false);
        setMBTIPercentage([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
        setReceivedAnswer(false);
        setMBTIType("");
        setMBTITypePercentage(0);
        setActualData(null);
        setSeeDetailed(false);
    };

    if (seeDetailed) {
        return (
            <div className="App">
                <Detailed Text={textInput} Datas={actualData}/>
                <Button variant="light" size="lg" onClick={handleReset}>Réinitialiser</Button>
            </div>
        )
    }
    else if (!receivedAnswer && !isLoading) {
        return (
            <div className="App">
                <h1>Bienvenu sur notre application MBTI</h1>
                <h2>Veuillez entrer un texte ci-dessous. Notre application se chargera de déterminer votre type MBTI</h2>
                <form onSubmit={handleSubmit}>
                    <textarea className="Text-Input" value={textInput} onChange={handleChange} />
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
                <h2>Votre type dominant est {MBTIType} avec une précision de {MBTITypePercentage}%</h2>
                <h2>Cliquez sur l'une des colonnes pour obtenir des informations liées au type de personnalité</h2>
                <div className="Canvas-Container">
                    <Bar data={data} options={chart_option} getElementAtEvent={getElementAtEvent}/>
                </div>
                <div className="Button-Container">
                    <Button variant="light" size="lg" onClick={handleSeeDetail}>Voir le détail</Button>
                    <Button variant="light" size="lg" onClick={handleReset}>Réinitialiser</Button>
                </div>
            </div>
        );
    }
};

export default App;
