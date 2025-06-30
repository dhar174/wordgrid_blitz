let cachedSet: Set<string> | null = null;

export const loadWordSet = async (): Promise<Set<string>> => {
  if (cachedSet) {
    return cachedSet;
  }
  try {
    const words: string[] = (await import('../utils/words.json')).default;
    cachedSet = new Set<string>(words);
    return cachedSet;
  } catch (error) {
    console.error("Failed to load words.json:", error);
    throw new Error("Could not load word set. Please check the words.json file.");
  }
};
