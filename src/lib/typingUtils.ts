/**
 * Calculate words per minute (WPM)
 * @param text The text that was typed
 * @param startTime Start time in milliseconds
 * @param endTime End time in milliseconds
 * @returns WPM value
 */
export function calculateWPM(
  text: string,
  startTime: number,
  endTime: number
): number {
  // Standard calculation: (characters / 5) / minutes
  const words = text.length / 5;
  const minutes = (endTime - startTime) / 60000;
  return words / minutes;
}

/**
 * Calculate typing accuracy
 * @param totalWords Total number of words
 * @param errors Number of errors
 * @returns Accuracy percentage
 */
export function calculateAccuracy(totalWords: number, errors: number): number {
  if (totalWords === 0) return 0;
  const correctWords = totalWords - errors;
  return (correctWords / totalWords) * 100;
}

/**
 * Get sample texts for typing tests
 * @param language Language of the text (english or bangla)
 * @returns Array of sample texts
 */
export async function getSampleTexts(language: "english" | "bangla"): Promise<string[]> {
  try {
    if (language === "english") {
      // Import English texts from JSON file
      const englishData = await import('../data/englishTexts.json');
      return englishData.texts.map((item) => item.text);
    } else {
      // Import Bangla texts from JSON file
      const banglaData = await import('../data/banglaTexts.json');
      return banglaData.texts.map((item) => item.text);
    }
  } catch (error) {
    console.error(`Error loading ${language} texts:`, error);
    // Fallback to empty array if JSON files can't be loaded
    return [];
  }
}

/**
 * Get a random text from the sample texts
 * @param language Language of the text (english or bangla)
 * @returns A random text
 */
export async function getRandomText(language: "english" | "bangla"): Promise<string> {
  const texts = await getSampleTexts(language);
  const randomIndex = Math.floor(Math.random() * texts.length);
  return texts[randomIndex];
}