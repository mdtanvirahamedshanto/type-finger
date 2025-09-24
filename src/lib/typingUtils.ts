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
export function getSampleTexts(language: "english" | "bangla"): string[] {
  if (language === "english") {
    return [
      "The quick brown fox jumps over the lazy dog. This pangram contains all the letters of the English alphabet. It is often used to test typewriters and computer keyboards, and to display examples of fonts.",
      "Programming is the process of creating a set of instructions that tell a computer how to perform a task. Programming can be done using a variety of computer programming languages, such as JavaScript, Python, and C++.",
      "Typing speed is typically measured in words per minute, which is abbreviated as WPM. The average typing speed is around 40 WPM, while professional typists can reach speeds of 75 WPM or higher.",
      "The Internet is a global network of billions of computers and other electronic devices. With the Internet, it's possible to access almost any information, communicate with anyone else in the world, and do much more.",
      "Artificial intelligence is the simulation of human intelligence processes by machines, especially computer systems. These processes include learning, reasoning, and self-correction."
    ];
  } else {
    return [
      "আমি বাংলায় কথা বলতে পারি। বাংলা আমার মাতৃভাষা। বাংলা ভাষা বাংলাদেশ এবং ভারতের পশ্চিমবঙ্গ রাজ্যের প্রধান ভাষা।",
      "বাংলাদেশ দক্ষিণ এশিয়ার একটি দেশ। এর উত্তরে ভারতের পশ্চিমবঙ্গ, পূর্বে আসাম, ত্রিপুরা ও মিজোরাম, দক্ষিণে বঙ্গোপসাগর এবং পশ্চিমে ভারতের বিহার ও ঝাড়খণ্ড অবস্থিত।",
      "কম্পিউটার একটি ইলেকট্রনিক যন্ত্র যা তথ্য প্রক্রিয়াকরণ করে। এটি তথ্য গ্রহণ করে, নির্দিষ্ট নিয়ম অনুসারে প্রক্রিয়াকরণ করে এবং ফলাফল প্রদান করে।",
      "ইন্টারনেট হল একটি বিশ্বব্যাপী নেটওয়ার্ক যা বিলিয়ন বিলিয়ন কম্পিউটার এবং অন্যান্য ইলেকট্রনিক ডিভাইসকে সংযুক্ত করে। ইন্টারনেটের মাধ্যমে, বিশ্বের যেকোনো তথ্য অ্যাক্সেস করা, যেকোনো ব্যক্তির সাথে যোগাযোগ করা এবং আরও অনেক কিছু করা সম্ভব।",
      "টাইপিং স্পিড সাধারণত প্রতি মিনিটে শব্দ সংখ্যায় পরিমাপ করা হয়, যা WPM হিসাবে সংক্ষিপ্ত করা হয়। গড় টাইপিং স্পিড প্রায় 40 WPM, যখন পেশাদার টাইপিস্টরা 75 WPM বা তার বেশি গতি অর্জন করতে পারেন।"
    ];
  }
}

/**
 * Get a random text from the sample texts
 * @param language Language of the text (english or bangla)
 * @returns A random text
 */
export function getRandomText(language: "english" | "bangla"): string {
  const texts = getSampleTexts(language);
  const randomIndex = Math.floor(Math.random() * texts.length);
  return texts[randomIndex];
}