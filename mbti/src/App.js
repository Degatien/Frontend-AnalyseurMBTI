import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    const [textInput, setTextInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [receivedAnswer, setReceivedAnswer] = useState(false);

    const handleChange = (event) => setTextInput(event.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
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
    } else if (receivedAnswer && isLoading) {
        return (
            <div className="App">

            </div>
        );
    } else if (receivedAnswer && !isLoading) {
        return (
            <div className="App">

            </div>
        );
    }
};

export default App;
