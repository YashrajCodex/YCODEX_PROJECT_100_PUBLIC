import React, { useState } from "react";

function TextExpander() {
  return (
    <div>
      <TextExpand>
        Space travel is the ultimate adventure! Imagine soaring past the stas
        and excploring new worlds. It's the stuff of dreams and science fiction,
        but believe it or not, space travel is a real thing. Humans and robots
        are constantly venturing out into the cosmos to uncover its secrets and
        push the boundaries of what's possible.
      </TextExpand>
      <TextExpand
        collapseNumWords={20}
        expandButtonText="Show Text"
        collapseButtonText="Collapse Text"
        buttonColor="#ff6622"
      >
        Space travel requires some seriously amazing tecgnology and
        collaboration between countries, private companies, and international
        space organizations. And while it's not always the first time humans
        stepped foot on te moon or when rovers were sent to roam around on Mars.
      </TextExpand>
      <TextExpand expanded={true} className="boxrtyuy">
        Space missions have given us incredible insights into our universe and
        have inspired future generations to keep reaching for the stars.Space
        travel is a pretty cool thing to think about it. Who knows who will
        discover next.
      </TextExpand>
    </div>
  );
}

function TextExpand({
  children,
  className = "",
  expandButtonText = "Show More",
  collapseButtonText = "Show Less",
  buttonColor = "#000",
  expanded = false,
    collapseNumWords = 10,
}) {

    const [isExpanded, setExpanded] = useState(expanded)

    const displayText = isExpanded ? children : children.split(' ').slice(0, collapseNumWords).join(' ') + '...'
  return (
    <div className={className}>
          <span>{ displayText }</span> <button style={{color: buttonColor}} onClick={()=>setExpanded((exp)=> !exp)}>{isExpanded ? collapseButtonText:expandButtonText }</button>
    </div>
  );
}
export default TextExpander;
