import React from "react";

const HEAD = <div className="hD_Head"></div>;
const BODY = <div className="hD_Body"></div>;
const ARM = <div className="hD_Arm arm_right"></div>;
export default function HangmanDrawing() {
  return (
    <div className="hDContainer">
      {HEAD}
      {BODY}
      {ARM}
      <div className="hD_vertical_small"></div>
      <div className="hD_horizontal_top"></div>
      <div className="hD_vertical_height"></div>
      <div className="hD_horizontal_bottom"></div>
    </div>
  );
}

// interface HangmanProps {
//   wrongGuesses: number;
// }

// const Hangman: React.FC<HangmanProps> = ({ wrongGuesses }) => {
//   return (
//     <div className="hangman-container">
//       <svg viewBox="0 0 200 200" className="w-full h-auto">
//         {/* Scaffold */}
//         <line x1="20" y1="180" x2="180" y2="180" className="hangman-part" />
//         <line x1="40" y1="180" x2="40" y2="20" className="hangman-part" />
//         <line x1="40" y1="20" x2="120" y2="20" className="hangman-part" />
//         <line x1="120" y1="20" x2="120" y2="40" className="hangman-part" />

//         {/* Head */}
//         <circle
//           cx="120" cy="60" r="20"
//           className={`hangman-part ${wrongGuesses >= 1 ? 'opacity-100' : 'opacity-0'}`}
//         />

//         {/* Body */}
//         <line
//           x1="120" y1="80" x2="120" y2="120"
//           className={`hangman-part ${wrongGuesses >= 2 ? 'opacity-100' : 'opacity-0'}`}
//         />

//         {/* Left Arm */}
//         <line
//           x1="120" y1="90" x2="100" y2="110"
//           className={`hangman-part ${wrongGuesses >= 3 ? 'opacity-100' : 'opacity-0'}`}
//         />

//         {/* Right Arm */}
//         <line
//           x1="120" y1="90" x2="140" y2="110"
//           className={`hangman-part ${wrongGuesses >= 4 ? 'opacity-100' : 'opacity-0'}`}
//         />

//         {/* Left Leg */}
//         <line
//           x1="120" y1="120" x2="100" y2="150"
//           className={`hangman-part ${wrongGuesses >= 5 ? 'opacity-100' : 'opacity-0'}`}
//         />

//         {/* Right Leg */}
//         <line
//           x1="120" y1="120" x2="140" y2="150"
//           className={`hangman-part ${wrongGuesses >= 6 ? 'opacity-100 swing' : 'opacity-0'}`}
//         />

//         {/* Face - only appears when game is lost */}
//         {wrongGuesses >= 6 && (
//           <>
//             {/* X eyes */}
//             <line x1="113" y1="53" x2="119" y2="59" className="hangman-part" />
//             <line x1="119" y1="53" x2="113" y2="59" className="hangman-part" />
//             <line x1="121" y1="53" x2="127" y2="59" className="hangman-part" />
//             <line x1="127" y1="53" x2="121" y2="59" className="hangman-part" />

//             {/* Sad mouth */}
//             <path d="M110,70 Q120,60 130,70" className="hangman-part" />
//           </>
//         )}
//       </svg>
//     </div>
//   );
// };

// export default Hangman;
