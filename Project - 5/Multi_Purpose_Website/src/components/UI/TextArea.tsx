
import React from 'react';

interface TextAreaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  rows?: number;
  readonly?: false;
}

const TextArea: React.FC<TextAreaProps> = ({
  value,
  onChange,
  placeholder = "Enter your text here...",
  className = "",
  rows = 6,
  readonly = false,
}) => {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      readOnly={readonly}
      className={`w-full p-4 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none ${readonly} ${className}`}
    />
  );
};

export default TextArea;
