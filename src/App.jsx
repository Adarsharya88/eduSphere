import React, { useState, useEffect, useContext, createContext } from "react";
import { 
  BookOpen, Compass, GraduationCap, Calculator, Map, 
  Search, Sun, Moon, ArrowRight, CheckCircle, 
  TrendingUp, Users, Award, Briefcase, Zap, 
  Menu, X, Heart, Star, LayoutGrid, ArrowLeft, Info, Filter
} from "lucide-react";

// --- MOCK DATA ---

const INTERESTS_LIST = [
  { id: 'tech', label: 'Technology & Coding', icon: '💻' },
  { id: 'bio', label: 'Biology & Health', icon: '🧬' },
  { id: 'art', label: 'Art & Design', icon: '🎨' },
  { id: 'math', label: 'Math & Logic', icon: '📐' },
  { id: 'biz', label: 'Business & Finance', icon: '📊' },
  { id: 'soc', label: 'Social Sciences', icon: '🤝' },
  { id: 'law', label: 'Law & Policy', icon: '⚖️' },
  { id: 'env', label: 'Environment', icon: '🌱' },
];

const STRENGTHS_LIST = [
  'Critical Thinking', 'Creativity', 'Communication', 'Problem Solving', 
  'Memorization', 'Leadership', 'Empathy', 'Technical Skills'
];

const COLLEGES_DATA = [
  {
    id: 1,
    name: "Indian Institute of Technology (IIT), Bombay",
    location: "Mumbai, Maharashtra",
    type: "Public",
    rating: 4.9,
    fees: "₹2.5L - ₹3L / year",
    avgPlacement: "₹18 LPA",
    programs: ["Computer Science", "Electrical Eng", "Mechanical Eng", "Design"],
    exams: ["JEE Advanced", "UCEED"],
    tags: ["Research", "Top Tier", "Engineering"],
    website: "www.iitb.ac.in",
    desc: "Premier engineering institute known for research and entrepreneurship."
  },
  {
    id: 2,
    name: "Ashoka University",
    location: "Sonipat, Haryana",
    type: "Private",
    rating: 4.7,
    fees: "₹9L - ₹11L / year",
    avgPlacement: "₹10 LPA",
    programs: ["Liberal Arts", "Economics", "Psychology", "Computer Science"],
    exams: ["Ashoka Aptitude Test", "SAT"],
    tags: ["Liberal Arts", "Interdisciplinary", "Beautiful Campus"],
    website: "www.ashoka.edu.in",
    desc: "Focuses on liberal education with a strong interdisciplinary approach."
  },
  {
    id: 3,
    name: "All India Institute of Medical Sciences (AIIMS)",
    location: "New Delhi, Delhi",
    type: "Public",
    rating: 4.9,
    fees: "₹1.6K / year",
    avgPlacement: "High (Clinical Practice)",
    programs: ["MBBS", "Nursing", "Biotech"],
    exams: ["NEET"],
    tags: ["Medical", "Top Tier", "Affordable"],
    website: "www.aiims.edu",
    desc: "The apex healthcare institute in India."
  },
  {
    id: 4,
    name: "National Institute of Design (NID)",
    location: "Ahmedabad, Gujarat",
    type: "Public",
    rating: 4.8,
    fees: "₹3L - ₹4L / year",
    avgPlacement: "₹8 LPA - ₹15 LPA",
    programs: ["Product Design", "Graphic Design", "Film", "Textile"],
    exams: ["NID DAT"],
    tags: ["Design", "Creative", "Portfolio"],
    website: "www.nid.edu",
    desc: "Pioneering institute for design education."
  },
  {
    id: 5,
    name: "Christ University",
    location: "Bangalore, Karnataka",
    type: "Private",
    rating: 4.3,
    fees: "₹1L - ₹2.5L / year",
    avgPlacement: "₹6 LPA",
    programs: ["BBA", "BCom", "Psychology", "Law"],
    exams: ["CUET"],
    tags: ["Commerce", "Management", "Strict Attendance"],
    website: "www.christuniversity.in",
    desc: "Known for management programs and holistic development."
  },
  {
    id: 6,
    name: "BITS Pilani",
    location: "Pilani, Rajasthan",
    type: "Private",
    rating: 4.8,
    fees: "₹5L - ₹6L / year",
    avgPlacement: "₹15 LPA",
    programs: ["Computer Science", "Electronics", "Pharmacy", "MSc Bio/Phy"],
    exams: ["BITSAT"],
    tags: ["Engineering", "No Attendance Policy", "Startup Culture"],
    website: "www.bits-pilani.ac.in",
    desc: "Renowned for its flexible academic structure and strong alumni network."
  }
];

