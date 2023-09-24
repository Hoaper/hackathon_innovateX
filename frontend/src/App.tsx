import useMicrophone from "./hooks/useMicrophone";
import { useEffect, useState } from "react";
import MainHeader from "./components/MainHeader";
import MainContent from "./components/MainContent";

const App = () => {

    const {startListening, language, interimTranscript, toggleLanguage} = useMicrophone();
    const [prompt, setPrompt] = useState("");

    useEffect(() => {
        startListening({language: language, continuous: true});
    }, [language, startListening]);
    
    useEffect(() => {
        if (interimTranscript.length > 0) setPrompt(interimTranscript);
    }, [interimTranscript])

    return (
        <>
            <div>
            {prompt}
            {language}
            </div>
            <MainHeader />
            <MainContent />
        </>
    )
}


export default App;