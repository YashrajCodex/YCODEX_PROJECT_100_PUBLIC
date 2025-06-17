import React, { useEffect, useReducer } from "react";
import { Bold, Italic, Type, AlignLeft, Search, Eraser, ALargeSmall,CircleChevronDown, CircleChevronUp } from "lucide-react";
import Navbar from "../components/Individual_Components/Navbar";
import Footer from "../components/Individual_Components/Footer";
import TextArea from "../components/UI/TextArea";
import DisplayArea from "../components/UI/DisplayArea";
import useAdvice from "@/hooks/useAdvice";
import useCapitalizeSentence from "@/lib/helpers/useCapitalizeSentence";

// useReducer for managing multiple states in TextUtils component
interface TextUtilsState {
  inputText: string;
  outputText: string;
  findText: string;
  replaceText: string;
  isLoading: boolean;
  removeSpace: boolean;
  bold: boolean;
  italic: boolean;
  strikeThrough: boolean;
  showOperation: boolean;
}

type TextUtilsAction =
  | { type: "SET_INPUT_TEXT"; payload: string }
  | { type: "SET_OUTPUT_TEXT"; payload: string }
  | { type: "SET_FIND_TEXT"; payload: string }
  | { type: "SET_REPLACE_TEXT"; payload: string }
  | { type: "SET_SELECTED_OPERATION"; payload: string }
  | { type: "changeToUppercase" }
  | { type: "changeToLowercase" }
  | { type: "capitalizeText"; payload: string }
  | { type: "clearInput" }
  | { type: "setAdvice"; payload: string }
  | { type: "toggleIsLoading" }
  | { type: "clearFormatting" }
  | { type: "strikeText" }
  | { type: "italicText" }
  | { type: "boldText" }
  | { type: "replaceText"; payload: string }
  | { type: "removeExtraSpace" }
  | { type: "toggleShowOperation" };

const initialState: TextUtilsState = {
  inputText: "",
  outputText: "",
  findText: "",
  replaceText: "",
  isLoading: false,
  removeSpace: false,
  bold: false,
  italic: false,
  strikeThrough: false,
  showOperation: false
};

const textUtilsReducer = (
  state: TextUtilsState,
  action: TextUtilsAction
): TextUtilsState => {
  const newText = state.inputText.split(/[ ]+/);
  switch (action.type) {
    case "toggleShowOperation":
      return{...state, showOperation: state.showOperation ? false: true}
    case "SET_INPUT_TEXT":
      return {
        ...state,
        inputText: action.payload,
        outputText: action.payload,
      };
    case "setAdvice":
      return { ...state, inputText: action.payload };
    case "changeToUppercase":
      return {
        ...state,
        outputText: state.removeSpace
          ? newText.join(" ").toUpperCase()
          : state.inputText.toUpperCase(),
      };
    case "changeToLowercase":
      return {
        ...state,
        outputText: state.removeSpace
          ? newText.join(" ").toLowerCase()
          : state.inputText.toLowerCase(),
      };
    case "capitalizeText":
      return { ...state, outputText: action.payload };
    case "clearInput":
      return { ...state, inputText: "", outputText: "" };
    case "SET_FIND_TEXT":
      return { ...state, findText: action.payload };
    case "SET_REPLACE_TEXT":
      return { ...state, replaceText: action.payload };
    case "removeExtraSpace":
      return { ...state, outputText: newText.join(" "), removeSpace: true };
    case "replaceText":
      return { ...state, outputText: action.payload };
    case "boldText":
      return { ...state, bold: state.bold ? false : true };
    case "italicText":
      return { ...state, italic: state.italic ? false : true };
    case "strikeText":
      return { ...state, strikeThrough: state.strikeThrough ? false : true };
    case "clearFormatting":
      return {
        ...state,
        outputText: state.inputText,
        bold: false,
        italic: false,
        strikeThrough: false,
      };
    case "toggleIsLoading":
      return { ...state, isLoading: !state.isLoading };
    // case "setDictionary":
    //   return { ...state, dictionary: action.payload };
    default:
      throw new Error("Unknown action triggered!");
  }
};

