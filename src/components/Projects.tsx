"use client";
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import styles from '../app/page.module.scss';
import projectStyles from './Projects.module.scss';

export default function Projects() {
  const projects = [
    {
      title: 'NeoMeet',
      description: 'Built with Laravel 12 and Vue 3 via Inertia.js. NeoMeet leverages Tailwind CSS v4 and PostgreSQL/Supabase to deliver a premium, Vite-powered virtual meeting experience.',
      role: 'Full Stack Developer',
      tags: ['Laravel 12', 'Vue 3', 'Inertia.js', 'PostgreSQL'],
      link: 'https://github.com/Rayhan-Arrazy/neomeetlv'
    },
    {
      title: 'Subsync',
      description: 'App to track and manage your recurring subscriptions in one place, made with Spring Boot, React JS, and Neon PostgreSQL.',
      role: 'Full Stack Developer',
      tags: ['Spring Boot', 'React.js', 'PostgreSQL'],
      link: 'https://github.com/Rayhan-Arrazy/subsync'
    },
    {
      title: 'Task Flow',
      description: 'A robust task management application built with Next.js 14, React, and TypeScript. Features user authentication and real-time database updates.',
      role: 'Frontend Developer',
      tags: ['Next.js 14', 'TypeScript', 'React'],
      link: 'https://github.com/Rayhan-Arrazy/task-flow'
    },
    {
      title: 'IP Address Tracker',
      description: 'An interactive IP tracking app. Uses an external IP Geolocation API and mapping library to display location data dynamically based on user search.',
      role: 'Frontend Developer',
      tags: ['HTML', 'CSS', 'JavaScript', 'APIs'],
      link: 'https://github.com/Rayhan-Arrazy/fm-ip-address-tracker-master'
    },
    {
      title: 'REST Countries API',
      description: 'A frontend mentor challenge integrating with the REST Countries API. Features a color theme switcher, search, and region filtering.',
      role: 'Frontend Developer',
      tags: ['React', 'API', 'Tailwind', 'Frontend Mentor'],
      link: 'https://github.com/Rayhan-Arrazy/fm-rest-countries-api-with-color-theme-switcher-master'
    },
    {
      title: 'News Homepage',
      description: 'A responsive news homepage layout challenge from Frontend Mentor. Focuses on CSS Grid and responsive design principles.',
      role: 'Frontend Developer',
      tags: ['HTML', 'CSS Grid', 'JavaScript', 'Frontend Mentor'],
      link: 'https://github.com/Rayhan-Arrazy/fm-news-homepage-main'
    }
  ];

  return (
    <section className={styles.section} id="projects">
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>
          Featured Projects
        </h2>
        
        <div className={projectStyles.grid}>
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              className={`glass-card ${projectStyles.card}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className={projectStyles.header}>
                <h3 className={projectStyles.cardTitle}>{project.title}</h3>
                <a href={project.link} target="_blank" rel="noreferrer" className={projectStyles.link}>
                  <ExternalLink size={24} />
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
