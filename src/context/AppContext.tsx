import { createContext, useState } from 'react';
import type { Dispatch, ReactNode, SetStateAction } from 'react';

interface UserProfile {
  name: string;
  interests: string[];
  strengths: string[];
  grade: string;
  bookmarks: string[];
}

interface AppContextType {
  theme: string;
  toggleTheme: () => void;
  currentView: string;
  navigate: (view: string) => void;
  userProfile: UserProfile;
  setUserProfile: Dispatch<SetStateAction<UserProfile>>;
  toggleBookmark: (collegeId: string) => void;
}

export const AppContext = createContext<AppContextType | null>(null);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState('light');
  const [currentView, setCurrentView] = useState('home');
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'Guest',
    interests: [],
    strengths: [],
    grade: '',
    bookmarks: []
  });

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const navigate = (view: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentView(view);
  };

  const toggleBookmark = (collegeId: string) => {
    setUserProfile(prev => {
      const isBookmarked = prev.bookmarks.includes(collegeId);
      return {
        ...prev,
        bookmarks: isBookmarked
          ? prev.bookmarks.filter(id => id !== collegeId)
          : [...prev.bookmarks, collegeId]
      };
    });
  };

  return (
    <AppContext.Provider value={{ theme, toggleTheme, currentView, navigate, userProfile, setUserProfile, toggleBookmark }}>
      <div className={`${theme === 'dark' ? 'dark' : ''} min-h-screen transition-colors duration-300`}>
        <div className="bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-100 min-h-screen font-sans flex flex-col">
          {children}
        </div>
      </div>
    </AppContext.Provider>
  );
};
