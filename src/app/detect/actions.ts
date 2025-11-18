'use server';

import { imageBasedAdulterationDetection } from '@/ai/flows/image-based-adulteration-detection';

export async function analyzeFoodImage(foodImage: string) {
  if (!foodImage || !foodImage.startsWith('data:image')) {
    throw new Error('A valid image data URI is required.');
  }

  try {
    const result = await imageBasedAdulterationDetection({ foodImage });
    if (!result || typeof result.isAdulterated === 'undefined') {
      console.error('AI analysis returned an invalid format:', result);
      throw new Error('An unexpected response was received from the server.');
    }
    return result;
  } catch (error: any) {
    console.error('AI analysis failed:', error);
    // Provide a more user-friendly error message that is specific but not too technical
    if (error.message.includes('unexpected response')) {
         throw new Error('The AI returned data in an unexpected format. This is often a temporary issue. Please try again.');
    }
    throw new Error('Failed to analyze the image. The AI model may be busy or unavailable. Please try again later.');
  }
}
