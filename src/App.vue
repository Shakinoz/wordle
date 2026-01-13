<script setup>
import { ref } from "vue";
import { getNewWord, getWord } from "./getWord.js";
import Keyboard from "./componants/Keyboard.vue";

const word = ref("");

getWord().then((newWord) => {
    word.value = newWord;
});

async function refreshWord() {
    word.value = await getNewWord();
}
</script>

<template>
    <div
        class="h-screen w-screen flex flex-col items-center justify-between p-4"
    >
        <div>nav</div>
        <div>grid</div>
        <Keyboard />
    </div>
</template>

<style scoped></style>
