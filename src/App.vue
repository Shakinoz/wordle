<script setup>
import { ref } from "vue";
import { getNewWord, getWord } from "./getWord.js";

const word = ref("");

getWord().then((newWord) => {
    word.value = newWord;
});

async function refreshWord() {
    word.value = await getNewWord();
}
</script>

<template></template>

<style scoped></style>
