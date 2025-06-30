let cachedSet: Set<string> | null = null;

export const loadWordSet = async (): Promise<Set<string>> => {
  if (cachedSet) {
    return cachedSet;
  }
  const words: string[] = (await import('../utils/words.json')).default;
  cachedSet = new Set<string>(words);
  return cachedSet;
};
