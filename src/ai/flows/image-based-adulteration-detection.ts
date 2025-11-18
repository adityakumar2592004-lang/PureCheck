'use server';
/**
 * @fileOverview This file defines a Genkit flow for image-based food adulteration detection.
 *
 * It takes an image of a food product as input and uses an AI model to analyze it for potential adulterants.
 * The flow returns a list of possible adulterants, a confidence score, and steps for physical verification.
 *
 * - imageBasedAdulterationDetection - The main function to initiate the image-based adulteration detection process.
 * - ImageBasedAdulterationDetectionInput - The input type for the imageBasedAdulterationDetection function.
 * - ImageBasedAdulterationDetectionOutput - The output type for the imageBasedAdulterationDetection function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ImageBasedAdulterationDetectionInputSchema = z.object({
  foodImage: z
    .string()
    .describe(
      "A photo of a food product, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ImageBasedAdulterationDetectionInput = z.infer<
  typeof ImageBasedAdulterationDetectionInputSchema
>;

const ImageBasedAdulterationDetectionOutputSchema = z.object({
  isAdulterated: z
    .boolean()
    .describe('A boolean indicating if the food is adulterated or not.'),
  possibleAdulterants: z
    .array(z.string())
    .describe('A list of possible adulterants detected in the food image.'),
  confidenceScore: z
    .number()
    .describe(
      'A confidence score indicating the likelihood of adulteration (0-1).'
    ),
  verificationSteps: z
    .string()
    .describe('Steps for physical verification of the detected adulterants.'),
  safetyRating: z
    .string()
    .describe('A safety assessment of the food product based on the analysis. Possible values are: "Safe", "Likely Safe", "Use Caution", "Warning", "Unsafe", "High Risk".'),
});

export type ImageBasedAdulterationDetectionOutput = z.infer<
  typeof ImageBasedAdulterationDetectionOutputSchema
>;

export async function imageBasedAdulterationDetection(
  input: ImageBasedAdulterationDetectionInput
): Promise<ImageBasedAdulterationDetectionOutput> {
  return imageBasedAdulterationDetectionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'imageBasedAdulterationDetectionPrompt',
  input: {schema: ImageBasedAdulterationDetectionInputSchema},
  output: {schema: ImageBasedAdulterationDetectionOutputSchema},
  prompt: `You are a highly specialized AI expert in food adulteration detection. Your primary task is to analyze the provided food image and determine with a high degree of certainty whether it is adulterated.

  **Crucial Instruction:** You MUST set the 'isAdulterated' boolean field. Set it to 'true' if any signs of adulteration are present, and 'false' otherwise. This field is the most important part of your response. If you detect adulterants, 'isAdulterated' MUST be true. If you do not, it MUST be false.

  Based on your analysis, also provide a 'safetyRating'. This should be one of "Safe", "Likely Safe", "Use Caution", "Warning", "Unsafe", or "High Risk".

  If adulterants are detected ('isAdulterated' is true), you must:
  1.  Identify them in the 'possibleAdulterants' array.
  2.  Provide a 'confidenceScore' (a number between 0 and 1) indicating the likelihood of adulteration.
  3.  Suggest practical 'verificationSteps' for physical confirmation of the detected adulterants.

  If no adulterants are detected ('isAdulterated' is false):
  1.  The 'possibleAdulterants' array should be empty.
  2.  The 'confidenceScore' should be low (e.g., less than 0.1).
  3.  The 'verificationSteps' should state that no verification is needed as the product appears pure.

  Food Image: {{media url=foodImage}}

  Respond with a valid JSON object matching the defined output schema.
`,
});

const imageBasedAdulterationDetectionFlow = ai.defineFlow(
  {
    name: 'imageBasedAdulterationDetectionFlow',
    inputSchema: ImageBasedAdulterationDetectionInputSchema,
    outputSchema: ImageBasedAdulterationDetectionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
