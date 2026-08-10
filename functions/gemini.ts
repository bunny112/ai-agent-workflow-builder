import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function handler(req: any, res: any) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({
        error: 'Only POST requests are allowed'
      });
    }

    const prompt = req.body?.prompt;

    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({
        error: 'prompt is required'
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: 'GEMINI_API_KEY is not configured'
      });
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({
      model: 'gemini-3.5-flash'
    });

    const result = await model.generateContent(prompt);

    const text = result.response.text();

    return res.status(200).json({
      text
    });

  } catch (error: any) {
    console.error('Gemini error:', error);

    return res.status(500).json({
      error: 'Gemini request failed',
      details: error?.message || String(error)
    });
  }
}
