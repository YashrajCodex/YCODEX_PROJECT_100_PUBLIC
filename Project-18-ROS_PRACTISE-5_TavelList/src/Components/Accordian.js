// import "src/Accordian.css"

import { useState } from "react";

const faqs = [
  {
    title: "Where are these chairs assembled?",
    text: "lorem ipsum dolor sit amet consectetur, adipisicin in these areas",
  },
  {
    title: "How long do I have to return my chair?",
    text: "After 1 hour. Additional hours can charge additional charges.",
  },
  {
    title: "Do you ship to countries outside like EU?",
    text: "Yes! And also to USE, UK, Russia, Ukraine, India and Australia",
  },
];

const Accordian = () => {
  return (
    <div>
      <AccItems data={faqs} />
    </div>
  );
};

const AccItems = ({ data }) => {
  const [curOpen, setCurOpen] = useState(null);
  return (
    <div className="accordion">
      {data.map((data, i) => (
        <Items
          curOpen={curOpen}
          onOpen={setCurOpen}
          num={i}
          title={data.title}
          key={data.title}
        >
          {data.text}
        </Items>
      ))}
      <Items
        curOpen={curOpen}
        onOpen={setCurOpen}
        num={23}
        title="React"
        key={"React"}
      >
        <p>Thinking in react:</p>
        <ul>
          <li>Break up UI into components.</li>
          <li>Make components reusable.</li>
          <li>Place state efficiently.</li>
        </ul>
      </Items>
    </div>
  );
};

const Items = ({ num, title, curOpen, onOpen, children }) => {
  const isOpen = num === curOpen ;
  const handleToggle = () => {
    onOpen(isOpen ? null : num);
  };

  return (
    <div className={`item ${isOpen ? "open" : ""}`} onClick={handleToggle}>
      <p className="number">{num < 9 ? `0${num + 1}` : num + 1}</p>
      <p className="title"> {title} </p>
      <p className="icon">{isOpen ? "-" : "+"}</p>

      {isOpen && <div className="content-box">{children}</div>}
    </div>
  );
};

export default Accordian;
