import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import { 
  Mail, 
  ExternalLink, 
  Code2, 
  Database, 
  Terminal, 
  Globe, 
  Cpu, 
  ChevronDown, 
  ChevronUp, 
  X, 
  Search, 
  Filter, 
  Briefcase, 
  GraduationCap, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  Star, 
  GitBranch,
  Layers,
  Server
} from 'lucide-react';

// --- DATA ---

const PERSONAL_INFO = {
  name: "Alex Developer",
  role: "Computer Science Student",
  email: "alex@example.com",
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  location: "San Francisco, CA"
};

const ROLES = ["Software Engineer", "Full Stack Developer", "AI Enthusiast", "Problem Solver"];

const SKILLS_DATA = {
  "Programming Languages": [
    { name: "Java", desc: "Enterprise application development", icon: <Cpu size={24} /> },
    { name: "Python", desc: "Data analysis, ML & scripting", icon: <Terminal size={24} /> },
    { name: "C++", desc: "High-performance & system programming", icon: <Code2 size={24} /> },
    { name: "JavaScript", desc: "Interactive web elements", icon: <Globe size={24} /> },
    { name: "TypeScript", desc: "Type-safe web development", icon: <Code2 size={24} /> },
    { name: "SQL", desc: "Relational database querying", icon: <Database size={24} /> }
  ],
  "Frontend": [
    { name: "React", desc: "Component-based UI library", icon: <Globe size={24} /> },
    { name: "HTML5", desc: "Web structure & semantics", icon: <Globe size={24} /> },
    { name: "CSS3", desc: "Styling & layout design", icon: <Layers size={24} /> },
    { name: "Tailwind CSS", desc: "Utility-first CSS framework", icon: <Layers size={24} /> },
    { name: "Next.js", desc: "React framework for production", icon: <Globe size={24} /> }
  ],
  "Backend": [
    { name: "Node.js", desc: "Server-side JavaScript runtime", icon: <Server size={24} /> },
    { name: "Express.js", desc: "Web application framework", icon: <Server size={24} /> },
    { name: "FastAPI", desc: "High-performance Python API framework", icon: <Terminal size={24} /> },
    { name: "REST APIs", desc: "API architecture & integration", icon: <GitBranch size={24} /> }
  ],
  "Databases": [
    { name: "PostgreSQL", desc: "Advanced open-source RDBMS", icon: <Database size={24} /> },
    { name: "MySQL", desc: "Popular relational database", icon: <Database size={24} /> },
    { name: "MongoDB", desc: "NoSQL document database", icon: <Database size={24} /> },
    { name: "Firebase", desc: "Backend-as-a-Service & real-time DB", icon: <Database size={24} /> }
  ],
  "Cloud & DevOps": [
    { name: "Git", desc: "Distributed version control", icon: <GitBranch size={24} /> },
    { name: "Docker", desc: "Application containerization", icon: <Layers size={24} /> },
    { name: "Google Cloud", desc: "Cloud computing services (GCP)", icon: <Server size={24} /> },
    { name: "Linux", desc: "Server administration & CLI", icon: <Terminal size={24} /> }
  ],
  "Tools & Technologies": [
    { name: "VS Code", desc: "Primary code editor & IDE", icon: <Code2 size={24} /> },
    { name: "Postman", desc: "API development & testing", icon: <Globe size={24} /> },
    { name: "Figma", desc: "Collaborative UI/UX design", icon: <Layers size={24} /> },
    { name: "Power Automate", desc: "Enterprise workflow automation", icon: <Cpu size={24} /> },
    { name: "UiPath", desc: "Robotic Process Automation (RPA)", icon: <Cpu size={24} /> }
  ]
};

const EXPERIENCE = [
  {
    id: 1,
    company: "TechNova Solutions",
    position: "Software Engineering Intern",
    dates: "May 2025 - Aug 2025",
    responsibilities: [
      "Developed and maintained React-based frontend components, increasing user engagement by 15%.",
      "Designed robust RESTful APIs using Node.js and Express.",
      "Optimized database queries in PostgreSQL, reducing load times by 20%."
    ],
    technologies: ["React", "Node.js", "PostgreSQL", "Docker"]
  },
  {
    id: 2,
    company: "University Research Lab",
    position: "Undergraduate Research Assistant",
    dates: "Jan 2024 - Present",
    responsibilities: [
      "Assisted in developing machine learning models for natural language processing tasks.",
      "Processed and cleaned datasets of over 1 million records using Python and Pandas.",
      "Co-authored a paper accepted into a regional undergraduate conference."
    ],
    technologies: ["Python", "PyTorch", "Pandas", "Jupyter"]
  }
];

