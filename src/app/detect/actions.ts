'use server';

export type ImageBasedAdulterationDetectionOutput = {
  isAdulterated: boolean;
  possibleAdulterants: string[];
  confidenceScore: number;
  verificationSteps: string;
  safetyRating: string;
};

export async function analyzeFoodImage(foodImage: string): Promise<ImageBasedAdulterationDetectionOutput> {
  if (!foodImage || !foodImage.startsWith('data:image')) {
    throw new Error('A valid image data URI is required.');
  }

  const apiKey = process.env.GOOGLE_GENAI_API_KEY;
  if (!apiKey) {
    throw new Error('API key is not configured. Please contact support.');
  }

  const matches = foodImage.match(/^data:(.+);base64,(.+)$/);
  if (!matches) {
    throw new Error('Invalid image format.');
  }
  const mimeType = matches[1];
  const base64Data = matches[2];

  const prompt = `You are an expert food adulteration detection AI. Analyze this food image.

IMPORTANT rules:
- Adulteration IS: deliberately adding non-food substances (brick powder in chili, artificial dyes in spices, plastic in rice)
- Adulteration IS NOT: natural ripening, bruising, wilting, or normal blemishes

Return ONLY a valid JSON object with these exact fields (no extra text):
{
  "isAdulterated": boolean,
  "possibleAdulterants": ["array of strings, empty if not adulterated"],
  "confidenceScore": number between 0 and 1,
  "verificationSteps": "string describing verification steps",
  "safetyRating": "Safe" or "Likely Safe" or "Use Caution" or "Warning" or "Unsafe" or "High Risk"
}`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [
              { text: prompt },
              { inline_data: { mime_type: mimeType, data: base64Data } }
            ]
          }],
          generationConfig: { responseMimeType: 'application/json' }
        })
      }
    );

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error?.message || 'Gemini API request failed.');
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) throw new Error('No response received from AI.');

    const result = JSON.parse(text);

    if (typeof result.isAdulterated === 'undefined') {
      throw new Error('Unexpected response format from AI.');
    }

    return result;
  } catch (error: any) {
    console.error('AI analysis error:', error);
    throw new Error(error.message || 'Failed to analyze the image. Please try again.');
  }
}
