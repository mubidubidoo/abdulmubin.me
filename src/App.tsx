
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import {
  Briefcase,
  ChevronRight,
  Cloud,
  Download,
  Github,
  GraduationCap,
  Linkedin,
  Lock,
  Mail,
  Puzzle,
  Rocket,
  Smartphone,
  Zap,
} from 'lucide-react';
import amLogo from './assets/am-logo.png';

interface Project {
  title: string;
  summary: string;
  details: string;
  tags: string[];
}

interface Deliverable {
  keyword: string;
  label: string;
  icon: React.ReactNode;
}

const GITHUB_URL = 'https://github.com/mubidubidoo';
const LINKEDIN_URL = 'https://www.linkedin.com/in/abdul-mubin/';
const CV_URL = '/Abdul_Mubin_CV.pdf';

const STACK_ITEMS = [
  'React',
  'Node.js',
  'TypeScript',
  'MongoDB',
  'Tailwind CSS',
  'Vite',
  'Responsive UI',
  'Performance',
  'System Design',
];

const PROJECTS: Project[] = [
  {
    title: 'Diet Planner',
    summary: 'A structured health planning app focused on meal consistency and easy progress tracking.',
    details:
      'Built a clean dashboard experience for planning daily meals, following routines, and keeping the interface simple enough for everyday use.',
    tags: ['Health', 'Planner', 'Dashboard'],
  },
  {
    title: 'Imposter Who?',
    summary: 'A multiplayer social game experience designed for smoother rounds and clearer interaction.',
    details:
      'Created a polished realtime party-game flow with better setup, cleaner state handling, and a more engaging reveal experience.',
    tags: ['Game', 'Realtime', 'Multiplayer'],
  },
  {
    title: 'Health Analyzer',
    summary: 'A report-analysis workflow that turns dense medical documents into easier first-pass understanding.',
    details:
      'Designed a flow that extracts text from medical reports using OCR and generates preliminary AI-assisted summaries for faster review.',
    tags: ['OCR', 'AI', 'Health'],
  },
];

const DELIVERABLES: Deliverable[] = [
  { keyword: 'FAST', label: 'Performance', icon: <Zap size={28} strokeWidth={1.8} /> },
  { keyword: 'SCALABLE', label: 'Growth Ready', icon: <Rocket size={28} strokeWidth={1.8} /> },
  { keyword: 'SECURE', label: 'Reliable', icon: <Lock size={28} strokeWidth={1.8} /> },
  { keyword: 'STRUCTURED', label: 'Clean Code', icon: <Puzzle size={28} strokeWidth={1.8} /> },
  { keyword: 'RESPONSIVE', label: 'All Devices', icon: <Smartphone size={28} strokeWidth={1.8} /> },
  { keyword: 'DEPLOYED', label: 'Cloud Ready', icon: <Cloud size={28} strokeWidth={1.8} /> },
];

const SECTIONS = [
  { id: 'home', label: 'Home', number: '01' },
  { id: 'about', label: 'About', number: '02' },
  { id: 'projects', label: 'Work', number: '03' },
  { id: 'contact', label: 'Contact', number: '04' },
] as const;

const BrandLogo = ({ className = '', size = 56 }: { className?: string; size?: number }) => (
  <img
    src={amLogo}
    alt="AM logo"
    width={size}
    height={size}
    className={className}
    draggable={false}
  />
);

const InteractiveBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrame = 0;
    let particles: { x: number; y: number; vx: number; vy: number }[] = [];

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const count = Math.min(Math.floor((canvas.width * canvas.height) / 8500), 160);
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.16,
        vy: (Math.random() - 0.5) * 0.16,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      }

      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 96) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(200, 208, 224, ${0.08 * (1 - dist / 96)})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      if (mouseRef.current.active) {
        for (const p of particles) {
          const dx = mouseRef.current.x - p.x;
          const dy = mouseRef.current.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 125) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(232, 236, 244, ${0.18 * (1 - dist / 125)})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
            ctx.stroke();
          }
        }
      }

      animationFrame = requestAnimationFrame(draw);
    };

    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
    };
    const onLeave = () => {
      mouseRef.current.active = false;
    };
    const onResize = () => init();

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseleave', onLeave);
    window.addEventListener('resize', onResize);
    init();
    draw();

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 -z-30 pointer-events-none" />;
};

