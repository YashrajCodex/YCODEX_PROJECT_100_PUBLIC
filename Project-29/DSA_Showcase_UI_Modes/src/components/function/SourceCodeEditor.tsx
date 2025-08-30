import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Code, FileText } from "lucide-react";
import { CopyIcon } from "../UI/CopyIcon";
import { useUILevel } from "../../contexts/UILevelContext";
import CodeEditor from "@uiw/react-textarea-code-editor";
import { useSearchParams } from "react-router-dom";
import { useTheme } from "next-themes";
import MonacoCodeEditor from "../UI/MonacoCodeEditor.tsx";

interface SourceCodeEditorProps {
  sourceCode: { [language: string]: string };
}

export const SourceCodeEditor: React.FC<SourceCodeEditorProps> = ({
  sourceCode,
}) => {
  const { uiLevel } = useUILevel();
  const { theme } = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();

  const currentParamLn = searchParams.get("ln");
  const [activeLanguage, setActiveLanguage] = useState(
    Object.keys(sourceCode)[0]
  );
  const [code, setCode] = useState(
    sourceCode[currentParamLn] || Object.values(sourceCode)[0]
  );

  const getContainerStyles = () => {
    switch (uiLevel) {
      case "skeleton":
        return "";
      // return "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700";
      case "basic":
        return "bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg";
      case "futuristic":
        return "border border-green-500 shadow-xl shadow-green-500/20";
      default:
        return "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700";
    }
  };

  const getTabStyles = (isActive: boolean) => {
    const baseStyles =
      "px-4 py-2 text-sm font-medium rounded-t-lg transition-all";

    switch (uiLevel) {
      case "skeleton":
        return `${baseStyles} ${
          ""
          // isActive
          //   ? "bg-white dark:bg-gray-900 border-t border-l border-r border-gray-200 dark:border-gray-700"
          //   : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
        }`;
      case "basic":
        return `${baseStyles} ${
          isActive
            ? "bg-white dark:bg-gray-800 border-t border-l border-r border-gray-200 dark:border-gray-700 text-blue-600 dark:text-blue-400"
            : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
        }`;
      case "futuristic":
        return `${baseStyles} ${
          isActive
            ? "bg-black border-t border-l border-r border-green-500 text-green-400 shadow-lg shadow-green-500/30"
            : "bg-gray-900 text-green-600 hover:bg-gray-800 hover:text-green-400 border border-green-700"
        }`;
      default:
        return `${baseStyles} ${
          isActive
            ? "bg-white dark:bg-gray-900 border-t border-l border-r border-gray-200 dark:border-gray-700"
            : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
        }`;
    }
  };

  const getCodeStyles = () => {
    switch (uiLevel) {
      case "skeleton":
        return theme === "dark" ? "#e5e7eb" : "#000";
      // return "bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200";
      case "basic":
        return theme === "dark" ? "#e5e7eb" : "#000";
      case "futuristic":
        return "#86efac";
      default:
        return "white";
    }
  };
  // const getCodeStyles = () => {
  //   switch (uiLevel) {
  //     case "skeleton":
  //       return "";
  //     // return "bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200";
  //     case "basic":
  //       return "bg-gray-900 text-gray-100";
  //     case "futuristic":
  //       return "bg-transparent text-green-300 font-mono";
  //     default:
  //       return "bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200";
  //   }
  // };

  const getTitleStyles = () => {
    switch (uiLevel) {
      case "futuristic":
        return "text-green-400";
      case "skeleton":
        return "";
      default:
        return "text-gray-900 dark:text-white";
    }
  };

  const toggleCode = (language: string) => {
    setActiveLanguage(language);
    setCode(sourceCode[language]);
    searchParams.set("ln", language);
    setSearchParams(searchParams);
  };

  const editorRef = useRef(null);
  
    // Focus editor on Ctrl + Space
    useEffect(() => {
      const handleKeyDown = (e) => {
        if (e.ctrlKey && e.code === 'Space') {
          e.preventDefault();
          editorRef.current?.focus();
        }
      };
  
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-lg overflow-hidden font_orbitron ${getContainerStyles()}`}
    >
      <div className="select-none flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <div className={`flex items-center space-x-2 ${getTitleStyles()}`}>
          <Code size={20} />
          <h3 className="text-lg font-semibold">Source Code</h3>
          <h3 className={`p-1 text-sm font-semibold shadow-sm rounded-lg hover:scale-90 ${uiLevel !== 'skeleton' && 'shadow-red-600'}`}>Focus on editor by ctrl + space</h3>
        </div>
        <CopyIcon text={sourceCode[activeLanguage]} />
      </div>
      <div className="select-none flex border-b border-gray-200 dark:border-gray-700">
        {Object.keys(sourceCode).map((language) => (
          <button
            key={language}
            onClick={() => toggleCode(language)}
            className={getTabStyles(activeLanguage === language)}
            aria-label={`View ${language} code`}
          >
            <div className="flex items-center space-x-2 ">
              <FileText size={14} />
              <span className="capitalize">{language}</span>
            </div>
          </button>
        ))}
      </div>
      <CodeEditor
        ref={editorRef}
        value={code}
        language={activeLanguage}
        placeholder="Please enter your code here..."
        style={{background: "transparent", color: getCodeStyles(), fontFamily: "font_roboto-mono"}}
        // className={`p-0 ${getCodeStyles}`}
        onChange={(evn) => {
          setCode(evn.target.value);
        }}
        padding={15}
      />
    {/* <MonacoCodeEditor code={code}/> */}
    </motion.div>
  );
};