const PROJECTS = [
  {
    id: "1",
    title: "EcoTrack AI",
    category: "Machine Learning",
    shortDesc: "An AI-powered application to monitor and optimize personal carbon footprint.",
    longDesc: "EcoTrack AI leverages machine learning algorithms to analyze user spending and travel habits to estimate carbon footprints accurately. It provides actionable recommendations for sustainable living.",
    tech: ["Python", "TensorFlow", "React", "MongoDB"],
    github: "#",
    demo: "#",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "2",
    title: "DevCollab Platform",
    category: "Web Applications",
    shortDesc: "Real-time collaborative code editor with integrated video chat.",
    longDesc: "A complex real-time application allowing multiple developers to edit code simultaneously. Features syntax highlighting, live execution for JS/Python, and peer-to-peer video streaming.",
    tech: ["Next.js", "Socket.io", "WebRTC", "Tailwind"],
    github: "#",
    demo: "#",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "3",
    title: "CryptoPortfolio Manager",
    category: "Mobile Apps",
    shortDesc: "Cross-platform mobile app for tracking cryptocurrency investments.",
    longDesc: "Integrated with multiple exchange APIs to provide real-time portfolio valuation, interactive charting, and custom price alerts using push notifications.",
    tech: ["React Native", "Firebase", "Redux", "REST APIs"],
    github: "#",
    demo: "#",
    image: "https://images.unsplash.com/photo-1605792657660-596af9009e82?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "4",
    title: "Algorithm Visualizer",
    category: "Academic Projects",
    shortDesc: "Interactive web tool to visualize sorting and pathfinding algorithms.",
    longDesc: "Designed to help computer science students understand complex algorithms. Features step-by-step execution, speed control, and code highlighting for algorithms like A*, Dijkstra, and QuickSort.",
    tech: ["React", "TypeScript", "Framer Motion"],
    github: "#",
    demo: "#",
    image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=800"
  }
];

// --- COMPONENTS ---

// 1. Particle Background
const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{ x: number; y: number; dx: number; dy: number; size: number }> = [];
    
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
      });
    }

    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(56, 189, 248, 0.2)'; // Sky-400 with low opacity
        ctx.fill();
      });
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />;
};

// 2. Animated Counter
const AnimatedCounter = ({ end, duration = 2, suffix = "" }: { end: number, duration?: number, suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      let animationFrame: number;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = (timestamp - startTime) / (duration * 1000);
        
        if (progress < 1) {
          setCount(Math.min(Math.floor(end * progress), end));
          animationFrame = requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };
      animationFrame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrame);
    }
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

