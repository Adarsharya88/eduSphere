import  { useState, useContext } from 'react';
import { Search, LayoutGrid, X, Heart, Map, Star } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import { COLLEGES_DATA } from '../data/mockData';

const CollegeFinder = () => {
  const { userProfile, toggleBookmark } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
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

export default CollegeFinder;
