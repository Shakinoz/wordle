import wordList from "./word_list.json";

export function isValidWord(word) {
  return wordList.words.includes(word.toLowerCase());
}
