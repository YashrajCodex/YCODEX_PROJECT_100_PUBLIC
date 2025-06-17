
import React, { useReducer } from 'react';
import { Copy, RefreshCw } from 'lucide-react';
import Navbar from '../components/multiutils/reusable/Navbar';
import Footer from '../components/multiutils/reusable/Footer';

// useReducer for managing password generator states
interface PasswordState {
  passUseCount: number;
  password: string;
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
}
let charset:string = "";
let newPassword:string = "";
type PasswordAction =
  | { type: 'SET_PASSWORD'; payload: string }
  | { type: 'SET_LENGTH'; payload: number }
  | { type: 'TOGGLE_UPPERCASE' }
  | { type: 'TOGGLE_LOWERCASE' }
  | { type: 'TOGGLE_NUMBERS' }
  | { type: 'TOGGLE_SYMBOLS' }
  | { type: 'generatePassword' };

const passwordReducer = (state: PasswordState, action: PasswordAction): PasswordState => {
  switch (action.type) {
    case 'SET_PASSWORD':
      return { ...state, password: action.payload };
    case 'SET_LENGTH':
      return { ...state, length: action.payload };
    case 'TOGGLE_UPPERCASE':
      return { ...state, includeUppercase: !state.includeUppercase };
    case 'TOGGLE_LOWERCASE':
      return { ...state, includeLowercase: !state.includeLowercase };
    case 'TOGGLE_NUMBERS':
      return { ...state, includeNumbers: !state.includeNumbers };
    case 'TOGGLE_SYMBOLS':
      return { ...state, includeSymbols: !state.includeSymbols };
    case "generatePassword":
          newPassword = " ";
          console.log(state.includeLowercase, 'l', state.includeNumbers, 'n', state.includeSymbols, 's', state.includeUppercase, 'u')
          if (state.includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
          if (state.includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
          if (state.includeNumbers) charset += "0123456789";
          if (state.includeSymbols) charset += "!@#$%^&*()";
          for (let i = 0; i < state.length; i++) {
            newPassword += charset.charAt(
              Math.floor(Math.random() * charset.length)
            );
          }
          return {
            ...state,
            password: newPassword,
            passUseCount: state.passUseCount + 1,
          };
    default:
      return state;
  }
};

const PasswordGenerator: React.FC = () => {
  const [state, dispatch] = useReducer(passwordReducer, {
    password: '',
    passUseCount: 0,
    length: 12,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: false
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar title="Password Generator" />
      
      <div className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-8">Password Generator</h1>
          
          <div className="bg-card border border-border rounded-lg p-8">
            {/* Generated Password Display */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-foreground mb-2">
                Generated Password
              </label>
              <div className="flex items-center space-x-4">
                <div className="flex-1 p-4 bg-background border border-border rounded-md font-mono text-lg">
                  {state.password || 'Click generate to create a password...'}
                </div>
                <button className="p-4 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                  <Copy size={20} onClick={() => {
                  navigator.clipboard.writeText(state.password);
                }}/>
                </button>
              </div>
            </div>

            {/* Password Length */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-foreground mb-2">
                Password Length: {state.length}
              </label>
              <input
                type="range"
                min="4"
                max="24"
                value={state.length}
                onChange={(e) => dispatch({ type: 'SET_LENGTH', payload: parseInt(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-1">
                <span>4</span>
                <span>24</span>
              </div>
            </div>

            {/* Character Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-foreground">Include Uppercase (A-Z)</label>
                  <button
                    onClick={() => dispatch({ type: 'TOGGLE_UPPERCASE' })}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      state.includeUppercase ? 'bg-primary' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      state.includeUppercase ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <label className="text-foreground">Include Lowercase (a-z)</label>
                  <button
                    onClick={() => dispatch({ type: 'TOGGLE_LOWERCASE' })}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      state.includeLowercase ? 'bg-primary' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      state.includeLowercase ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-foreground">Include Numbers (0-9)</label>
                  <button
                    onClick={() => dispatch({ type: 'TOGGLE_NUMBERS' })}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      state.includeNumbers ? 'bg-primary' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      state.includeNumbers ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <label className="text-foreground">Include Symbols (!@#$%)</label>
                  <button
                    onClick={() => dispatch({ type: 'TOGGLE_SYMBOLS' })}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      state.includeSymbols ? 'bg-primary' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      state.includeSymbols ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
              </div>
            </div>

            {/* Generate Button */}
            <button className="w-full bg-primary text-primary-foreground py-4 rounded-md hover:bg-primary/90 transition-colors flex items-center justify-center space-x-2" onClick={()=>dispatch({type: "generatePassword"})}>
              <RefreshCw size={20} />
              <span>Generate Password</span>
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PasswordGenerator;
