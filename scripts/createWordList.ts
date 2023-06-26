import { promises as fs } from "fs";
import { ASCII_ALPHA } from "../src/lib/utils";

const allAlpha = (word: string): boolean =>
  word && Array.from(word).every((letter) => ASCII_ALPHA.includes(letter));

const byLength = (left: string, right: string) =>
  left.length === right.length
    ? left.localeCompare(right) // Sort alphabetically.
    : left.length - right.length; // Sort by length.

const createWordList = async (filePath: string): Promise<string[]> => {
  const content = await fs.readFile(filePath, { encoding: "utf8" });
  const words = content
    .split(" ")
    // Convert to lowercase.
    .map((word) => word.toLowerCase())
    // Filter out words with special characters.
    .filter(allAlpha);

  // Remove duplicates, sort.
  return Array.from(new Set(words)).sort(byLength);
};

const writeFile = async (filePath: string, words: string[]) => {
  await fs.writeFile(filePath, words.join("\n"), { flag: "w" });
};

(async () => {
  try {
    // Assuming this script is run using `ts-node`, the first two arguments are:
    // argv[0] -> path to the `ts-node` tool,
    // argv[1] -> path to the script.
    // Remove these two items from the list of arguments.
    const [infile, outfile] = process.argv.slice(2);
    const words = await createWordList(infile);
    await writeFile(outfile, words);
  } catch (error) {
    console.error(error);
  }
})();
