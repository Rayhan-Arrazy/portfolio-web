"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ExternalLink, Maximize2, Minimize2 } from 'lucide-react';
import styles from '../app/page.module.scss';
import demoStyles from './Demos.module.scss';

interface Demo {
  id: string;
  title: string;
  emoji: string;
  description: string;
  url: string;
  repo: string;
  gradient: string;
  tags: string[];
}

export default function Demos() {
  const [activeDemo, setActiveDemo] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  const demos: Demo[] = [
    {
      id: 'habla',
      title: 'Habla AI Learning',
      emoji: '💬',
      description: 'Modern AI-powered Spanish learning app built with Next.js 15 & OpenAI. Practice flashcards, quizzes & voice recognition!',
      url: 'https://hablalearnspanish.vercel.app',
      repo: 'https://github.com/Rayhan-Arrazy/habla',
      gradient: 'linear-gradient(135deg, #00b4d8, #0077b6)',
      tags: ['Next.js 15', 'OpenAI', 'Tailwind v4', 'Speech API']
    },
    {
      id: 'valuo',
      title: 'FlyRank Capstone',
      emoji: '📊',
      description: 'AI-assisted SEO analytics dashboard built during the FlyRank Engineering Internship. Explore live metrics & insights.',
      url: 'https://flyrank-frontend-capstone-two.vercel.app',
      repo: 'https://github.com/Rayhan-Arrazy/flyrank-frontend-capstone/tree/valuo',
      gradient: 'linear-gradient(135deg, #0077b6, #03045e)',
      tags: ['Next.js', 'AI', 'SEO Analytics', 'React']
    },
    {
      id: 'receipt-go',
      title: 'Receipt Go',
      emoji: '🧾',
      description: 'AI-Powered Receipt Scanner & Expense Tracker with Google Gemini 1.5 Flash. Automatically extract & categorize receipts.',
      url: 'https://receipt-go.vercel.app',
      repo: 'https://github.com/Rayhan-Arrazy/receipt-go',
      gradient: 'linear-gradient(135deg, #90e0ef, #00b4d8)',
      tags: ['Google Gemini AI', 'Prisma 7', 'Supabase', 'Next.js 16']
    }
  ];

  const toggleDemo = (id: string) => {
    setActiveDemo(activeDemo === id ? null : id);
    setExpanded(null);
  };

  const toggleExpand = (id: string) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <section className={styles.section} id="demos" style={{ minHeight: 'auto', padding: '6rem 2rem' }}>
      <div className={styles.container}>
        <motion.h2 
          className={styles.sectionTitle}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="emoji-badge">🎮</span> Interactive Demos
        </motion.h2>
        <motion.p
          className={demoStyles.subtitle}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Click on any project below to launch a <strong>live preview</strong> right here. 
          No downloads, no setup — just click and explore! ✨
        </motion.p>
        
        <div className={demoStyles.grid}>
          {demos.map((demo, idx) => (
            <motion.div
              key={demo.id}
              className={demoStyles.demoContainer}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.5 }}
              layout
            >
              {/* Demo Card Header */}
              <div 
                className={`glass-card ${demoStyles.card} ${activeDemo === demo.id ? demoStyles.active : ''}`}
                style={{ '--demo-gradient': demo.gradient } as React.CSSProperties}
              >
                <div className={demoStyles.cardHeader}>
                  <div className={demoStyles.cardInfo}>
                    <span className={demoStyles.emoji}>{demo.emoji}</span>
                    <div>
                      <h3 className={demoStyles.cardTitle}>{demo.title}</h3>
                      <p className={demoStyles.cardDesc}>{demo.description}</p>
                    </div>
                  </div>
                  <div className={demoStyles.cardActions}>
                    <button 
                      className={`${demoStyles.playBtn} ${activeDemo === demo.id ? demoStyles.playBtnActive : ''}`}
                      onClick={() => toggleDemo(demo.id)}
                    >
                      <Play size={18} />
                      {activeDemo === demo.id ? 'Close' : 'Play Demo'}
                    </button>
                    <a href={demo.repo} target="_blank" rel="noreferrer" className={demoStyles.repoLink}>
                      <ExternalLink size={18} />
                    </a>
                  </div>
                </div>
                <div className={demoStyles.tagRow}>
                  {demo.tags.map(tag => (
                    <span key={tag} className={demoStyles.tag}>{tag}</span>
                  ))}
                </div>
              </div>

              {/* Iframe Preview */}
              <AnimatePresence>
                {activeDemo === demo.id && (
                  <motion.div
                    className={`${demoStyles.iframeWrapper} ${expanded === demo.id ? demoStyles.expanded : ''}`}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: expanded === demo.id ? '80vh' : '500px' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                  >
                    <div className={demoStyles.iframeToolbar}>
                      <div className={demoStyles.dots}>
                        <span style={{ background: '#ff5f56' }} />
                        <span style={{ background: '#ffbd2e' }} />
                        <span style={{ background: '#27c93f' }} />
                      </div>
                      <span className={demoStyles.urlBar}>{demo.url}</span>
                      <button onClick={() => toggleExpand(demo.id)} className={demoStyles.expandBtn}>
                        {expanded === demo.id ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                      </button>
                    </div>
                    <iframe
                      src={demo.url}
                      className={demoStyles.iframe}
                      title={`${demo.title} Live Demo`}
                      sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                      loading="lazy"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
