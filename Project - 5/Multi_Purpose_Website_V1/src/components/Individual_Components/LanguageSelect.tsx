import React from 'react';
import { ChevronDown } from 'lucide-react';

interface LanguageSelectProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  className?: string;
}

const LanguageSelect: React.FC<LanguageSelectProps> = ({
  value,
  onChange,
  label,
  className = ""
}) => {
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'it', name: 'Italian' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'ru', name: 'Russian' },
    { code: 'ja', name: 'Japanese' },
    { code: 'ko', name: 'Korean' },
    { code: 'zh', name: 'Chinese' }
  ];

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-foreground mb-2">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-3 pr-10 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
        <ChevronDown size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none" />
      </div>
    </div>
  );
};

export default LanguageSelect;