// 3. Tech Orbit
const TechOrbit = () => {
  return (
    <div className="relative w-80 h-80 flex items-center justify-center scale-75 md:scale-100">
      {/* Center Avatar */}
      <div className="absolute z-10 w-24 h-24 rounded-full border-2 border-sky-400 overflow-hidden bg-slate-800 flex items-center justify-center p-1">
        <div className="w-full h-full rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center text-white font-bold text-2xl shadow-[0_0_15px_rgba(56,189,248,0.5)]">
          AD
        </div>
      </div>

      {/* Orbit Rings & Icons */}
      <div className="absolute inset-0">
        {/* Ring 1 */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-slate-700/50" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 animate-[spin_10s_linear_infinite]">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-slate-900 border border-slate-700 rounded-full flex items-center justify-center text-sky-400 animate-[spin_10s_linear_infinite_reverse]">
            <Globe size={16} />
          </div>
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-slate-900 border border-slate-700 rounded-full flex items-center justify-center text-amber-400 animate-[spin_10s_linear_infinite_reverse]">
            <Code2 size={16} />
          </div>
        </div>

        {/* Ring 2 */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full border border-slate-700/50" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 animate-[spin_15s_linear_infinite_reverse]">
          <div className="absolute top-1/2 -left-5 -translate-y-1/2 w-10 h-10 bg-slate-900 border border-slate-700 rounded-full flex items-center justify-center text-blue-500 animate-[spin_15s_linear_infinite]">
            <Database size={20} />
          </div>
          <div className="absolute top-1/2 -right-5 -translate-y-1/2 w-10 h-10 bg-slate-900 border border-slate-700 rounded-full flex items-center justify-center text-indigo-400 animate-[spin_15s_linear_infinite]">
            <Cpu size={20} />
          </div>
          <div className="absolute -bottom-2 right-10 w-8 h-8 bg-slate-900 border border-slate-700 rounded-full flex items-center justify-center text-green-400 animate-[spin_15s_linear_infinite]">
            <Terminal size={16} />
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MAIN SECTIONS ---

const Hero = () => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <ParticleBackground />
      
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10 w-full">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700 w-fit">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm font-medium text-slate-300">Available for Summer 2026 Internships</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-slate-100 tracking-tight">
            Hi, I'm <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-500">
              {PERSONAL_INFO.name}
            </span>
          </h1>
          
          <div className="h-8 md:h-12 overflow-hidden relative">
            <AnimatePresence mode="wait">
              <motion.h2
                key={currentRoleIndex}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -40, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="text-2xl md:text-3xl text-slate-400 font-medium absolute"
              >
                {ROLES[currentRoleIndex]}
              </motion.h2>
            </AnimatePresence>
          </div>

          <p className="text-slate-400 max-w-lg leading-relaxed text-lg">
            I'm a passionate Computer Science student dedicated to building scalable software and exploring the frontiers of Artificial Intelligence.
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-4">
            <a href="#projects" className="px-8 py-3 rounded-full bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold transition-all hover:shadow-[0_0_20px_rgba(56,189,248,0.4)] hover:-translate-y-1">
              View Projects
            </a>
            <a href="#contact" className="px-8 py-3 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-100 font-medium border border-slate-700 transition-all hover:-translate-y-1">
              Contact Me
            </a>
            <div className="flex items-center gap-3 ml-2">

            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hidden lg:flex justify-center items-center"
        >
          <TechOrbit />
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500"
      >
        <span className="text-sm">Scroll to explore</span>
        <ChevronDown className="animate-bounce" size={20} />
      </motion.div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">About Me</h2>
          <div className="w-20 h-1 bg-sky-500 mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6 text-slate-300 leading-relaxed"
          >
            <p>
              I am currently pursuing a Bachelor's degree in Computer Science, focusing on Software Engineering and Cloud Computing. My journey in tech started when I built my first web app in high school, and since then, I've been obsessed with turning ideas into reality through code.
            </p>
            <p>
              Beyond the classroom, I actively participate in hackathons, contribute to open-source, and experiment with emerging technologies like AI and Web3.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mt-8">
              {[
                { label: "Location", value: PERSONAL_INFO.location, icon: <MapPin size={18} /> },
                { label: "Education", value: "B.S. Computer Science", icon: <GraduationCap size={18} /> },
                { label: "Interests", value: "AI, Web, Cloud", icon: <Star size={18} /> },
                { label: "Availability", value: "Summer 2026", icon: <Calendar size={18} /> }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                  <div className="text-sky-400 mt-0.5">{item.icon}</div>
                  <div>
                    <div className="text-xs text-slate-500 font-medium mb-1">{item.label}</div>
                    <div className="text-sm text-slate-200 font-medium">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { count: 15, label: "Projects Completed", suffix: "+" },
              { count: 12, label: "Technologies Mastered", suffix: "" },
              { count: 3, label: "Years Coding", suffix: "+" },
              { count: 1, label: "Internships", suffix: "" }
            ].map((stat, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/50 flex flex-col items-center justify-center text-center group hover:border-sky-500/50 transition-colors">
                <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400 mb-2">
                  <AnimatedCounter end={stat.count} suffix={stat.suffix} />
                </div>
                <div className="text-sm font-medium text-slate-400 group-hover:text-slate-300 transition-colors">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Skills = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const categories = ["All", ...Object.keys(SKILLS_DATA)];

  const getFilteredSkills = () => {
    if (activeFilter === "All") {
      const allSkills = Object.values(SKILLS_DATA).flat();
      // Remove duplicates based on name if any exist across categories
      return Array.from(new Map(allSkills.map(item => [item.name, item])).values());
    }
    return SKILLS_DATA[activeFilter as keyof typeof SKILLS_DATA] || [];
  };

  const displayedSkills = getFilteredSkills();

  return (
    <section id="skills" className="py-24 relative bg-slate-900/20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">Tech Stack</h2>
          <div className="w-20 h-1 bg-sky-500 mx-auto rounded-full mb-10" />
          
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === category 
                    ? 'bg-sky-500 text-slate-950 shadow-[0_0_20px_rgba(56,189,248,0.4)] scale-105' 
                    : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
          <AnimatePresence mode="popLayout">
            {displayedSkills.map((skill) => (
              <motion.div
                layout
                key={skill.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="group relative flex items-center gap-3 p-4 bg-slate-800/30 border border-slate-700/50 rounded-xl cursor-pointer hover:-translate-y-1 hover:border-sky-500/50 hover:bg-slate-800/80 hover:shadow-[0_4px_20px_rgba(56,189,248,0.1)] transition-all duration-300"
              >
                <div className="text-slate-400 group-hover:text-sky-400 transition-colors duration-300 shrink-0">
                  {skill.icon}
                </div>
                <span className="text-sm font-medium text-slate-300 group-hover:text-slate-100 transition-colors truncate">
                  {skill.name}
                </span>

                {/* Hover Tooltip */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 -translate-y-full w-48 p-3 bg-slate-800 border border-slate-700 shadow-2xl text-xs text-slate-300 rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-20 text-center pointer-events-none leading-relaxed">
                  {skill.desc}
                  {/* Tooltip Arrow */}
                  <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-800 border-b border-r border-slate-700 rotate-45"></div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

const ExperienceTimeline = () => {
  return (
    <section id="experience" className="py-24 relative">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">Experience</h2>
          <div className="w-20 h-1 bg-sky-500 mx-auto rounded-full" />
        </motion.div>

        <div className="relative border-l border-slate-700 ml-4 md:ml-0 md:pl-0">
          {EXPERIENCE.map((exp, idx) => (
            <motion.div 
              key={exp.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="mb-12 relative pl-8 md:pl-0"
            >
              <div className="md:grid md:grid-cols-5 items-start relative group">
                {/* Timeline Dot */}
                <div className="absolute -left-[41px] md:left-[19.5%] md:-translate-x-1/2 mt-1.5 w-4 h-4 rounded-full bg-slate-900 border-2 border-sky-400 z-10 group-hover:bg-sky-400 transition-colors" />
                
                {/* Dates (Desktop Left side) */}
                <div className="hidden md:block col-span-1 text-right pr-12 text-sm text-slate-400 font-medium pt-1">
                  {exp.dates}
                </div>

                {/* Content */}
                <div className="md:col-span-4 p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50 hover:bg-slate-800/50 hover:border-slate-600 transition-colors md:ml-12">
                  <div className="md:hidden text-sm text-sky-400 font-medium mb-2">{exp.dates}</div>
                  <h3 className="text-xl font-bold text-slate-100">{exp.position}</h3>
                  <div className="flex items-center gap-2 text-slate-400 mt-1 mb-4">
                    <Briefcase size={16} />
                    <span>{exp.company}</span>
                  </div>
                  
                  <ul className="space-y-3 mb-6">
                    {exp.responsibilities.map((resp, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-300 text-sm leading-relaxed">
                        <CheckCircle2 size={16} className="text-sky-500 shrink-0 mt-0.5" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, i) => (
                      <span key={i} className="px-3 py-1 text-xs font-medium rounded-full bg-slate-900/80 text-slate-300 border border-slate-700">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);

  const categories = ["All", ...Array.from(new Set(PROJECTS.map(p => p.category)))];

  const filteredProjects = PROJECTS.filter(p => {
    const matchesCategory = filter === "All" || p.category === filter;
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || 
                          p.tech.some(t => t.toLowerCase().includes(search.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedProject]);

  return (
    <section id="projects" className="py-24 relative bg-slate-900/20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">Featured Projects</h2>
          <div className="w-20 h-1 bg-sky-500 mx-auto rounded-full mb-8" />
        </motion.div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          <div className="flex flex-wrap justify-center md:justify-start gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === cat 
                    ? 'bg-sky-500/10 text-sky-400 border border-sky-500/50' 
                    : 'bg-slate-800/50 text-slate-400 border border-slate-700 hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              type="text" 
              placeholder="Search projects or tech..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-900/50 border border-slate-700 rounded-full py-2 pl-10 pr-4 text-sm text-slate-200 focus:outline-none focus:border-sky-500 transition-colors placeholder-slate-500"
            />
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group flex flex-col bg-slate-800/30 border border-slate-700/50 rounded-2xl overflow-hidden hover:-translate-y-2 transition-all hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-slate-900/80 mix-blend-overlay z-10 group-hover:bg-transparent transition-colors duration-500" />
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-4 left-4 z-20">
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-slate-900/80 text-sky-400 border border-sky-900/50 backdrop-blur-sm">
                      {project.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-slate-100 mb-2 group-hover:text-sky-400 transition-colors">{project.title}</h3>
                  <p className="text-sm text-slate-400 mb-6 flex-1">{project.shortDesc}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.slice(0,3).map(t => (
                      <span key={t} className="text-xs font-medium text-slate-300">#{t}</span>
                    ))}
                    {project.tech.length > 3 && <span className="text-xs font-medium text-slate-500">+{project.tech.length - 3}</span>}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-700/50 mt-auto">
                    <span className="text-sm text-sky-400 font-medium">View Details &rarr;</span>
                    <div className="flex gap-3 text-slate-400">
                      <div className="hover:text-white transition-colors"><ExternalLink size={18} /></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-400">No projects found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          >
            <div 
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" 
              onClick={() => setSelectedProject(null)} 
            />
            
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl z-10 custom-scrollbar"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 bg-slate-800 rounded-full text-slate-400 hover:text-white hover:bg-slate-700 transition-colors z-20"
              >
                <X size={20} />
              </button>

              <div className="h-64 sm:h-80 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10" />
                <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
              </div>

              <div className="p-6 sm:p-8 -mt-20 relative z-20">
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 mb-4 inline-block backdrop-blur-md">
                  {selectedProject.category}
                </span>
                <h2 className="text-3xl font-bold text-white mb-4">{selectedProject.title}</h2>
                
                <p className="text-slate-300 leading-relaxed mb-8">
                  {selectedProject.longDesc}
                </p>

                <div className="mb-8">
                  <h4 className="text-sm font-semibold text-slate-100 uppercase tracking-wider mb-4">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map(t => (
                      <span key={t} className="px-3 py-1.5 text-sm font-medium rounded-lg bg-slate-800 text-slate-300 border border-slate-700">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-6 border-t border-slate-800">
                  <a href={selectedProject.demo} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold transition-all">
                    <ExternalLink size={18} />
                    Live Demo
                  </a>

                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

// --- MAIN APP ---

export default function App() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-sky-500/30 selection:text-sky-200 font-sans">
      {/* Global Styles for Scrollbar & Orbit */}
      <style dangerouslySetInnerHTML={{__html: `
        html { scroll-behavior: smooth; }
        body { overflow-x: hidden; }
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #0f172a; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #475569; }
      `}} />

      {/* Mouse Gradient Effect */}
      <div 
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(56, 189, 248, 0.03), transparent 80%)`
        }}
      />

      {/* Navigation */}
      <header className={`fixed top-0 w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-slate-950/80 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#home" className="text-xl font-bold text-white flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center text-sm">AD</div>
            <span>Alex.dev</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
                {link.name}
              </a>
            ))}
            <a href="#" className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-all border border-white/5">
              Resume
            </a>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-slate-300 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <div className="space-y-1.5"><div className="w-6 h-0.5 bg-current"></div><div className="w-6 h-0.5 bg-current"></div><div className="w-4 h-0.5 bg-current"></div></div>}
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden absolute top-full left-0 w-full bg-slate-900 border-b border-slate-800 overflow-hidden"
            >
              <nav className="flex flex-col px-6 py-4 gap-4">
                {navLinks.map((link) => (
                  <a 
                    key={link.name} 
                    href={link.href} 
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-base font-medium text-slate-300 hover:text-white transition-colors py-2 border-b border-slate-800/50"
                  >
                    {link.name}
                  </a>
                ))}
                <a href="#" className="mt-2 px-4 py-3 rounded-xl bg-sky-500 text-slate-950 text-center font-semibold">
                  Download Resume
                </a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        <Hero />
        <About />
        <Skills />
        <ExperienceTimeline />
        <Projects />
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-800/50 relative bg-slate-950 mt-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
             <div className="w-6 h-6 rounded bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center text-[10px] font-bold text-white">AD</div>
             <span className="font-semibold text-slate-100">Alex Developer</span>
          </div>
          
          <p className="text-sm text-slate-500 text-center md:text-left">
            © {new Date().getFullYear()} Built with React, Tailwind & Framer Motion.
          </p>

          <div className="flex items-center gap-4">

            <a href={`mailto:${PERSONAL_INFO.email}`} className="text-slate-400 hover:text-white transition-colors">
              <Mail size={20} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}