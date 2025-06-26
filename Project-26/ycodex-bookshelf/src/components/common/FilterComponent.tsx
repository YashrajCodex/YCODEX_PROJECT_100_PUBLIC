import { Filter as FILTER } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

interface filterProps  {
  filterField: string;
  options: {
    value: "all" | "read" | "unread";
    label: string;
  }[];
};
export default function FilterComponent({ filterField, options }: filterProps) {
  const [filterBy, setFilterBy] = useState(options[0].value);
  const [searchParams, setSearchParams] = useSearchParams();

  function handleClick(value: string) {
    searchParams.set(filterField, value);
    setSearchParams(searchParams);
  }
  return (
    <div className="flex items-center space-x-2">
      <FILTER className="h-4 w-4 text-text-secondary" />
      <select
        value={filterBy}
        onChange={(e) => {
          setFilterBy(e.target.value as any);
        }}
        className="bg-bg-surface border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50 text-text-primary"
      >
        {options.map((opt) => (
          <option key={opt.label} onClick={() => handleClick(opt.value)} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
