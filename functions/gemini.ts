import { Request, Response } from 'express';

export default async function handler(req: Request, res: Response) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({
        error: 'Only POST requests are allowed',
      });
    }

    const prompt = req.body?.prompt;

    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({
        error: 'prompt is required',
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: 'GEMINI_API_KEY is not configured',
      });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error('Gemini API error:', data);

      return res.status(response.status).json({
        error: 'Gemini API error',
        details: data,
      });
    }

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

    return res.status(200).json({
      text,
    });
  } catch (error: any) {
    console.error('Function error:', error);

    return res.status(500).json({
      error: 'Function failed',
      details: error?.message || String(error),
    });
  }
}