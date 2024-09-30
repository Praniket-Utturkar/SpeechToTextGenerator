import 'regenerator-runtime/runtime'; 
import { useState, useEffect } from 'react';
import "./App.css";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import useClipboard from "react-use-clipboard";

const App = () => {
  const [textToCopy, setTextToCopy] = useState('');
  const [isCopied, setCopied] = useClipboard(textToCopy, { successDuration: 2000 });
  
  const startListening = () => 
    SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });

  const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  // Set text to copy whenever the transcript updates
  useEffect(() => {
    setTextToCopy(transcript);
  }, [transcript]);

  if (!browserSupportsSpeechRecognition) {
    return <p>Browser doesn't support speech recognition.</p>;
  }

  return (
    <div className="container">
      <h2>Speech to Text Generator</h2>
      <br />
      <p>&quot;Transcribe Your Thoughts: Your Voice, Our Words&quot;</p>
      <div className="main-content">
        {transcript}
      </div>
      <div className="btn-style">
        <button onClick={setCopied}>
          {isCopied ? 'Copied!' : 'Copy to clipboard'}
        </button>
        <button onClick={startListening}>Start Listening</button>
        <button onClick={SpeechRecognition.stopListening}>Stop Listening</button>
      </div>
    </div>
  );
};

export default App;
