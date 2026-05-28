import React, { useState } from 'react';

const PivotPlanner = () => {
  const [current, setCurrent] = useState('');
  const [target, setTarget] = useState('');
  const [plan, setPlan] = useState(null);

  const generatePlan = () => {
    setPlan({
      steps: [
        { time: "Immediate (0-3 Months)", action: "Take online foundational courses (Coursera/EdX). Start a side project." },
        { time: "Short Term (3-6 Months)", action: "Join a community/club. Look for internships in the new field." },
        { time: "Medium Term (6-12 Months)", action: "Prepare for entrance exams (if Master's needed) or build portfolio." },
        { time: "Long Term (1+ Year)", action: "Apply for Master's or Junior roles." }
      ],
      skills: ["Transferable Skills: Communication, Logic", "New Skills Needed: Technical jargon, Specific tools"]
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl animate-fade-in">
       <h2 className="text-3xl font-bold mb-6 text-center">Continuation & Pivot Planner</h2>
       <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
         <div className="grid md:grid-cols-2 gap-6 mb-6">
           <div>
             <label className="block text-sm font-semibold mb-2">I am currently studying/working in...</label>
             <select 
              className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent"
              onChange={(e) => setCurrent(e.target.value)}
             >
               <option value="">Select Field</option>
               <option value="engineering">Engineering</option>
               <option value="commerce">Commerce/Business</option>
               <option value="arts">Arts/Humanities</option>
               <option value="medical">Medical/Bio</option>
             </select>
           </div>
           <div>
             <label className="block text-sm font-semibold mb-2">But I want to move into...</label>
             <select 
              className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent"
              onChange={(e) => setTarget(e.target.value)}
             >
               <option value="">Select Target</option>
               <option value="tech">Technology/Data</option>
               <option value="design">Design/Creative</option>
               <option value="management">Management</option>
               <option value="psych">Psychology</option>
             </select>
           </div>
         </div>
         
         <button 
          onClick={generatePlan}
          disabled={!current || !target}
          className="w-full py-3 bg-indigo-600 disabled:bg-slate-300 hover:bg-indigo-700 text-white rounded-xl font-bold transition-colors"
         >
           Generate Bridge Plan
         </button>

         {plan && (
           <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-700 animate-slide-up">
             <h3 className="text-xl font-bold mb-4">Your Pivot Roadmap</h3>
             <div className="space-y-6">
               {plan.steps.map((step, idx) => (
                 <div key={idx} className="flex gap-4">
                   <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center font-bold text-indigo-600">
                     {idx + 1}
                   </div>
                   <div>
                     <h4 className="font-bold text-slate-800 dark:text-slate-200">{step.time}</h4>
                     <p className="text-slate-600 dark:text-slate-400">{step.action}</p>
                   </div>
                 </div>
               ))}
             </div>
             <div className="mt-6 bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
               <h4 className="font-bold text-yellow-800 dark:text-yellow-200 text-sm mb-2">Skill Strategy</h4>
               <ul className="list-disc list-inside text-sm text-yellow-700 dark:text-yellow-300">
                 {plan.skills.map(s => <li key={s}>{s}</li>)}
               </ul>
             </div>
           </div>
         )}
       </div>
    </div>
  );
};

export default PivotPlanner;


src/App.jsx

import React, { useContext } from 'react';
import { AppProvider, AppContext } from './context/AppContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './views/Home';
import QuizModule from './views/QuizModule';
import CollegeFinder from './views/CollegeFinder';
import ComboExplorer from './views/ComboExplorer';
import PivotPlanner from './views/PivotPlanner';

const MainLayout = () => {
  const { currentView } = useContext(AppContext);

  const renderView = () => {
    switch (currentView) {
      case 'home': return <Home />;
      case 'quiz': return <QuizModule />;
      case 'colleges': return <CollegeFinder />;
      case 'combo': return <ComboExplorer />;
      case 'planner': return <PivotPlanner />;
      default: return <Home />;
    }
  };

  return (
    <>
      <Header />
      <main className="flex-1">
        {renderView()}
      </main>
      <Footer />
    </>
  );
};

function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}

export default App;