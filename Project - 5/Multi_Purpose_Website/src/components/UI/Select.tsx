import React from 'react';
import { ChevronDown } from 'lucide-react';

interface currency {
    code: string;
    name: string;
    symbol: string;
}
interface SelectProps {
  value: string;
  onChange: (value: string) => void;
    label: string;
    currencies?: currency[]
  className?: string;
}

const Select: React.FC<SelectProps> = ({
  value,
  onChange,
  label,
    className = "",
  currencies
}) => {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-foreground mb-2">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-4 pr-10 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
        >
          {currencies.map((currency) => (
            <option key={currency.code} value={currency.code}>
              {currency.code} - {currency.name}
            </option>
          ))}
        </select>
        <ChevronDown size={18} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none" />
      </div>
    </div>
  );
};

export default Select;
