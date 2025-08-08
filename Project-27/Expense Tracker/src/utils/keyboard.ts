import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface KeyboardShortcuts {
  'ctrl+a'?: () => void;
  'delete'?: () => void;
  'alt+h'?: () => void;
  'alt+a'?: () => void;
  'alt+r'?: () => void;
  'alt+u'?: () => void;
  'alt+c'?: () => void;
  'ctrl+t'?: () => void;
  'ctrl+d'?: () => void;
  'ctrl+g'?: () => void;
  'ctrl+p'?: () => void;
  'ctrl+r'?: () => void;
  'ctrl+s'?: () => void;
  'ctrl+l'?: () => void;
  'escape'?: () => void;
  '/'?: () => void;
}

export const useKeyboardShortcuts = (shortcuts: KeyboardShortcuts) => {
  useEffect(() => {
const handleKeyDown = (event: KeyboardEvent) => {
      if (!event.key) return; // Fix for undefined event.key
      
      const key = event.key.toLowerCase();
      const ctrl = event.ctrlKey;
      const alt = event.altKey;
      
      // Prevent default shortcuts from interfering with form inputs
      if (event.target instanceof HTMLInputElement || 
          event.target instanceof HTMLTextAreaElement ||
          event.target instanceof HTMLSelectElement) {
        return;
      }

      let shortcutKey = '';
      
      if (ctrl && alt) {
        return; // Skip ctrl+alt combinations
      } else if (ctrl) {
        shortcutKey = `ctrl+${key}`;
      } else if (alt) {
        shortcutKey = `alt+${key}`;
      } else if (key === 'delete' || key === 'escape' || key === '/') {
        shortcutKey = key;
      }

      if (shortcutKey && shortcuts[shortcutKey as keyof KeyboardShortcuts]) {
        event.preventDefault();
        shortcuts[shortcutKey as keyof KeyboardShortcuts]?.();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);
};

export const useGlobalKeyboardShortcuts = () => {
  const navigate = useNavigate();
  
  return useKeyboardShortcuts({
    'alt+h': () => navigate('/'),
    'alt+a': () => navigate('/analysis'),
    'alt+r': () => navigate('/report'),
    'alt+u': () => navigate('/user'),
    'alt+c': () => navigate('/receipt'),
    'ctrl+t': () => {
      // Toggle theme
      document.documentElement.classList.toggle('dark');
    }
  });
};