const COMBO_PATHWAYS = {
  "tech-bio": {
    title: "Bioinformatics & HealthTech",
    careers: ["Bioinformatician", "Computational Biologist", "Health Data Analyst"],
    roadmap: ["Bachelor's in Biotech/CS", "Specialization in Genomics/Data Science", "Projects on Protein Folding AI"],
    desc: "Merge the logic of coding with the complexity of life sciences."
  },
  "art-tech": {
    title: "Creative Technologist / UI/UX",
    careers: ["UI/UX Designer", "Game Developer", "Generative Artist", "Frontend Dev"],
    roadmap: ["Bachelor's in Design or CS", "Learn Figma + React/Three.js", "Build Portfolio"],
    desc: "Where aesthetics meet algorithms. Build the digital interfaces of tomorrow."
  },
  "biz-tech": {
    title: "FinTech & Product Management",
    careers: ["Product Manager", "FinTech Analyst", "Blockchain Developer"],
    roadmap: ["B.Tech + MBA", "BBA with Coding Minor", "Certifications in Data Analytics"],
    desc: "Bridge the gap between business goals and engineering execution."
  },
  "law-soc": {
    title: "Policy & Advocacy",
    careers: ["Public Policy Analyst", "Human Rights Lawyer", "NGO Manager"],
    roadmap: ["BA Pol Sci -> LLB", "Internships at Think Tanks", "Masters in Public Policy"],
    desc: "Use legal frameworks to drive social change."
  },
  "env-biz": {
    title: "Sustainable Business (ESG)",
    careers: ["Sustainability Consultant", "Green Energy Manager", "Environmental Economist"],
    roadmap: ["BSc Env Science + MBA", "Courses in Circular Economy"],
    desc: "Make profitability compatible with planetary health."
  }
};