const useActiveSection = () => {
  const [active, setActive] = useState<(typeof SECTIONS)[number]['id']>('home');

  useEffect(() => {
    const handler = () => {
      const viewportLine = window.innerHeight * 0.35;
      let chosen: (typeof SECTIONS)[number]['id'] = 'home';
      let bestDistance = Number.POSITIVE_INFINITY;

      for (const section of SECTIONS) {
        const el = document.getElementById(section.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const midpoint = rect.top + rect.height / 2;
        const distance = Math.abs(midpoint - viewportLine);
        if (distance < bestDistance) {
          bestDistance = distance;
          chosen = section.id;
        }
      }

      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 80) {
        chosen = 'contact';
      }
      setActive(chosen);
    };

    handler();
    window.addEventListener('scroll', handler, { passive: true });
    window.addEventListener('resize', handler);
    return () => {
      window.removeEventListener('scroll', handler);
      window.removeEventListener('resize', handler);
    };
  }, []);

  return active;
};

const Navbar = ({ activeId }: { activeId: string }) => (
  <motion.nav
    className="fixed top-6 left-1/2 z-50 -translate-x-1/2 px-4"
    initial={{ y: -18, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.55 }}
  >
    <div className="nav-shell">
      {SECTIONS.map((item) => (
        <a key={item.id} href={`#${item.id}`} className={`nav-link ${activeId === item.id ? 'active' : ''}`}>
          {item.label}
        </a>
      ))}
    </div>
  </motion.nav>
);

