import { useContext, useState } from 'react';
import { Compass, Moon, Sun, Menu, X } from 'lucide-react';
import { AppContext } from '../context/AppContext';

const Header = () => {
  const appContext = useContext(AppContext);
  const { theme, toggleTheme, navigate, currentView } = appContext ?? { theme: 'light', toggleTheme: () => {}, navigate: () => {}, currentView: 'home' };
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'quiz', label: 'Find My Path' },
    { id: 'combo', label: 'Combo Explorer' },
    { id: 'colleges', label: 'Colleges' },
    { id: 'planner', label: 'Pivot Plan' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('home')}>
          <div className="bg-indigo-600 p-2 rounded-lg">
            <Compass className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400">
            EduPath
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          {navItems.map(item => (
            <button key={item.id} onClick={() => navigate(item.id)} className={`text-sm font-medium transition-colors ${currentView === item.id ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:text-indigo-600'}`}>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-b p-4 absolute w-full shadow-lg">
          <div className="flex flex-col gap-4">
            {navItems.map(item => (
              <button key={item.id} onClick={() => { navigate(item.id); setIsMenuOpen(false); }} className="text-left font-medium">
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
