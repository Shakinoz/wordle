<script setup>
import { ref } from "vue";
import { getNewWord, getWord } from "./getWord.js";
import Navbar from "./componants/Navbar.vue";
import Keyboard from "./componants/Keyboard.vue";
import Grid from "./componants/Grid.vue";
import Dialog from "./componants/Dialog.vue";

const word = ref("");
const gridKey = ref(0);

const dialogOpen = ref(false);
const isWin = ref(false);
const attempts = ref(0);

const letterStatuses = ref({});

const statusPriority = { correct: 3, present: 2, absent: 1, "": 0 };

getWord().then((newWord) => {
    word.value = newWord;
});

function handleLetterStatuses(newStatuses) {
    for (const [letter, status] of Object.entries(newStatuses)) {
        const currentStatus = letterStatuses.value[letter] || "";
        if (statusPriority[status] > statusPriority[currentStatus]) {
            letterStatuses.value[letter] = status;
        }
    }
}

function handleWin(numAttempts) {
    isWin.value = true;
    attempts.value = numAttempts;
    dialogOpen.value = true;
}

function handleLose() {
    isWin.value = false;
    dialogOpen.value = true;
}

function handleRestoreLetterStatuses(savedStatuses) {
    letterStatuses.value = savedStatuses;
}

async function handleReplay() {
    dialogOpen.value = false;
    localStorage.removeItem("wordle-progress");
    word.value = await getNewWord();
    letterStatuses.value = {};
    gridKey.value++;
}
</script>

<template>
    <div
        class="min-h-screen flex flex-col items-center justify-between py-4 bg-white dark:bg-gray-900 transition-colors"
    >
        <Navbar @replay="handleReplay" />
        <Grid
            :key="gridKey"
            :letterStatuses="letterStatuses"
            @win="handleWin"
            @lose="handleLose"
            @letterStatuses="handleLetterStatuses"
            @restoreLetterStatuses="handleRestoreLetterStatuses"
        />
        <Keyboard :letterStatuses="letterStatuses" />

        <Dialog
            :isOpen="dialogOpen"
            :isWin="isWin"
            :word="word"
            :attempts="attempts"
            @replay="handleReplay"
        />
    </div>
</template>

<style scoped></style>
