"use client";
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import AiHelper from '@/components/AiHelper';
import styles from './page.module.scss';

export default function Home() {
  return (
    <main className={styles.main}>
      <Header />
      <Hero />
      <About />
      <Projects />
      <Contact />
      <AiHelper />
    </main>
  );
}
