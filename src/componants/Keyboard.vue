<script setup lang="ts">
import Key from "./Key.vue";

const props = defineProps<{
    letterStatuses: Record<string, string>;
}>();

const keys = [
    ["A", "Z", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["Q", "S", "D", "F", "G", "H", "J", "K", "L", "M"],
    ["ENTER", "W", "X", "C", "V", "B", "N", "DEL"],
];

function getStatus(key: string): string {
    const status = props.letterStatuses[key] || "";
    return status === "absent" ? "absent" : "";
}
</script>

<template>
    <div class="keyboard">
        <div
            class="flex justify-center"
            v-for="(row, rowIndex) in keys"
            :key="rowIndex"
        >
            <Key
                v-for="key in row"
                :key="key"
                :value="key"
                :status="getStatus(key)"
            />
        </div>
    </div>
</template>
