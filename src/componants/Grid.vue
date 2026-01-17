<script setup>
import { ref, onMounted } from "vue";
import Letter from "./Letter.vue";

const currentRow = ref(0);
const currentCol = ref(0);

const rows = ref([
    Array.from({ length: 5 }, () => ({ value: "", status: "empty" })),
    Array.from({ length: 5 }, () => ({ value: "", status: "empty" })),
    Array.from({ length: 5 }, () => ({ value: "", status: "empty" })),
    Array.from({ length: 5 }, () => ({ value: "", status: "empty" })),
    Array.from({ length: 5 }, () => ({ value: "", status: "empty" })),
    Array.from({ length: 5 }, () => ({ value: "", status: "empty" })),
]);

onMounted(() => {
    window.addEventListener("keydown", handleKey);
});

function handleKey(e) {
    if (e.key.match(/^[a-zA-Z]$/)) {
        addLetter(e.key);
    }

    if (e.key === "Backspace") {
        deleteLetter();
    }

    if (e.key === "Enter") {
        submitWord();
    }
}

function addLetter(letter) {
    if (currentCol.value < 5) {
        rows.value[currentRow.value][currentCol.value].value = letter;
        currentCol.value++;
    }
}

function deleteLetter() {
    if (currentCol.value > 0) {
        currentCol.value--;
        rows.value[currentRow.value][currentCol.value].value = "";
    }
}

function submitWord() {
    if (currentCol.value === 5) {
        checkWord();
    }
}



function checkWord() {
    const secretWord = localStorage.getItem("wordle-word");

    if (!secretWord) {
        console.error("Aucun mot secret trouvé dans le localStorage");
        return;
    }

    const secret = secretWord.toLowerCase().split("");
    const word = rows.value[currentRow.value].map((l) => l.value.toLowerCase());

    // Lettres bien placées
    word.forEach((letter, i) => {
        if (letter === secret[i]) {
            rows.value[currentRow.value][i].status = "correct";
            secret[i] = null;
        }
    });

    // Lettres présentes mais mal placées
    word.forEach((letter, i) => {
        if (
            rows.value[currentRow.value][i].status === "empty" &&
            secret.includes(letter)
        ) {
            rows.value[currentRow.value][i].status = "present";
            secret[secret.indexOf(letter)] = null;
        }
    });

    // Lettres absentes
    rows.value[currentRow.value].forEach((cell) => {
        if (cell.status === "empty") {
            cell.status = "absent";
        }
    });

    // Passage à la ligne suivante
    currentRow.value++;
    currentCol.value = 0;
}
</script>

<template>
    <div class="flex flex-col gap-2 items-center">
        <div v-for="(row, r) in rows" :key="r" class="flex gap-2">
            <Letter
                v-for="(cell, c) in row"
                :key="c"
                :value="cell.value"
                :status="cell.status"
            />
        </div>
    </div>
</template>
