<script setup>
import { ref, onMounted } from "vue";

const emit = defineEmits(["replay"]);

const isDark = ref(false);

function initTheme() {
    const stored = localStorage.getItem("theme");
    if (stored) {
        isDark.value = stored === "dark";
    } else {
        // https://medium.com/@jinjiexu11/using-matchmedia-with-javascript-to-add-a-dark-mode-for-your-website-bcc9b3d031a8
        isDark.value = window.matchMedia(
            "(prefers-color-scheme: dark)",
        ).matches;
    }
    applyTheme();
}

function applyTheme() {
    if (isDark.value) {
        document.documentElement.classList.add("dark");
    } else {
        document.documentElement.classList.remove("dark");
    }
}

function toggleTheme() {
    isDark.value = !isDark.value;
    localStorage.setItem("theme", isDark.value ? "dark" : "light");
    applyTheme();
}

onMounted(() => {
    initTheme();
});
</script>

<template>
    <nav class="w-full grid grid-cols-3 items-center px-6 py-4">
        <div class="justify-self-start">
            <button
                @click="toggleTheme"
                class="px-4 py-2 flex items-center gap-2 rounded-lg font-semibold text-black bg-amber-300 hover:bg-amber-400 active:bg-amber-500 dark:bg-gray-700 dark:hover:bg-gray-600 dark:active:bg-gray-500 dark:text-white transition-colors"
            >
                <img
                    v-if="isDark"
                    src="/sun.svg"
                    alt="Clair"
                    class="w-5 h-5 invert"
                />
                <img
                    v-else
                    src="/moon.svg"
                    alt="Sombre"
                    class="w-5 h-5"
                />
                <span>{{ isDark ? 'Clair' : 'Sombre' }}</span>
            </button>
        </div>
        <h1 class="justify-self-center text-3xl font-bold tracking-wide dark:text-white">WORDLE</h1>
        <div class="justify-self-end">
            <button
                @mousedown.prevent
                @click="emit('replay')"
                class="px-4 py-2 bg-amber-300 rounded-lg font-semibold text-black hover:bg-amber-400 active:bg-amber-500 dark:bg-gray-700 dark:hover:bg-gray-600 dark:active:bg-gray-500 dark:text-white transition-colors"
            >
                Rejouer
            </button>
        </div>
    </nav>
</template>
