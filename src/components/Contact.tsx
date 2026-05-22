"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2, Sparkles, CheckCircle2 } from 'lucide-react';
import styles from '../app/page.module.scss';
import contactStyles from './Contact.module.scss';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', comment: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [aiSummary, setAiSummary] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setAiSummary(data.summary || 'Message sent! (AI Summary unavailable due to missing API key)');
        setFormData({ name: '', phone: '', email: '', comment: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <section className={styles.section} id="contact">
      <div className={styles.container}>
        <motion.div 
          className={contactStyles.wrapper}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className={contactStyles.header}>
            <h2 className={styles.sectionTitle} style={{ marginBottom: '1rem' }}>Get In Touch</h2>
            <p className={contactStyles.subtitle}>
              Send a message to test the API flow. An <strong style={{color: '#c4b5fd'}}>AI agent</strong> will automatically read and summarize your comment.
            </p>
          </div>

          <div className={`glass-card ${contactStyles.formCard}`}>
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={contactStyles.success}
                >
                  <CheckCircle2 size={64} className="text-accent" style={{ marginBottom: '1.5rem' }} />
                  <h3>Message Sent Successfully!</h3>
                  <p>Check your terminal for the Ethereal Email preview link.</p>
                  
                  <div className={contactStyles.aiBox}>
                    <h4><Sparkles size={16} /> AI Summary</h4>
                    <p>"{aiSummary}"</p>
                  </div>
                  
                  <button onClick={() => setStatus('idle')} className={contactStyles.btnPrimary}>
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className={contactStyles.form}
                >
                  <div className={contactStyles.row}>
                    <div className={contactStyles.inputGroup}>
                      <label>NAME *</label>
                      <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} disabled={status === 'loading'} />
                    </div>
                    <div className={contactStyles.inputGroup}>
                      <label>PHONE</label>
                      <input type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} disabled={status === 'loading'} />
                    </div>
                  </div>
                  <div className={contactStyles.inputGroup}>
                    <label>EMAIL *</label>
                    <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} disabled={status === 'loading'} />
                  </div>
                  <div className={contactStyles.inputGroup}>
                    <label>COMMENT *</label>
                    <textarea required value={formData.comment} onChange={e => setFormData({...formData, comment: e.target.value})} disabled={status === 'loading'} />
                  </div>
                  <button type="submit" className={contactStyles.btnPrimary} disabled={status === 'loading'}>
                    {status === 'loading' ? <Loader2 className="animate-spin" size={20} /> : <><Send size={18} /> Send Message & Summarize</>}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
