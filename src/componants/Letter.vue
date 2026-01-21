<script setup>
defineProps({
    value: String,
    status: String,
});
</script>

<template>
    <div
        class="w-12 h-12 border-2 border-gray-300 dark:border-gray-600 uppercase flex items-center justify-center font-bold text-xl dark:text-white"
        :class="{
            'bg-green-500 border-green-500 text-white': status === 'correct',
            'bg-yellow-500 border-yellow-500 text-white': status === 'present',
            'bg-gray-500 border-gray-500 text-white': status === 'absent',
        }"
    >
        {{ value }}
    </div>
</template>
