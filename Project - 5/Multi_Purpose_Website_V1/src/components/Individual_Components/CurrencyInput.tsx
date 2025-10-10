import React from "react";

interface CurrencyInputProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  readOnly?: boolean;
  className?: string;
}

const CurrencyInput: React.FC<CurrencyInputProps> = ({
  value,
  onChange,
  label,
  readOnly = false,
  className = "",
}) => {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-foreground mb-2">
        {label}
      </label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        readOnly={readOnly}
        placeholder="0.00"
        className={`w-full p-4 text-xl border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
          readOnly ? "bg-accent" : ""
        }`}
      />
    </div>
  );
};

export default CurrencyInput;
