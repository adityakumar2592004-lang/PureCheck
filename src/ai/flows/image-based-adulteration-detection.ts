// Type definitions only - AI logic moved to actions.ts
export type ImageBasedAdulterationDetectionInput = {
  foodImage: string;
};

export type ImageBasedAdulterationDetectionOutput = {
  isAdulterated: boolean;
  possibleAdulterants: string[];
  confidenceScore: number;
  verificationSteps: string;
  safetyRating: string;
};

export async function imageBasedAdulterationDetection(
  input: ImageBasedAdulterationDetectionInput
): Promise<ImageBasedAdulterationDetectionOutput> {
  throw new Error('Use analyzeFoodImage from actions.ts instead.');
}
