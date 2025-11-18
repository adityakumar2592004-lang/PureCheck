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
    .describe('A boolean indicating if the food is adulterated or not. This is a mandatory field.'),
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
  prompt: `You are an expert food adulteration detection AI. Your task is to analyze the provided food image and determine if it has been deliberately adulterated with foreign substances.

  **IMPORTANT Distinction:** You MUST distinguish between natural spoilage/damage and deliberate adulteration.
  - **Adulteration IS:** The addition of non-food substances to deceive consumers (e.g., brick powder in chili, dyes in spices, plastic rice).
  - **Adulteration IS NOT:** Natural processes like ripening, over-ripening, bruising (e.g., a banana with brown spots), wilting, or minor physical blemishes. An overripe, bruised banana is NOT adulterated.

  **CRITICAL INSTRUCTION:** The 'isAdulterated' field is mandatory. You MUST set it to 'true' if you detect signs of deliberate adulteration, and 'false' otherwise.

  - If 'isAdulterated' is true (deliberate adulteration is likely):
    1.  List the detected foreign substances in 'possibleAdulterants'.
    2.  Provide a 'confidenceScore' (0-1) for the detection.
    3.  Suggest 'verificationSteps' for physical confirmation.
    4.  Assign a 'safetyRating' of "Unsafe" or "High Risk".

  - If 'isAdulterated' is false (no adulteration, only natural state):
    1.  'possibleAdulterants' MUST be an empty array.
    2.  'confidenceScore' should be very low (e.g., below 0.1).
    3.  'verificationSteps' should clearly state that no signs of artificial adulteration were found. Mention if the food appears bruised, old, or spoiled naturally.
    4.  Assign a 'safetyRating' based on its natural state (e.g., "Safe", "Use Caution" if spoiled).

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
