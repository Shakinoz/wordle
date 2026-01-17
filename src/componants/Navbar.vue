<script setup>
const emit = defineEmits(["replay"]);
</script>

<template>
    <nav class="w-full flex items-center justify-between px-6 py-4">
        <div class="w-24"></div>
        <h1 class="text-3xl font-bold tracking-wide">WORDLE</h1>
        <button
            @mousedown.prevent
            @click="emit('replay')"
            class="w-24 px-4 py-2 bg-amber-300 rounded-lg font-semibold hover:bg-amber-400 active:bg-amber-500 transition-colors"
        >
            Rejouer
        </button>
    </nav>
</template>