function TextUtils() {
  const [
    {
      inputText,
      outputText,
      findText,
      replaceText,
      bold,
      italic,
      strikeThrough,
      showOperation,
    },
    dispatch,
  ] = useReducer(textUtilsReducer, initialState);

  const capitalizedText = useCapitalizeSentence(`${inputText}`)

  const ReplaceText = function replaceText(findText:string, replaceText:string) {
    if (!findText || !replaceText) {
      alert('Please enter both "find" and "replace" values.');
      return;
    }
    const lower_findText = findText.toLowerCase()
    const lower_inputText = inputText.toLocaleLowerCase()
    const regex = new RegExp(lower_findText, "g");
    const changedText = lower_inputText.replace(regex, replaceText);
    dispatch({ type: "replaceText", payload: changedText });
  };

  function handleCopyText() {
    const cases = { bold, italic, strikeThrough };
    switch (true) {
      case cases.bold && cases.italic:
        navigator.clipboard.writeText(`*_${outputText}_*`);
        break;
      case cases.bold && cases.strikeThrough:
        navigator.clipboard.writeText(`*~${outputText}~*`);
        break;
      case cases.italic && cases.strikeThrough:
        navigator.clipboard.writeText(`~_${outputText}_~`);
        break;
      case cases.italic && cases.strikeThrough && cases.bold:
        navigator.clipboard.writeText(`*~_${outputText}_~*`);
        break;
      case cases.bold:
        navigator.clipboard.writeText(`*${outputText}*`);
        break;
      case cases.italic:
        navigator.clipboard.writeText(`_${outputText}_`);
        break;
      case cases.strikeThrough:
        navigator.clipboard.writeText(`~${outputText}~`);
        break;
      default:
        navigator.clipboard.writeText(`${outputText}`);
    }
  }

  const advice = useAdvice();
  useEffect(() => {
    if (advice) {
      dispatch({ type: "setAdvice", payload: advice });
    }
  }, [advice]);

  const textOperations = [
    {
      id: "trim",
      label: "Trim",
      icon: AlignLeft,
      exe: () => dispatch({ type: "removeExtraSpace" }),
    },
    {
      id: "uppercase",
      label: "Upper Case",
      icon: Type,
      exe: () => dispatch({ type: "changeToUppercase" }),
    },
    {
      id: "lowercase",
      label: "Lower Case",
      icon: Type,
      exe: () => dispatch({ type: "changeToLowercase" }),
    },
    {
      id: "capitalize",
      label: "Capitalized Case",
      icon: ALargeSmall,
      exe: () => dispatch({ type: "capitalizeText", payload: capitalizedText }),
    },
    {
      id: "bold",
      label: "Bold",
      icon: Bold,
      exe: () => dispatch({ type: "boldText" }),
    },
    {
      id: "italic",
      label: "Italic",
      icon: Italic,
      exe: () => dispatch({ type: "italicText" }),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar title="TextUtils" />

      <div className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-8">
            Text Utilities
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              <div>
                <div className="flex gap-2 items-center">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Input Text
                </label>
                <Eraser size={18} onClick={()=> dispatch({type: "clearInput"})}/>
                </div>
                <TextArea
                  value={inputText}
                  onChange={(value) =>
                    dispatch({ type: "SET_INPUT_TEXT", payload: value })
                  }
                  placeholder="Enter your text here..."
                  rows={8}
                />
              </div>

              {/* Output Section */}
              <div className="space-y-6">
                <DisplayArea
                  title="Output"
                  content={outputText || "Processed text will appear here..."}
                  size="18"
                  onClick = {handleCopyText}
                />
              </div>

              {/* Text Operations */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="flex gap-2 items-center text-lg font-semibold text-card-foreground mb-4">
                  Text Operations
                  {
                    showOperation ? <CircleChevronUp onClick={()=> dispatch({type: "toggleShowOperation"})}/> : <CircleChevronDown onClick={()=> dispatch({type: "toggleShowOperation"})}/>
                  }
                
                </h3>
                {showOperation && <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 select-none">
                  {textOperations.map((operation) => (
                    <button
                      key={operation.id}
                      onClick={operation.exe}
                      className={`flex items-center justify-center space-x-2 p-3 rounded-md border transition-colors ${
                        operation.id
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-background text-foreground border-border hover:bg-accent hover:text-accent-foreground"
                      }`}
                    >
                      <operation.icon size={18} />
                      <span className="text-sm">{operation.label}</span>
                    </button>
                  ))}
                </div>}
              </div>

              {/* Find and Replace */}
              <div className="flex flex-col bg-card border border-border rounded-lg p-6">
                {/* Search and find-replace heading */}
                <div className="flex items-center mb-4">
                  <Search size={20} className="mr-2 text-muted-foreground" />
                  <h3 className="text-lg font-semibold text-card-foreground">
                    Find & Replace
                  </h3>
                </div>
                {/* find and replace div */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Find
                    </label>
                    <input
                      type="text"
                      value={findText}
                      onChange={(e) =>
                        dispatch({
                          type: "SET_FIND_TEXT",
                          payload: e.target.value,
                        })
                      }
                      placeholder="Text to find..."
                      className="w-full p-3 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Replace
                    </label>
                    <input
                      type="text"
                      value={replaceText}
                      onChange={(e) =>
                        dispatch({
                          type: "SET_REPLACE_TEXT",
                          payload: e.target.value,
                        })
                      }
                      placeholder="Replace with..."
                      className="w-full p-3 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
                <button className="self-center flex items-center justify-center my-1 space-x-2 p-3 rounded-md border transition-colors bg-primary text-primary-foreground border-primary" onClick={()=>ReplaceText(findText, replaceText)}>
                  Replace Text
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default TextUtils;
