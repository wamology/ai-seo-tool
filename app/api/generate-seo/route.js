import { NextResponse } from 'next/server';

export async function POST(req) {
  const { input } = await req.json();

  const prompt = `
Give ONLY this JSON (no text, no markdown, no formatting):

{
  "title": "Example Title",
  "meta": "Example Meta",
  "keywords": "one, two, three",
  "slug": "example-title",
  "alt": "Image of product",
  "description": "This is an example product."
}
`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
        'Content-Type': 'application/json', 
      },      
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.3,
      }),
    });

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || '';

    console.log('🧠 RAW GPT REPLY:\n', content);

    // Just return raw content for now (no parsing)
    return NextResponse.json({ raw: content || 'Nothing received from GPT.' });

  } catch (error) {
    console.error('❌ API error:', error);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}
