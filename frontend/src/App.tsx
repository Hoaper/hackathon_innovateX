import useMicrophone from "./hooks/useMicrophone";
import TimeClock from "./components/TimeClock";
import Image from "./imgs/jerry_logo.png";
import { useEffect, useState } from "react";
import { Outlet, redirect } from "react-router-dom"

const MainHeader = ({language, toggleLanguage}: {language: string, toggleLanguage: () => void}) => {
    return (
        <div className="container">
            <div className="header-holder">

                <div className="wifi-statusbar" style={{marginRight: "20px"}}>
                    <img className="wifi-icon" src="./imgs/Wi-Fi.svg" alt="wifi-icon" />
                    <p className="statusbar-status">
                        Free Wifi
                    </p>
                </div>

                <div className="wifi-statusbar" style={{marginRight: "auto"}} onClick={toggleLanguage}>
                    <img className="wifi-icon" src="./imgs/Language.svg" alt="wifi-icon" />
                    <p className="statusbar-status">
                        {language}
                    </p>
                </div>


                <p className="statusbar-status">
                    <TimeClock />
                </p>

            </div>
        </div>
    );
}

const Modal = () => {
    return ( 
        <div className="modal_jerry">
            <img src={Image} alt="jerry_logo" />
        </div>
    )
}

const App = () => {
    const {startListening, language, interimTranscript, toggleLanguage} = useMicrophone();
    const [prompt, setPrompt] = useState("");
    useEffect(() => {
        startListening({language: language, continuous: true});
    }, [language, startListening]);
    
    useEffect(() => {
        if (interimTranscript.length > 0) setPrompt(interimTranscript);
    }, [interimTranscript])

    useEffect(() => {
        console.log(prompt)
        if (/[Jj][Ee][Rr][Rr][Yy]|[Дд][жЖ][еЕ][рР][рР][иИ]/.test(prompt)) {

            setTimeout(() => {
                document?.querySelector('.modal_jerry')?.classList.add('modal_animate_jery');
            }, 0);
        }
        if (/play|играть/.test(prompt)) {
            redirect("/games");
        }
    }, [prompt])

    return (
        <>
            <Modal />
            <main id="main">
                <MainHeader language={language} toggleLanguage={toggleLanguage} />
                <Outlet />
            </main>
        </>
    );
}


export default App;