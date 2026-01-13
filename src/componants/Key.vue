<script setup lang="ts">
defineProps<{
    value: string;
    status: string;
}>();
</script>

<template>
    <button
        class="h-12 w-8 bg-amber-300 m-1 rounded-xl flex items-center justify-center font-bold text-lg hover:bg-amber-400 active:bg-amber-500 transition-colors"
        &&
        :class="[
            status,
            value === 'ENTER' ? 'w-18' : '',
            value === 'DEL' ? 'w-18' : '',
        ]"
    >
        {{ value === "DEL" ? "⌫" : value === "ENTER" ? "↵" : value }}
    </button>
</template>
