<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import Letter from "./Letter.vue";

const props = defineProps({
    disabledLetters: {
        type: Object,
        default: () => ({}),
    },
});

const emit = defineEmits(["win", "lose", "letterStatuses"]);

const currentRow = ref(0);
const currentCol = ref(0);
const gameOver = ref(false);

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

onUnmounted(() => {
    window.removeEventListener("keydown", handleKey);
});

function isLetterDisabled(letter) {
    const upperLetter = letter.toUpperCase();
    return props.disabledLetters[upperLetter] === "absent";
}

function handleKey(e) {
    if (gameOver.value) return;

    if (e.key.match(/^[a-zA-Z]$/)) {
        if (!isLetterDisabled(e.key)) {
            addLetter(e.key);
        }
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

    // Émettre les statuts des lettres pour le clavier
    // Priorité : correct > present > absent (pour gérer les lettres en double)
    const statusPriority = { correct: 3, present: 2, absent: 1 };
    const letterStatuses = {};
    rows.value[currentRow.value].forEach((cell) => {
        const letter = cell.value.toUpperCase();
        const currentPriority = statusPriority[letterStatuses[letter]] || 0;
        const newPriority = statusPriority[cell.status] || 0;
        if (newPriority > currentPriority) {
            letterStatuses[letter] = cell.status;
        }
    });
    emit("letterStatuses", letterStatuses);

    // Vérifier victoire
    const isWin = rows.value[currentRow.value].every(
        (cell) => cell.status === "correct"
    );

    if (isWin) {
        gameOver.value = true;
        emit("win", currentRow.value + 1);
        return;
    }

    // Passage à la ligne suivante
    currentRow.value++;
    currentCol.value = 0;

    // Vérifier défaite (6 essais épuisés)
    if (currentRow.value === 6) {
        gameOver.value = true;
        emit("lose");
    }
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
