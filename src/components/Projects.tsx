"use client";
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import styles from '../app/page.module.scss';
import projectStyles from './Projects.module.scss';

export default function Projects() {
  const projects = [
    {
      title: '🚀 Flyrank Capstone',
      description: 'Frontend AI Engineering Capstone for FlyRank Internship. A Next.js-powered SEO analytics dashboard with AI-driven insights and data visualization.',
      role: 'Frontend AI Engineer',
      tags: ['Next.js', 'TypeScript', 'AI', 'SEO Analytics'],
      link: 'https://flyrank-frontend-capstone-two.vercel.app',
      color: '#00b4d8'
    },
    {
      title: '🧾 Receipt Go',
      description: 'A smart receipt scanner and expense tracker built with TypeScript. Digitize paper receipts, organize spending, and track budgets effortlessly.',
      role: 'Full Stack Developer',
      tags: ['TypeScript', 'React', 'OCR', 'Finance'],
      link: 'https://receipt-go.vercel.app',
      color: '#0077b6'
    },
    {
      title: '🍽️ Meal Me',
      description: 'A recipe discovery app built with Vue. Browse thousands of meals, search by ingredients, and save your favorites for meal planning.',
      role: 'Frontend Developer',
      tags: ['Vue', 'API Integration', 'CSS'],
      link: 'https://github.com/Rayhan-Arrazy/meal-me',
      color: '#90e0ef'
    },
    {
      title: '💬 Habla',
      description: 'A real-time chat and AI language learning app built with Next.js 15 and TypeScript. Features word of the day, smart flashcards, and AI quizzes.',
      role: 'Full Stack Developer',
      tags: ['Next.js 15', 'TypeScript', 'AI', 'Tailwind v4'],
      link: 'https://hablalearnspanish.vercel.app',
      color: '#caf0f8'
    },
    {
      title: '🎬 Nox Movie',
      description: 'Movie discovery app powered by TMDB API. Browse trending films, search movies & TV shows, get recommendations, with CodeIgniter backend and React UI.',
      role: 'Full Stack Developer',
      tags: ['PHP', 'CodeIgniter', 'React', 'TMDB API'],
      link: 'https://github.com/Rayhan-Arrazy/nox-movie',
      color: '#00b4d8'
    },
    {
      title: '🌤️ Weather App',
      description: 'A beautiful weather application built with CSS and Vue. Get real-time forecasts, humidity data, and atmospheric conditions for any location.',
      role: 'Frontend Developer',
      tags: ['CSS', 'Vue', 'Weather API', 'Mobile'],
      link: 'https://github.com/Rayhan-Arrazy/weather-app-native',
      color: '#0077b6'
    }
  ];

  return (
    <section className={styles.section} id="projects">
      <div className={styles.container}>
        <motion.h2 
          className={styles.sectionTitle}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="emoji-badge">🛠️</span> Featured Projects
        </motion.h2>
        
        <div className={projectStyles.grid}>
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              className={`glass-card ${projectStyles.card}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              style={{ '--card-accent': project.color } as React.CSSProperties}
            >
              <div className={projectStyles.cardGlow} />
              <div className={projectStyles.header}>
                <h3 className={projectStyles.cardTitle}>{project.title}</h3>
                <a href={project.link} target="_blank" rel="noreferrer" className={projectStyles.link}>
                  <ExternalLink size={20} />
                </a>
              </div>
              <div className={projectStyles.role}>{project.role}</div>
              <p className={projectStyles.cardText}>{project.description}</p>
              <div className={projectStyles.tags}>
                {project.tags.map((tag, i) => (
                  <span key={i} className={projectStyles.tag}>{tag}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
