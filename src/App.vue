<script setup>
import { ref } from "vue";
import { getNewWord, getWord } from "./getWord.js";
import Navbar from "./componants/Navbar.vue";
import Keyboard from "./componants/Keyboard.vue";
import Grid from "./componants/Grid.vue";

const word = ref("");
const gridKey = ref(0);

getWord().then((newWord) => {
    word.value = newWord;
});

async function handleReplay() {
    word.value = await getNewWord();
    gridKey.value++;
}
</script>

<template>
    <div class="min-h-screen flex flex-col items-center justify-between py-4">
        <Navbar @replay="handleReplay" />
        <Grid :key="gridKey" />
        <Keyboard />
    </div>
</template>

<style scoped></style>
