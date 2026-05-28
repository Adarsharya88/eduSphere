import { useState } from 'react';
import { ArrowRight, Briefcase, Map } from 'lucide-react';
import { INTERESTS_LIST, COMBO_PATHWAYS } from '../data/mockData';

const ComboExplorer = () => {
  const [selected, setSelected] = useState([]);
  
  const toggleInterest = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter(i => i !== id));
    } else {
      if (selected.length < 2) setSelected([...selected, id]);
    }
  };

  const getComboResult = () => {
    if (selected.length !== 2) return null;
    const key1 = selected[0];
    const key2 = selected[1];
    
    let result = COMBO_PATHWAYS[`${key1}-${key2}`] || COMBO_PATHWAYS[`${key2}-${key1}`];
    
    if (!result) {
      const i1 = INTERESTS_LIST.find(i => i.id === key1);
      const i2 = INTERESTS_LIST.find(i => i.id === key2);
      return {
        title: `Interdisciplinary: ${i1.label} + ${i2.label}`,
        careers: [`Specialist in ${i1.label}`, `Consultant in ${i2.label}`, "Research Analyst"],
        roadmap: [`Major in ${i1.label}`, `Minor in ${i2.label}`, "Capstone Project combining both"],
        desc: "A unique path tailored to your diverse interests. Creating your own niche is the future of work."
      };
    }
    return result;
  };

  const result = getComboResult();

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl animate-fade-in">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-4">The Combo Explorer</h2>
        <p className="text-slate-600 dark:text-slate-400">
          Don't fit in a box? Pick 2 interests to see blended career paths.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {INTERESTS_LIST.map(item => (
          <button
            key={item.id}
            onClick={() => toggleInterest(item.id)}
            disabled={!selected.includes(item.id) && selected.length >= 2}
            className={`px-6 py-3 rounded-full border flex items-center gap-2 transition-all ${
              selected.includes(item.id)
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg scale-105'
                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-indigo-300'
            } ${!selected.includes(item.id) && selected.length >= 2 ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <span>{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </div>

      {selected.length === 2 && result ? (
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-8 rounded-3xl border border-indigo-100 dark:border-indigo-800 animate-slide-up">
          <div className="text-center mb-8">
            <span className="bg-white dark:bg-slate-800 text-indigo-600 px-4 py-1 rounded-full text-sm font-bold shadow-sm mb-4 inline-block">
              Perfect Match Found
            </span>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{result.title}</h3>
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">{result.desc}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm">
              <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Briefcase size={20} className="text-blue-500" /> Potential Careers
              </h4>
              <ul className="space-y-3">
                {result.careers.map((c, i) => (
                  <li key={i} className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <ArrowRight size={16} className="text-slate-400" /> {c}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm">
              <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Map size={20} className="text-green-500" /> Educational Roadmap
              </h4>
              <ul className="space-y-4">
                {result.roadmap.map((step, i) => (
                  <li key={i} className="relative pl-6 pb-2 border-l-2 border-slate-200 dark:border-slate-700 last:border-0 last:pb-0">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-green-100 dark:bg-green-900 border-2 border-green-500"></div>
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{step}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-slate-400 py-10">
          {selected.length === 0 ? "Select your first interest above." : "Select one more interest to see the magic."}
        </div>
      )}
    </div>
  );
};

export default ComboExplorer;