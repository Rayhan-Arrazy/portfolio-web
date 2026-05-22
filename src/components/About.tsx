"use client";
import { motion } from 'framer-motion';
import { Settings, CheckCircle2 } from 'lucide-react';
import styles from '../app/page.module.scss';
import aboutStyles from './About.module.scss';

export default function About() {
  return (
    <section className={styles.section} id="about">
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>
          About Me & How I Work
        </h2>
        
        <div className={aboutStyles.grid}>
          <motion.div 
            className={`glass-card ${aboutStyles.card}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className={aboutStyles.title}>Information</h3>
            <ul className={aboutStyles.list}>
              <li>
                <CheckCircle2 className="text-accent flex-shrink-0" size={24} />
                <div>
                  <strong>Stack:</strong> React.js, Next.js, Vue 3, TypeScript, Tailwind CSS, Laravel, Spring Boot, PostgreSQL, Node.js
                </div>
              </li>
              <li>
                <CheckCircle2 className="text-accent flex-shrink-0" size={24} />
                <div>
                  <strong>Experience:</strong> Building robust full-stack applications and creating pixel-perfect frontend implementations.
                </div>
              </li>
              <li>
                <CheckCircle2 className="text-accent flex-shrink-0" size={24} />
                <div>
                  <strong>Directions:</strong> Full-Stack Development, Modern UI/UX implementation, API Integration, Backend architecture.
                </div>
              </li>
            </ul>
          </motion.div>

          <motion.div 
            className={`glass-card ${aboutStyles.card}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className={aboutStyles.title}>How I Work</h3>
            <ul className={aboutStyles.list}>
              <li>
                <Settings className="text-accent flex-shrink-0" size={24} />
                <div>
                  <strong>Design to Code:</strong> I accurately bridge the gap between Figma mockups and precise, responsive implementations.
                </div>
              </li>
              <li>
                <Settings className="text-accent flex-shrink-0" size={24} />
                <div>
                  <strong>Full Stack Mindset:</strong> I architect robust ecosystems using Laravel, Spring Boot, and Next.js connected to SQL databases.
                </div>
              </li>
              <li>
                <Settings className="text-accent flex-shrink-0" size={24} />
                <div>
                  <strong>AI & Tooling:</strong> I leverage AI assistants to accelerate rapid prototyping, debugging, and feature delivery.
                </div>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
