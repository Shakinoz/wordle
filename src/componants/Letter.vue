<script setup>
    defineProps({
        value: String,
        status: String
    })
</script>

<template>
    <div class="cell" :class="status">
        {{ value }}
    </div>
</template>

<style scoped>
.cell {
    width: 50px;
    height: 50px;
    border: 2px solid #ccc;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    justify-content: center;
}

.correct { background: #6aaa64; }
.present { background: #c9b458; }
.absent { background: #787c7e; }
</style>
