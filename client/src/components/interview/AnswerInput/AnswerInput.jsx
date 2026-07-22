import React, { useState } from 'react';
import VoiceRecorder from '../VoiceRecorder/VoiceRecorder';
import Button from '../../common/Button/Button';
import { PenTool, Mic, Keyboard } from 'lucide-react';

const AnswerInput = ({ value, onChange, onSubmit, isSubmitting }) => {
  const [inputMode, setInputMode] = useState('text'); // 'text' | 'voice'

  const handleTranscript = (text) => {
    onChange(text);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Input Mode Toggle tabs */}
      <div className="flex bg-slate-900 border border-slate-800 rounded-xl p-1 self-start">
        <button
          type="button"
          onClick={() => setInputMode('text')}
          className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-150 ${
            inputMode === 'text'
              ? 'bg-slate-800 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Keyboard className="h-4 w-4" />
          Text Mode
        </button>
        <button
          type="button"
          onClick={() => setInputMode('voice')}
          className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-150 ${
            inputMode === 'voice'
              ? 'bg-slate-800 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Mic className="h-4 w-4" />
          Voice Mode
        </button>
      </div>

      {/* Voice Recorder module */}
      {inputMode === 'voice' && (
        <div className="mb-2">
          <VoiceRecorder onTranscript={handleTranscript} textAnswer={value} />
        </div>
      )}

      {/* Editable Text Area (Used for both text input and editing voice transcripts) */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Your Response:
        </label>
        <textarea
          rows={6}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={
            inputMode === 'voice'
              ? 'Speak into your microphone. The transcript will appear here, and you can edit it before submitting...'
              : 'Type your answer here in detail...'
          }
          className="w-full px-4 py-3 bg-slate-900 border border-slate-800 focus:ring-primary-500 focus:border-primary-500 rounded-xl text-slate-100 placeholder-slate-500 transition-all duration-200 focus:outline-none focus:ring-2 resize-none"
        />
        <div className="flex justify-between items-center text-xs text-slate-500 mt-1">
          <span>{value.trim().split(/\s+/).filter(Boolean).length} words</span>
          <span>Press submit to evaluate with AI</span>
        </div>
      </div>

      <Button
        variant="primary"
        size="lg"
        onClick={() => onSubmit(inputMode)}
        disabled={!value.trim()}
        loading={isSubmitting}
        className="w-full sm:w-auto self-end px-8 mt-2"
      >
        Submit Answer
      </Button>
    </div>
  );
};

export default AnswerInput;
