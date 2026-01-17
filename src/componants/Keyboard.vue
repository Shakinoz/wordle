<script setup lang="ts">
import Key from "./Key.vue";

const keys = [
    [
        { value: "A", status: "" },
        { value: "Z", status: "" },
        { value: "E", status: "" },
        { value: "R", status: "" },
        { value: "T", status: "" },
        { value: "Y", status: "" },
        { value: "U", status: "" },
        { value: "I", status: "" },
        { value: "O", status: "" },
        { value: "P", status: "" },
    ],
    [
        { value: "Q", status: "" },
        { value: "S", status: "" },
        { value: "D", status: "" },
        { value: "F", status: "" },
        { value: "G", status: "" },
        { value: "H", status: "" },
        { value: "J", status: "" },
        { value: "K", status: "" },
        { value: "L", status: "" },
        { value: "M", status: "" },
    ],
    [
        { value: "ENTER", status: "" },
        { value: "W", status: "" },
        { value: "X", status: "" },
        { value: "C", status: "" },
        { value: "V", status: "" },
        { value: "B", status: "" },
        { value: "N", status: "" },
        { value: "DEL", status: "" },
    ],
];
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
                :key="key.value"
                :value="key.value"
                :status="key.status"
            />
        </div>
    </div>
</template>
