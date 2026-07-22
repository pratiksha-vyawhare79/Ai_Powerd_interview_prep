import React, { useEffect, useState } from 'react';
import useSpeechToText from '../../../hooks/useSpeechToText';
import { Mic, MicOff, AlertCircle } from 'lucide-react';
import Button from '../../common/Button/Button';

const VoiceRecorder = ({ onTranscript, textAnswer }) => {
  const {
    isListening,
    transcript,
    startListening,
    stopListening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechToText();

  const [timer, setTimer] = useState(0);

  // Sync transcript back to parent
  useEffect(() => {
    if (transcript) {
      onTranscript(transcript);
    }
  }, [transcript, onTranscript]);

  // Keep track of recording duration
  useEffect(() => {
    let interval;
    if (isListening) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    } else {
      setTimer(0);
    }
    return () => clearInterval(interval);
  }, [isListening]);

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleToggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      resetTranscript();
      startListening();
    }
  };

  if (!browserSupportsSpeechRecognition) {
    return (
      <div className="flex items-center gap-2 p-3 bg-amber-950/40 border border-amber-500/20 rounded-xl text-amber-300 text-sm">
        <AlertCircle className="h-4 w-4 shrink-0" />
        <span>Voice input is not supported in this browser. Please use Google Chrome or Microsoft Edge.</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-6 border border-slate-800/80 rounded-2xl bg-slate-900/30">
      <div className="relative mb-6">
        {/* Pulsing visual circles when recording */}
        {isListening && (
          <>
            <span className="absolute -inset-2 rounded-full bg-red-500/20 animate-ping"></span>
            <span className="absolute -inset-4 rounded-full bg-red-500/10 animate-pulse"></span>
          </>
        )}
        <button
          type="button"
          onClick={handleToggleListening}
          className={`relative p-5 rounded-full text-white transition-all duration-300 border-2 ${
            isListening
              ? 'bg-red-600 hover:bg-red-700 border-red-500 shadow-lg shadow-red-500/30'
              : 'bg-primary-600 hover:bg-primary-700 border-primary-500 shadow-lg shadow-primary-500/30'
          }`}
        >
          {isListening ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
        </button>
      </div>

      <div className="text-center">
        <h4 className="text-sm font-semibold text-slate-200">
          {isListening ? 'Listening... Speak clearly into your mic.' : 'Click mic to speak your answer'}
        </h4>
        {isListening && (
          <span className="inline-block mt-2 text-xs font-mono bg-red-950/40 text-red-400 border border-red-500/20 px-2 py-0.5 rounded">
            {formatTimer(timer)}
          </span>
        )}
      </div>

      {isListening && transcript && (
        <div className="mt-4 w-full p-3 bg-slate-950/80 border border-slate-800 rounded-lg max-h-32 overflow-y-auto">
          <p className="text-xs text-slate-400 font-medium uppercase mb-1 tracking-wider">Live Transcript Preview:</p>
          <p className="text-sm text-slate-300 italic">"{transcript}"</p>
        </div>
      )}
    </div>
  );
};

export default VoiceRecorder;
