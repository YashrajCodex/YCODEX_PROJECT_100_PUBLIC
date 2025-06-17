import React, { useState } from 'react';
import { ArrowLeftRight, Languages } from 'lucide-react';
import InputOutput from './InputOutput';
import LanguageSelect from '../multiutils/reusable/LanguageSelect';

const TextTranslator: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [fromLanguage, setFromLanguage] = useState('en');
  const [toLanguage, setToLanguage] = useState('es');

  const handleSwapLanguages = () => {
    setFromLanguage(toLanguage);
    setToLanguage(fromLanguage);
    setInputText(outputText);
    setOutputText(inputText);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center mb-6">
        <Languages size={20} className="mr-2 text-muted-foreground" />
        <h3 className="text-lg font-semibold text-card-foreground">Text Translation</h3>
      </div>
      
      <div className="space-y-6">
        {/* Language Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <LanguageSelect
            value={fromLanguage}
            onChange={setFromLanguage}
            label="From"
          />
          
          <div className="flex justify-center">
            <button
              onClick={handleSwapLanguages}
              className="p-2 rounded-md bg-accent text-accent-foreground hover:bg-accent/80 transition-colors"
              aria-label="Swap languages"
            >
              <ArrowLeftRight size={20} />
            </button>
          </div>
          
          <LanguageSelect
            value={toLanguage}
            onChange={setToLanguage}
            label="To"
          />
        </div>

        {/* Translation Areas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Input Text
            </label>
            <InputOutput
              value={inputText}
              onChange={setInputText}
              placeholder="Enter text to translate..."
              rows={6}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Translated Text
            </label>
            <InputOutput
              value={outputText}
              onChange={setOutputText}
              placeholder="Translation will appear here..."
              rows={6}
              readOnly
            />
          </div>
        </div>

        <button className="w-full bg-primary text-primary-foreground px-4 py-3 rounded-md hover:bg-primary/90 transition-colors">
          Translate
        </button>
      </div>
    </div>
  );
};

export default TextTranslator;
