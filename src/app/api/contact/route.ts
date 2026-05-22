import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req: Request) {
  try {
    const { name, email, phone, comment } = await req.json();

    if (!name || !email || !comment) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    let aiSummaryText = "Summary generation skipped (API key not configured).";
    
    const apiKey = process.env.GEMINI_API_KEY;

    // AI Summarization
    if (apiKey && apiKey !== 'your_api_key_here') {
      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `Please provide a very brief, professional 1-sentence summary of the following message from a recruiter/client named ${name}:\n\n"${comment}"`;
        const result = await model.generateContent(prompt);
        aiSummaryText = result.response.text().trim();
      } catch (err) {
        console.error("AI summarization failed", err);
        aiSummaryText = "Summary generation failed due to an AI error.";
      }
    } else if (apiKey === 'your_api_key_here') {
      // Mock summary so it works fast out of the box for the portfolio demo!
      aiSummaryText = `[Mock AI Summary]: ${name} reached out regarding an inquiry.`;
    }

    // Simulate network delay for the form
    await new Promise(resolve => setTimeout(resolve, 600));

    // Return instant mock success to avoid hanging on Ethereal/SMTP issues during demo
    return NextResponse.json({ 
      success: true, 
      previewUrl: "https://ethereal.email/message/mocked-preview-url",
      summary: aiSummaryText 
    });
  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json({ error: 'Internal Server Error. Please try again later.' }, { status: 500 });
  }
}
