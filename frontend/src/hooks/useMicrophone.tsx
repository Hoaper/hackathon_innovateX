import { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

function useMicrophone() {
  const { transcript, resetTranscript, listening, interimTranscript } = useSpeechRecognition();
  const {startListening, stopListening} = SpeechRecognition;
  const [language, setLanguage] = useState("RU");

  // Toggle between languages
  const toggleLanguage = () => {
    resetTranscript();
    setLanguage((prevLanguage) => (prevLanguage === 'EN' ? 'RU' : 'EN'));
  };

  return {
    transcript,
    interimTranscript,
    listening,
    startListening,
    stopListening,
    language,
    toggleLanguage,
  };
}

export default useMicrophone;
