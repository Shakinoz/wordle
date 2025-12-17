async function getWord() {
  const word = localStorage.getItem("wordle-word");
  if (word) {
    return word;
  } else {
    return await getNewWord();
  }
}

async function getNewWord() {
  const response = await fetch("https://trouve-mot.fr/api/size/5");
  if (!response.ok) {
    throw new Error("Erreur lors de la récupération du mot.");
  }
  const data = await response.json();
  const normalizedWord = removeAccents(data[0].name.toUpperCase());
  localStorage.setItem("wordle-word", normalizedWord);
  return normalizedWord;
}

function removeAccents(str) {
  // Source : https://labex.io/fr/tutorials/removing-accents-in-javascript-strings-28581
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export { getWord, getNewWord };
