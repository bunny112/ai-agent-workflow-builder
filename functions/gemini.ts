import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function handler(req: any): Promise<any> {
  try {
    if (req.method !== 'POST') {
      return {
        statusCode: 405,
        body: JSON.stringify({
          error: 'Only POST requests are allowed',
        }),
      };
    }

    const body = req.body;
    const prompt = body?.prompt;

    if (!prompt || typeof prompt !== 'string') {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: 'prompt is required',
        }),
      };
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: 'GEMINI_API_KEY is not configured',
        }),
      };
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
    });

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return {
      statusCode: 200,
      body: JSON.stringify({
        text,
      }),
    };
  } catch (error: any) {
    console.error('FULL GEMINI ERROR:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Gemini request failed',
        details: error?.message || String(error),
      }),
    };
  }
}