// --- APP CONTEXT ---
const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [currentView, setCurrentView] = useState('home');
  const [userProfile, setUserProfile] = useState({
    name: 'Guest',
    interests: [],
    strengths: [],
    grade: '',
    bookmarks: []
  });

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const navigate = (view) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentView(view);
  };

  const toggleBookmark = (collegeId) => {
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

// --- COMPONENTS ---

// 1. HEADER
const Header = () => {
  const { theme, toggleTheme, navigate, currentView } = useContext(AppContext);
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
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => navigate('home')}
        >
          <div className="bg-indigo-600 p-2 rounded-lg">
            <Compass className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400">
            EduPath
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => navigate(item.id)}
              className={`text-sm font-medium transition-colors ${
                currentView === item.id 
                  ? 'text-indigo-600 dark:text-indigo-400' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4 absolute w-full shadow-lg">
          <div className="flex flex-col gap-4">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  navigate(item.id);
                  setIsMenuOpen(false);
                }}
                className={`text-left text-base font-medium ${
                   currentView === item.id 
                  ? 'text-indigo-600 dark:text-indigo-400' 
                  : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

// 2. HERO / HOME
const Home = () => {
  const { navigate } = useContext(AppContext);

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-50 to-pink-50 dark:from-slate-900 dark:to-slate-800 -z-10" />
        <div className="absolute top-20 right-10 w-64 h-64 bg-purple-300/20 rounded-full blur-3xl -z-10" />
        
        <div className="container mx-auto max-w-4xl text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-sm font-semibold mb-6 border border-indigo-200 dark:border-indigo-800">
            AI-Powered Career Guidance
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Discover Your Perfect <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400">
              Education Pathway
            </span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-10 max-w-2xl mx-auto">
            Confused about your future? Whether you're in Class 6 or College, we analyze your interests, strengths, and goals to build a personalized roadmap just for you.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate('quiz')}
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-500/30 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              Start "Find My Path" <ArrowRight size={20} />
            </button>
            <button 
              onClick={() => navigate('colleges')}
              className="px-8 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2"
            >
              Explore Colleges <Search size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-20 px-4 container mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">How We Help You</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Calculator className="w-8 h-8 text-blue-500" />,
              title: "Interactive Assessment",
              desc: "A conversational quiz that understands your unique personality and aptitude.",
              action: "Take Quiz",
              route: 'quiz'
            },
            {
              icon: <LayoutGrid className="w-8 h-8 text-purple-500" />,
              title: "Combo Explorer",
              desc: "Love Biology AND Tech? Discover blended careers like Bioinformatics.",
              action: "Mix Interests",
              route: 'combo'
            },
            {
              icon: <Map className="w-8 h-8 text-green-500" />,
              title: "Bridge Planner",
              desc: "Stuck in a course you don't like? Find a strategic way to pivot.",
              action: "Plan Pivot",
              route: 'planner'
            }
          ].map((feature, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow">
              <div className="bg-slate-50 dark:bg-slate-700/50 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">{feature.desc}</p>
              <button 
                onClick={() => navigate(feature.route)}
                className="text-indigo-600 dark:text-indigo-400 font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all"
              >
                {feature.action} <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

// 3. QUIZ MODULE
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
      // Toggle logic for arrays
      if (Array.isArray(prev[field])) {
        if (prev[field].includes(value)) {
          return { ...prev, [field]: prev[field].filter(item => item !== value) };
        } else {
          // Limit selections
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
      // Simulate AI processing
      setTimeout(() => {
        setUserProfile({ ...userProfile, ...answers });
        setLoading(false);
        setStep(4); // Results view
      }, 1500);
    }
  };

  // Quiz Result Component
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
          {/* Recommendation Card */}
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
            
            <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-xl mb-4">
              <h4 className="font-semibold mb-2 text-sm uppercase tracking-wider text-slate-500">Why this match?</h4>
              <ul className="text-sm space-y-2">
                <li className="flex gap-2">
                  <CheckCircle size={16} className="text-green-500 mt-0.5" />
                  <span>Aligns with your curiosity in {primaryInterest.label}.</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle size={16} className="text-green-500 mt-0.5" />
                  <span>Leverages your {answers.strengths[0]} skills.</span>
                </li>
              </ul>
            </div>
            
            <button className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors">
              View Detailed Roadmap
            </button>
          </div>

          {/* Action Plan */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg">Next Steps for {answers.grade} Student</h3>
            
            <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 flex gap-4">
              <div className="mt-1"><BookOpen className="text-blue-500" size={20}/></div>
              <div>
                <h4 className="font-semibold">Key Subjects to Focus On</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">Math, {primaryInterest.id === 'bio' ? 'Biology' : 'Physics'}, English</p>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 flex gap-4">
              <div className="mt-1"><Award className="text-purple-500" size={20}/></div>
              <div>
                <h4 className="font-semibold">Suggested Certifications</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">Intro to {primaryInterest.label}, Public Speaking Workshop</p>
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
      {/* Progress Bar */}
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

// 4. COLLEGE FINDER
const CollegeFinder = () => {
  const { userProfile, toggleBookmark } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All'); // All, Public, Private
  const [compareList, setCompareList] = useState([]);
  const [showCompare, setShowCompare] = useState(false);

  const filteredColleges = COLLEGES_DATA.filter(college => {
    const matchesSearch = college.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          college.programs.some(p => p.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = filterType === 'All' || college.type === filterType;
    return matchesSearch && matchesType;
  });

  const toggleCompare = (college) => {
    if (compareList.find(c => c.id === college.id)) {
      setCompareList(compareList.filter(c => c.id !== college.id));
    } else {
      if (compareList.length < 3) setCompareList([...compareList, college]);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold mb-2">Find Your College</h2>
          <p className="text-slate-600 dark:text-slate-400">Compare opportunities, fees, and placements.</p>
        </div>
        
        {compareList.length > 0 && (
          <button 
            onClick={() => setShowCompare(!showCompare)}
            className="px-4 py-2 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded-lg font-medium border border-indigo-200 dark:border-indigo-800 flex items-center gap-2"
          >
            <LayoutGrid size={18} />
            Compare ({compareList.length})
          </button>
        )}
      </div>

      {/* Compare Modal/View */}
      {showCompare && compareList.length > 0 && (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xl mb-8 overflow-x-auto">
           <div className="flex justify-between items-center mb-4">
             <h3 className="text-xl font-bold">Comparison Table</h3>
             <button onClick={() => setShowCompare(false)}><X size={20}/></button>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 min-w-[600px]">
             {compareList.map(c => (
               <div key={c.id} className="border-r last:border-0 border-slate-200 dark:border-slate-700 pr-4">
                 <h4 className="font-bold text-lg mb-2 h-14">{c.name}</h4>
                 <div className="space-y-3 text-sm">
                   <p><span className="text-slate-500 block">Location:</span> {c.location}</p>
                   <p><span className="text-slate-500 block">Fees:</span> {c.fees}</p>
                   <p><span className="text-slate-500 block">Avg Placement:</span> {c.avgPlacement}</p>
                   <p><span className="text-slate-500 block">Rating:</span> ⭐ {c.rating}/5</p>
                 </div>
               </div>
             ))}
           </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3.5 text-slate-400" size={20} />
          <input 
            type="text"
            placeholder="Search colleges, courses, or cities..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
          {['All', 'Public', 'Private'].map(type => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-6 py-3 rounded-xl font-medium border whitespace-nowrap transition-all ${
                filterType === type 
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-transparent' 
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredColleges.map(college => (
          <div key={college.id} className="group bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col">
            <div className="p-6 flex-1">
              <div className="flex justify-between items-start mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${college.type === 'Public' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'}`}>
                  {college.type}
                </span>
                <div className="flex gap-2">
                   <button 
                     onClick={() => toggleCompare(college)}
                     className={`p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 ${compareList.find(c => c.id === college.id) ? 'text-indigo-600 bg-indigo-50' : 'text-slate-400'}`}
                     title="Compare"
                   >
                     <LayoutGrid size={18} />
                   </button>
                   <button 
                    onClick={() => toggleBookmark(college.id)}
                    className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700"
                   >
                     <Heart 
                       size={18} 
                       className={userProfile.bookmarks.includes(college.id) ? "fill-red-500 text-red-500" : "text-slate-400"}
                     />
                   </button>
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-2 group-hover:text-indigo-600 transition-colors">{college.name}</h3>
              <p className="text-slate-500 text-sm mb-4 flex items-center gap-1">
                <Map size={14} /> {college.location}
              </p>
              
              <div className="grid grid-cols-2 gap-y-2 text-sm mb-4">
                <div>
                  <span className="text-slate-400 block text-xs">Rating</span>
                  <span className="font-semibold flex items-center gap-1">
                    {college.rating} <Star size={12} className="fill-yellow-400 text-yellow-400"/>
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">Avg. Fees</span>
                  <span className="font-semibold">{college.fees.split(' ')[0]}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {college.programs.slice(0, 3).map(p => (
                  <span key={p} className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs rounded-md">
                    {p}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 flex justify-between items-center">
              <span className="text-xs text-slate-500">Exams: {college.exams.join(', ')}</span>
              <button className="text-indigo-600 dark:text-indigo-400 font-semibold text-sm hover:underline">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {filteredColleges.length === 0 && (
        <div className="text-center py-20">
          <p className="text-slate-500 text-lg">No colleges found matching your criteria.</p>
          <button 
            onClick={() => {setSearchTerm(''); setFilterType('All');}}
            className="mt-4 text-indigo-600 hover:underline"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

// 5. COMBO EXPLORER
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
    
    // Check both combinations key1-key2 and key2-key1
    let result = COMBO_PATHWAYS[`${key1}-${key2}`] || COMBO_PATHWAYS[`${key2}-${key1}`];
    
    // Generic fallback if no specific combo exists
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

// 6. PIVOT PLANNER
const PivotPlanner = () => {
  const [current, setCurrent] = useState('');
  const [target, setTarget] = useState('');
  const [plan, setPlan] = useState(null);

  const generatePlan = () => {
    // Simple mock logic for demonstration
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

// 7. FOOTER
const Footer = () => (
  <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-12 px-4 mt-auto">
    <div className="container mx-auto grid md:grid-cols-4 gap-8">
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="bg-indigo-600 p-1.5 rounded-md">
            <Compass className="text-white w-4 h-4" />
          </div>
          <span className="text-lg font-bold">EduPath</span>
        </div>
        <p className="text-slate-500 text-sm">
          Guiding students towards their true potential with data-driven insights and personalized roadmaps.
        </p>
      </div>
      <div>
        <h4 className="font-bold mb-4">Features</h4>
        <ul className="space-y-2 text-sm text-slate-500">
          <li>Assessment Quiz</li>
          <li>College Finder</li>
          <li>Combo Explorer</li>
          <li>Bridge Planner</li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold mb-4">Resources</h4>
        <ul className="space-y-2 text-sm text-slate-500">
          <li>Scholarship Database</li>
          <li>Exam Calendar 2025</li>
          <li>Study Tips Blog</li>
          <li>Parent Guide</li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold mb-4">Legal</h4>
        <ul className="space-y-2 text-sm text-slate-500">
          <li>Privacy Policy</li>
          <li>Terms of Service</li>
          <li>Data Disclaimer</li>
          <li>Contact Us</li>
        </ul>
      </div>
    </div>
    <div className="container mx-auto mt-12 pt-8 border-t border-slate-100 dark:border-slate-800 text-center text-sm text-slate-400">
      © 2025 EduPath Navigator. All rights reserved. Data is for demonstration purposes.
    </div>
  </footer>
);

// MAIN LAYOUT
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
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {renderView()}
      </main>
      <Footer />
    </div>
  );
};

// WRAPPER & DEFAULT EXPORT
 function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}

export default App;