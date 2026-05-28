import { useContext } from 'react';
import { ArrowRight, Search } from 'lucide-react';
import { AppContext } from '../context/AppContext';

const Home = () => {
  const appContext = useContext(AppContext);
  const navigate = appContext?.navigate ?? (() => {});

  return (
    <div className="animate-fade-in">
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-50 to-pink-50 dark:from-slate-900 dark:to-slate-800 -z-10" />
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Discover Your Perfect <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Education Pathway</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-10 max-w-2xl mx-auto">
            Confused about your future? Build a personalized roadmap just for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => navigate('quiz')} className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold flex items-center justify-center gap-2">
              Start "Find My Path" <ArrowRight size={20} />
            </button>
            <button onClick={() => navigate('colleges')} className="px-8 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-bold flex items-center justify-center gap-2">
              Explore Colleges <Search size={20} />
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 container mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">How We Help You</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Add your feature cards here similar to the original file */}
        </div>
      </section>
    </div>
  );
};

export default Home;