const SideRail = ({ activeId }: { activeId: string }) => {
  const { scrollYProgress } = useScroll();
  const height = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <div className="side-rail hidden lg:flex">
      <div className="rail-track">
        <motion.div className="rail-fill" style={{ height }} />
      </div>
      <div className="rail-links">
        {SECTIONS.map((s) => (
          <a key={s.id} href={`#${s.id}`} className={`rail-link ${activeId === s.id ? 'active' : ''}`}>
            <span className="rail-num">{s.number}</span>
            <span className="rail-text">{s.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

const SectionHeader = ({
  number,
  kicker,
  title,
  body,
}: {
  number: string;
  kicker: string;
  title: string;
  body: string;
}) => (
  <div className="mb-14 md:mb-18">
    <div className="chapter">
      <span className="chapter-num">{number}</span>
      <span className="chapter-kicker">{kicker}</span>
    </div>
    <h2 className="section-title">{title}</h2>
    <p className="section-body">{body}</p>
  </div>
);

const TechTicker = () => {
  const items = useMemo(() => [...STACK_ITEMS, ...STACK_ITEMS, ...STACK_ITEMS], []);
  return (
    <div className="ticker-wrap">
      <div className="ticker-track">
        {items.map((item, idx) => (
          <span className="ticker-item" key={`${item}-${idx}`}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const n = String(index + 1).padStart(2, '0');
  return (
    <motion.div
      className="project-card"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
    >
      <div className="project-top">
        <span className="project-num">{n}</span>
        <span className="project-label">Hobby Project</span>
      </div>
      <h3 className="project-title">{project.title}</h3>
      <p className="project-summary">{project.summary}</p>
      <p className="project-details">{project.details}</p>
      <div className="project-tags">
        {project.tags.map((tag) => (
          <span key={tag} className="project-tag">
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

export default function App() {
  const activeId = useActiveSection();
  const { scrollYProgress } = useScroll();
  const glowA = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const glowB = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const tintOpacity = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [0.25, 0.4, 0.3, 0.2]);

  return (
    <div className="app-root">
      <InteractiveBackground />
      <motion.div className="atmo-orb atmo-a" style={{ y: glowA, opacity: tintOpacity }} />
      <motion.div className="atmo-orb atmo-b" style={{ y: glowB }} />
      <div className="grain" />

      <div className="site-logo">
        <BrandLogo size={62} />
      </div>

      <Navbar activeId={activeId} />
      <SideRail activeId={activeId} />

      <main className="relative z-10">
        <section id="home" className="hero-section">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65 }}
              className="hero-content"
            >
              <div className="eyebrow-pill">Available for selected professional opportunities</div>

              <h1 className="hero-title">
                Hello, I&apos;m <span className="name-accent">Abdul Mubin</span>
              </h1>

              <p className="hero-value">
                Full-Stack Developer specializing in scalable web applications, performance optimization, and clean
                system architecture.
              </p>

              <TechTicker />

              <div className="hero-actions">
                <a href="#projects" className="btn-primary">
                  <span>View Work</span>
                </a>
                <a href="#contact" className="btn-secondary">
                  <span>Contact Me</span>
                </a>
                <a href={CV_URL} className="btn-secondary" download>
                  <span>Download CV</span>
                  <Download size={16} />
                </a>
              </div>

              <div className="hero-divider" />
            </motion.div>
          </div>

          <div className="scroll-cue" aria-hidden="true">
            <motion.div animate={{ y: [0, 9, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
              <ChevronRight className="rotate-90" size={18} />
            </motion.div>
          </div>
        </section>

        <section id="about" className="section-block">
          <div className="container-wide">
            <SectionHeader
              number="02"
              kicker="Profile"
              title="About"
              body="A calm, engineering-first approach shaped around product clarity, maintainability, and polished execution."
            />

            <div className="about-grid">
              <motion.div
                className="section-shell"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5 }}
              >
                <div className="body-copy">
                  <p>
                    I build modern web applications with clean structure, strong usability, and performance in mind.
                  </p>
                  <p>
                    My work focuses on practical delivery: better interfaces, maintainable systems, and polished
                    implementation that feels professional from the first interaction.
                  </p>
                </div>

                <div className="quote">
                  <span className="quote-bar" />
                  <p className="quote-text">Focused on scalable systems, product clarity, and elegant execution.</p>
                </div>

                <div className="mini-cards">
                  <div className="mini-card">
                    <GraduationCap className="mini-icon" size={24} />
                    <h4>System Design</h4>
                    <p>Clean architecture • scalable thinking</p>
                  </div>
                  <div className="mini-card">
                    <Briefcase className="mini-icon" size={24} />
                    <h4>Delivery Focus</h4>
                    <p>Clear process • polished execution</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="section-shell"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: 0.08 }}
              >
                <h3 className="deliver-title">
                  <Zap size={18} />
                  <span>What I Deliver</span>
                </h3>

                <div className="deliver-grid">
                  {DELIVERABLES.map((item, idx) => (
                    <motion.div
                      key={item.keyword}
                      className="deliver-card"
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                    >
                      <div className="deliver-icon">{item.icon}</div>
                      <div className="deliver-keyword">{item.keyword}</div>
                      <div className="deliver-label">{item.label}</div>
                    </motion.div>
                  ))}
                </div>

                <p className="stack-note">Core stack: React, Node.js, TypeScript, MongoDB, and modern web tooling.</p>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="projects" className="section-block section-projects">
          <div className="container-wide">
            <SectionHeader
              number="03"
              kicker="Personal Build"
              title="Hobby Projects"
              body="A selection of personal builds focused on usability, clear implementation, and solving practical product problems."
            />

            <div className="projects-list">
              {PROJECTS.map((project, index) => (
                <ProjectCard key={project.title} project={project} index={index} />
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section-block section-contact">
          <div className="container-narrow">
            <motion.div
              className="contact-shell"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
            >
              <SectionHeader
                number="04"
                kicker="Contact"
                title="Let’s Build Something Clean"
                body="If you want a modern web app that feels fast, polished, and easy to use - let’s talk."
              />

              <div className="contact-actions">
                {[
                  { icon: Mail, label: 'Email', href: 'mailto:contact@abdulmubin.me' },
                  { icon: Github, label: 'GitHub', href: GITHUB_URL },
                  { icon: Linkedin, label: 'LinkedIn', href: LINKEDIN_URL },
                ].map((item, idx) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                    className="contact-card"
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.32, delay: idx * 0.07 }}
                  >
                    <item.icon size={28} className="contact-icon" />
                    <span>{item.label}</span>
                  </motion.a>
                ))}
              </div>

              <div className="footer-note">© {new Date().getFullYear()} Abdul Mubin. Crafted with clean code.</div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
