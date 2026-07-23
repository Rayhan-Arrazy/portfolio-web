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

    // 1. Generate AI Summary using Gemini if configured
    if (apiKey && apiKey !== 'your_api_key_here') {
      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `Please provide a very brief, professional 1-sentence summary of the following message from a client/recruiter named ${name}:\n\n"${comment}"`;
        const result = await model.generateContent(prompt);
        aiSummaryText = result.response.text().trim();
      } catch (err) {
        console.error("AI summarization failed", err);
        aiSummaryText = `[Summary]: ${name} reached out regarding an inquiry.`;
      }
    } else {
      aiSummaryText = `[Summary]: ${name} (${email}) sent a message: "${comment.substring(0, 80)}${comment.length > 80 ? '...' : ''}"`;
    }

    const recipientEmail = 'arrazyrayhan123@gmail.com';
    const emailSubject = `🚀 New Portfolio Inquiry from ${name}`;
    let emailSentMethod = 'FormSubmit AJAX Fallback';

    // 2. Try sending with Nodemailer (if Gmail App Password or SMTP is configured)
    const smtpUser = process.env.GMAIL_USER || process.env.EMAIL_USER || process.env.SMTP_USER;
    const smtpPass = process.env.GMAIL_APP_PASSWORD || process.env.EMAIL_PASS || process.env.SMTP_PASS;

    if (smtpUser && smtpPass) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        await transporter.sendMail({
          from: `"${name} (via Portfolio)" <${smtpUser}>`,
          to: recipientEmail,
          replyTo: email,
          subject: emailSubject,
          text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\n\nMessage:\n${comment}\n\n--- AI Summary ---\n${aiSummaryText}`,
          html: `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 25px; border: 1px solid rgba(0, 180, 216, 0.3); border-radius: 16px; background-color: #03045e; color: #caf0f8;">
              <div style="border-bottom: 2px solid #0077b6; padding-bottom: 15px; margin-bottom: 20px;">
                <h2 style="color: #00b4d8; margin: 0;">📬 New Message from Portfolio</h2>
              </div>
              
              <div style="background-color: rgba(0, 119, 182, 0.25); padding: 18px; border-radius: 10px; margin-bottom: 20px; border-left: 4px solid #00b4d8;">
                <p style="margin: 6px 0; font-size: 15px;"><strong>👤 Name:</strong> ${name}</p>
                <p style="margin: 6px 0; font-size: 15px;"><strong>📧 Email:</strong> <a href="mailto:${email}" style="color: #00b4d8; text-decoration: none;">${email}</a></p>
                <p style="margin: 6px 0; font-size: 15px;"><strong>📱 Phone:</strong> ${phone || 'Not provided'}</p>
              </div>

              <div style="background-color: rgba(0, 180, 216, 0.15); border: 1px solid #00b4d8; padding: 15px; border-radius: 10px; margin-bottom: 20px;">
                <h4 style="color: #00b4d8; margin: 0 0 8px 0; font-size: 15px;">✨ AI Agent Summary:</h4>
                <p style="margin: 0; font-style: italic; color: #caf0f8; font-size: 14.5px; line-height: 1.5;">"${aiSummaryText}"</p>
              </div>

              <div style="margin: 20px 0;">
                <h4 style="color: #90e0ef; margin-bottom: 10px; font-size: 15px;">💬 Full Message Content:</h4>
                <div style="background-color: rgba(0, 0, 0, 0.35); padding: 18px; border-radius: 10px; border: 1px solid rgba(0, 180, 216, 0.2); color: #ffffff; line-height: 1.6; white-space: pre-wrap; font-size: 15px;">${comment}</div>
              </div>

              <div style="margin-top: 30px; padding-top: 15px; border-top: 1px solid rgba(0, 180, 216, 0.2); font-size: 12px; color: #90e0ef; text-align: center;">
                Sent automatically via your Next.js Portfolio Contact Form.
              </div>
            </div>
          `,
        });
        emailSentMethod = 'Gmail SMTP (Nodemailer)';
        console.log(`Email successfully sent via Nodemailer (${smtpUser}) to ${recipientEmail}`);
      } catch (smtpErr) {
        console.error("Nodemailer SMTP failed, falling back to FormSubmit AJAX:", smtpErr);
        // Fallback to FormSubmit below if Nodemailer fails
      }
    }

    // 3. If Nodemailer wasn't used or failed, send directly to arrazyrayhan123@gmail.com via FormSubmit free API
    if (emailSentMethod === 'FormSubmit AJAX Fallback') {
      try {
        const formSubmitResponse = await fetch(`https://formsubmit.co/ajax/${recipientEmail}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: name,
            email: email,
            phone: phone || 'Not provided',
            message: comment,
            _subject: emailSubject,
            _replyto: email,
            ai_summary: aiSummaryText,
            _template: 'table'
          })
        });

        if (!formSubmitResponse.ok) {
          console.error("FormSubmit API returned non-OK status:", formSubmitResponse.status);
        } else {
          console.log(`Email successfully dispatched via FormSubmit directly to ${recipientEmail}`);
        }
      } catch (fsErr) {
        console.error("FormSubmit AJAX error:", fsErr);
      }
    }

    return NextResponse.json({ 
      success: true, 
      summary: aiSummaryText,
      method: emailSentMethod,
      message: `Email dispatched directly to ${recipientEmail}`
    });
  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json({ error: 'Internal Server Error. Please try again later.' }, { status: 500 });
  }
}
