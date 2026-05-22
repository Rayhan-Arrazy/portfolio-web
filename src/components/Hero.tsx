"use client";
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink, User, Code2 } from 'lucide-react';
import styles from '../app/page.module.scss';
import heroStyles from './Hero.module.scss';

export default function Hero() {
  return (
    <section className={styles.section} id="home">
      <div className={`${styles.container} ${heroStyles.hero}`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={heroStyles.content}
        >
          <div className={heroStyles.tag}>
            <Code2 size={16} />
            Full Stack Developer
          </div>
          <h1 className={heroStyles.title}>
            Hi, I'm <span className={styles.textGradient}>Rayhan Arrazy</span>
          </h1>
          <p className={heroStyles.subtitle}>
            Building seamless, scalable, and dynamic web applications with modern technologies. 
            I bridge the gap between design and robust backend architecture.
          </p>
          
          <div className={heroStyles.cta}>
            <a href="#projects" className={heroStyles.btnPrimary}>
              View My Work <ArrowRight size={18} />
            </a>
            <div className={heroStyles.socials}>
              <a href="https://github.com/Rayhan-Arrazy/" target="_blank" rel="noreferrer" className={heroStyles.btnSecondary}>
                <ExternalLink size={20} />
              </a>
              <a href="https://www.linkedin.com/in/rayhan-arrazy-80332a383/" target="_blank" rel="noreferrer" className={heroStyles.btnSecondary}>
                <User size={20} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
