import React, {useState} from 'react';
import "./Detailed.css";
import Modal from "react-bootstrap/Modal";
import {Bar} from "react-chartjs-2";

const options = {
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
};

const link = "https://www.16personalities.com/fr/la-personnalite-";

const constructGraphFromData = (data) => {
    const labels = ["ISTJ", "ISTP", "ESTP", "ESTJ", "ISFJ", "ISFP", "ESFP", "ESFJ", "INFJ", "INFP", "ENFP", "ENFJ", "INTJ", "INTP", "ENTP", "ENTJ"];
    let tab = [];
    for (const label of labels) {
        tab.push((data[`Scored Probabilities for Class "${label}"`] * 100).toFixed(2));
    }
    return tab;
};

const Detailed = ({Text, Datas}) => {
    const [currentKeyWord, setCurrentKeyWord] = useState("");
    const [MBTIPercentage, setMBTIPercentage] = useState([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
    const [MBTIType, setMBTIType] = useState("");
    const [MBTITypePercentage, setMBTITypePercentage] = useState(0);
    const [show, setShow] = useState(false);

    const handleShow = (key) => {
        for (const word of keyword) {
            if (word.key === key) {
                setCurrentKeyWord(word.data);
                for (const Data of Datas) {
                    if (Data["Preprocessed Key Phrases"] === word.data) {
                        setMBTIType(Data["Scored Labels"]);
                        setMBTITypePercentage((Data[`Scored Probabilities for Class "${Data["Scored Labels"]}"`] * 100).toFixed(2))
                        setMBTIPercentage(constructGraphFromData(Data));
                    }
                }
            }
        }
        setShow(true);
    };

    const handleClose = () => setShow(false);
    let keyword = [];
    if (keyword.length === 0) {
        for (const Data of Datas) {
            Text = Text.replaceAll(Data["Preprocessed Key Phrases"], `<${keyword.length}/>`);
            const newKey = {
                data: Data["Preprocessed Key Phrases"],
                key: `<${keyword.length}/>`
            };
            keyword.push(newKey);
        }
    }

    const WordToRender= ({Word, Index}) => {
        if (Word.match("<[0-9]+/>")) {
            const key = Word.substring(Word.indexOf('<'), Word.indexOf('/>') + 2);
            let trueWord = "";
            for (const word of keyword) {
                if (word.key === key) {
                    trueWord = word.data;
                }
            }
            Word = Word.replaceAll(key,"");
            return (<span><span className="Key-Word" onClick={() => handleShow(key)}>{trueWord}</span><span>{`${Word} `}</span></span>);
        }
        return (`${Word} `);
    };

    const data = {
        labels : ["ISTJ", "ISTP", "ESTP", "ESTJ", "ISFJ", "ISFP", "ESFP", "ESFJ", "INFJ", "INFP", "ENFP", "ENFJ", "INTJ", "INTP", "ENTP", "ENTJ"],
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
    const getElementAtEvent = element => {
        if (!element.length) return;

        const {_index: index } = element[0];

        window.open(`${link}${data.labels[index].toLowerCase()}`, "_blank")
    };

    let result = (
        <div>
            <Modal size="xl" dialogClassName="Modal-Container" show={show} onHide={handleClose} animation={false}>
                <Modal.Header className="Modal-Header" closeButton>
                    <Modal.Title>{currentKeyWord}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="Modal-Body">
                    <h2>Le type dominant du mot "{currentKeyWord}" est {MBTIType} avec une précision de {MBTITypePercentage}%</h2>
                    <h2>Cliquez sur l'une des colonnes pour obtenir des informations liées au type de personnalité</h2>
                    <div className="Canvas-Container">
                        <Bar data={data} options={options} getElementAtEvent={getElementAtEvent}/>
                    </div>
                </Modal.Body>
            </Modal>
            <h3>Cliquez sur les mots en surbrillance afin de voir comment ils ont influés sur vos résultats</h3>
            {Text.split(" ").map((word, index) => <WordToRender key={index} Index={index} Word={word} />)}
        </div>
    );

    return result;
};

export default Detailed;
