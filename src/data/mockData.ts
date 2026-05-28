export interface InterestItem {
  id: string;
  label: string;
  icon: string;
}

export interface College {
  id: number;
  name: string;
  location: string;
  type: 'Public' | 'Private' | string;
  rating: number;
  fees: string;
  avgPlacement: string;
  programs: string[];
  exams: string[];
  tags: string[];
  website: string;
  desc: string;
}

export interface ComboPathway {
  title: string;
  careers: string[];
  roadmap: string[];
  desc: string;
}

export type ComboPathways = Record<string, ComboPathway>;

export const INTERESTS_LIST: InterestItem[] = [
  { id: 'tech', label: 'Technology & Coding', icon: '💻' },
  { id: 'bio', label: 'Biology & Health', icon: '🧬' },
  { id: 'art', label: 'Art & Design', icon: '🎨' },
  { id: 'math', label: 'Math & Logic', icon: '📐' },
  { id: 'biz', label: 'Business & Finance', icon: '📊' },
  { id: 'soc', label: 'Social Sciences', icon: '🤝' },
  { id: 'law', label: 'Law & Policy', icon: '⚖️' },
  { id: 'env', label: 'Environment', icon: '🌱' },
];

export const STRENGTHS_LIST: string[] = [
  'Critical Thinking', 'Creativity', 'Communication', 'Problem Solving',
  'Memorization', 'Leadership', 'Empathy', 'Technical Skills'
];

export const COLLEGES_DATA: College[] = [
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
    desc: "Premier engineering institute."
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
    tags: ["Liberal Arts", "Interdisciplinary"],
    website: "www.ashoka.edu.in",
    desc: "Focuses on liberal education."
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
    tags: ["Medical", "Top Tier"],
    website: "www.aiims.edu",
    desc: "Apex healthcare institute in India."
  }
];

export const COMBO_PATHWAYS: ComboPathways = {
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
