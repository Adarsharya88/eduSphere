import React, { useState, useContext } from 'react';
import { CheckCircle, Star, BookOpen, Award, GraduationCap, Briefcase, Zap, ArrowLeft, ArrowRight } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import { INTERESTS_LIST, STRENGTHS_LIST } from '../data/mockData';

const QuizModule = () => {
  const { navigate, userProfile, setUserProfile } = useContext(AppContext);
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState({
    grade: '',
    interests: [],
    strengths: [],
    style: ''
  });

  const handleSelection = (field, value) => {
    setAnswers(prev => {
      if (Array.isArray(prev[field])) {
        if (prev[field].includes(value)) {
          return { ...prev, [field]: prev[field].filter(item => item !== value) };
        } else {
          if (prev[field].length >= 3) return prev;
          return { ...prev, [field]: [...prev[field], value] };
        }
      }
      return { ...prev, [field]: value };
    });
  };

  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      setLoading(true);
      setTimeout(() => {
        setUserProfile({ ...userProfile, ...answers });
        setLoading(false);
        setStep(4);
      }, 1500);
    }
  };

  const QuizResult = () => {
    const primaryInterest = INTERESTS_LIST.find(i => i.id === answers.interests[0]) || INTERESTS_LIST[0];
    
    return (
      <div className="max-w-4xl mx-auto animate-fade-in">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full mb-4">
            <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-3xl font-bold mb-2">Analysis Complete!</h2>
          <p className="text-slate-600 dark:text-slate-400">Based on your love for {primaryInterest.label} and {answers.strengths[0]}, here is your path.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-indigo-100 dark:border-indigo-900 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-bl-full -mr-4 -mt-4"></div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Star className="text-yellow-500 fill-yellow-500" size={20} />
              Top Recommendation
            </h3>
            <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
              {primaryInterest.id === 'tech' ? 'Computer Science & AI' : 
               primaryInterest.id === 'bio' ? 'Biotechnology' :
               primaryInterest.id === 'art' ? 'Visual Communication' :
               primaryInterest.id === 'biz' ? 'Management Studies' : 'Interdisciplinary Studies'}
            </div>
            <p className="text-slate-600 dark:text-slate-300 mb-6 text-sm leading-relaxed">
              This field matches your high interest in {primaryInterest.label}. With your strength in {answers.strengths[0]}, you will likely excel in roles that require both analytical thinking and specialized knowledge.
            </p>
            
            <button className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors">
              View Detailed Roadmap
            </button>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-lg">Next Steps for {answers.grade} Student</h3>
            <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 flex gap-4">
              <div className="mt-1"><BookOpen className="text-blue-500" size={20}/></div>
              <div>
                <h4 className="font-semibold">Key Subjects to Focus On</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">Math, {primaryInterest.id === 'bio' ? 'Biology' : 'Physics'}, English</p>
              </div>
            </div>
             <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 flex gap-4 cursor-pointer hover:border-indigo-500 transition-colors" onClick={() => navigate('colleges')}>
              <div className="mt-1"><GraduationCap className="text-indigo-500" size={20}/></div>
              <div>
                <h4 className="font-semibold">Explore Colleges</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">See 10+ colleges offering this path</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
      <p className="text-lg font-medium animate-pulse">Analyzing your profile...</p>
    </div>
  );

  if (step === 4) return <QuizResult />;

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full mb-8">
        <div 
          className="h-full bg-indigo-600 rounded-full transition-all duration-500" 
          style={{ width: `${((step + 1) / 4) * 100}%` }}
        ></div>
      </div>

      <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 min-h-[400px] flex flex-col">
        {step === 0 && (
          <div className="animate-fade-in flex-1">
            <h2 className="text-2xl font-bold mb-6">Let's start! Which stage are you in?</h2>
            <div className="space-y-3">
              {['Class 6-8 (Middle School)', 'Class 9-10 (High School)', 'Class 11-12 (Junior College)', 'Undergraduate'].map(opt => (
                <button
                  key={opt}
                  onClick={() => handleSelection('grade', opt)}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    answers.grade === opt 
                      ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 ring-1 ring-indigo-500' 
                      : 'border-slate-200 dark:border-slate-700 hover:border-indigo-300'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="animate-fade-in flex-1">
            <h2 className="text-2xl font-bold mb-2">What interests you the most?</h2>
            <p className="text-slate-500 mb-6">Pick up to 3 topics.</p>
            <div className="grid grid-cols-2 gap-3">
              {INTERESTS_LIST.map(item => (
                <button
                  key={item.id}
                  onClick={() => handleSelection('interests', item.id)}
                  className={`p-4 rounded-xl border text-center transition-all flex flex-col items-center gap-2 ${
                    answers.interests.includes(item.id)
                      ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 ring-1 ring-indigo-500' 
                      : 'border-slate-200 dark:border-slate-700 hover:border-indigo-300'
                  }`}
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-fade-in flex-1">
            <h2 className="text-2xl font-bold mb-2">What are your superpowers?</h2>
            <p className="text-slate-500 mb-6">Select your top strengths.</p>
            <div className="flex flex-wrap gap-3">
              {STRENGTHS_LIST.map(item => (
                <button
                  key={item}
                  onClick={() => handleSelection('strengths', item)}
                  className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                    answers.strengths.includes(item)
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-fade-in flex-1">
            <h2 className="text-2xl font-bold mb-6">What is your primary goal right now?</h2>
            <div className="space-y-3">
              {[
                { id: 'job', label: 'Get a high-paying job quickly', icon: <Briefcase size={18}/> },
                { id: 'research', label: 'Deep research & higher studies', icon: <BookOpen size={18}/> },
                { id: 'creative', label: 'Create something / Entrepreneurship', icon: <Zap size={18}/> },
                { id: 'stable', label: 'Stable, secure career', icon: <Award size={18}/> }
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => handleSelection('style', opt.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-center gap-3 ${
                    answers.style === opt.id
                      ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 ring-1 ring-indigo-500' 
                      : 'border-slate-200 dark:border-slate-700 hover:border-indigo-300'
                  }`}
                >
                  <div className={`p-2 rounded-full ${answers.style === opt.id ? 'bg-indigo-100 dark:bg-indigo-800 text-indigo-600' : 'bg-slate-100 dark:bg-slate-700'}`}>
                    {opt.icon}
                  </div>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 flex justify-between pt-6 border-t border-slate-100 dark:border-slate-700">
          <button 
            disabled={step === 0}
            onClick={() => setStep(step - 1)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${step === 0 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
          >
            <ArrowLeft size={18} /> Back
          </button>
          
          <button 
            disabled={
              (step === 0 && !answers.grade) ||
              (step === 1 && answers.interests.length === 0) ||
              (step === 2 && answers.strengths.length === 0) ||
              (step === 3 && !answers.style)
            }
            onClick={nextStep}
            className="flex items-center gap-2 px-6 py-2 bg-indigo-600 disabled:bg-indigo-300 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
          >
            {step === 3 ? 'Finish' : 'Next'} <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizModule;