import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey === 'your_api_key_here') {
      const msg = message.toLowerCase();
      let mockReply = "That's a great question! Rayhan is a Full Stack Developer who bridges the gap between design and robust backend architecture. For more specific details, feel free to check out the sections above!";

      if (msg.includes('stack') || msg.includes('technologies') || msg.includes('framework') || msg.includes('skills')) {
        mockReply = "Rayhan's tech stack includes React.js, Next.js, Vue 3, TypeScript, Tailwind CSS, Laravel, Spring Boot, and PostgreSQL. He uses these to build scalable full-stack applications!";
      } else if (msg.includes('experience') || msg.includes('work') || msg.includes('job')) {
        mockReply = "Rayhan has extensive experience bridging Figma mockups to pixel-perfect responsive frontends, as well as architecting robust backend ecosystems. He frequently tackles complex UI/UX integrations.";
      } else if (msg.includes('project') || msg.includes('portfolio') || msg.includes('built')) {
        mockReply = "Rayhan has built several featured projects including NeoMeet (a virtual meeting app using Laravel & Vue 3), Subsync (a subscription tracker using Spring Boot & React), and Task Flow (a Next.js 14 task manager).";
      } else if (msg.includes('contact') || msg.includes('hire') || msg.includes('email')) {
        mockReply = "You can easily get in touch with Rayhan by filling out the Contact form at the bottom of the page, or by reaching out directly on his LinkedIn profile!";
      } else if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
        mockReply = "Hello! I'm Rayhan's virtual assistant. You can ask me about his tech stack, his projects, or his experience. What would you like to know?";
      }

      // Simulate a small network delay to make it feel like a real AI processing the request
      await new Promise(resolve => setTimeout(resolve, 800));

      return NextResponse.json({ reply: mockReply });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `You are an AI assistant on Rayhan Arrazy's portfolio website. 
Rayhan is a Full Stack Developer (React, Node.js, Vue, Laravel, Spring Boot).
Keep your answers brief, friendly, and helpful. 
User says: ${message}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ reply: text });
  } catch (error) {
    console.error('AI error:', error);
    return NextResponse.json({ error: 'Failed to process AI request.' }, { status: 500 });
  }
}
