import React from 'react';
import { FileText, Languages, BookOpen } from 'lucide-react';

interface TextUtilsNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TextUtilsNavigation: React.FC<TextUtilsNavigationProps> = ({
  activeTab,
  onTabChange
}) => {
  const tabs = [
    { id: 'editor', label: 'Text Editor', icon: FileText },
    { id: 'translator', label: 'Text Translator', icon: Languages },
    { id: 'meaning', label: 'Word Meaning', icon: BookOpen }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
              activeTab === tab.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-background text-foreground hover:bg-accent hover:text-accent-foreground'
            }`}
          >
            <tab.icon size={18} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TextUtilsNavigation;
