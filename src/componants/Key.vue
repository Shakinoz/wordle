<script setup lang="ts">
const props = defineProps<{
    value: string;
    status: string;
}>();

function simulateKey(value: string) {
    if (props.status === "absent") return;

    let key = value;
    if (value === "DEL") key = "Backspace";
    if (value === "ENTER") key = "Enter";

    window.dispatchEvent(new KeyboardEvent("keydown", { key }));
}
</script>

<template>
    <button
        class="h-12 w-8 m-1 rounded-xl flex items-center justify-center font-bold text-lg transition-colors"
        @mousedown.prevent
        @click="simulateKey(value)"
        :disabled="status === 'absent'"
        :class="[
            value === 'ENTER' ? 'w-18' : '',
            value === 'DEL' ? 'w-18' : '',
            status === 'correct' ? 'bg-green-500 text-white' : '',
            status === 'present' ? 'bg-yellow-500 text-white' : '',
            status === 'absent'
                ? 'bg-gray-500 text-white opacity-50 cursor-not-allowed'
                : '',
            !status || status === ''
                ? 'bg-amber-300 hover:bg-amber-400 active:bg-amber-500 dark:bg-gray-600 dark:hover:bg-gray-500 dark:active:bg-gray-400 dark:text-white'
                : '',
        ]"
    >
        {{ value === "DEL" ? "⌫" : value === "ENTER" ? "↵" : value }}
    </button>
</template>
