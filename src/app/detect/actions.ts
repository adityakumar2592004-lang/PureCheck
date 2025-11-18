'use server';

import { imageBasedAdulterationDetection } from '@/ai/flows/image-based-adulteration-detection';

export async function analyzeFoodImage(foodImage: string) {
  if (!foodImage || !foodImage.startsWith('data:image')) {
    throw new Error('A valid image data URI is required.');
  }

  try {
    const result = await imageBasedAdulterationDetection({ foodImage });
    return result;
  } catch (error) {
    console.error('AI analysis failed:', error);
    // Provide a more user-friendly error message
    throw new Error('Failed to analyze the image. The AI model may be busy or unavailable. Please try again later.');
  }
}
