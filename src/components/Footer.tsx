import { Compass } from 'lucide-react';

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
        <p className="text-slate-500 text-sm">Guiding students towards their true potential.</p>
      </div>
      <div><h4 className="font-bold mb-4">Features</h4><ul className="space-y-2 text-sm text-slate-500"><li>Assessment</li><li>Colleges</li></ul></div>
      <div><h4 className="font-bold mb-4">Resources</h4><ul className="space-y-2 text-sm text-slate-500"><li>Blog</li><li>Guides</li></ul></div>
      <div><h4 className="font-bold mb-4">Legal</h4><ul className="space-y-2 text-sm text-slate-500"><li>Privacy</li><li>Terms</li></ul></div>
    </div>
    <div className="container mx-auto mt-12 pt-8 border-t border-slate-100 dark:border-slate-800 text-center text-sm text-slate-400">
      © 2025 EduPath Navigator.
    </div>
  </footer>
);

export default Footer;
