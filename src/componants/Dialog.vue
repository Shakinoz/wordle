<script setup>
defineProps({
    isOpen: Boolean,
    isWin: Boolean,
    word: String,
    attempts: Number,
});

const emit = defineEmits(["replay"]);
</script>

<template>
    <Teleport to="body">
        <Transition name="fade">
            <div
                v-if="isOpen"
                class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            >
                <div
                    class="bg-white rounded-2xl p-8 max-w-sm w-full mx-4 text-center shadow-xl"
                >
                    <h2 class="text-3xl font-bold mb-4">
                        {{ isWin ? "Victoire" : "Perdu" }}
                    </h2>

                    <p v-if="isWin" class="text-gray-600 mb-6">
                        Bravo ! Vous avez trouvé le mot en
                        <span class="font-bold">{{ attempts }}</span>
                        {{ attempts > 1 ? "essais" : "essai" }}.
                    </p>

                    <p v-else class="text-gray-600 mb-6">
                        Le mot était
                        <span class="font-bold uppercase">{{ word }}</span>
                    </p>

                    <button
                        @click="emit('replay')"
                        class="bg-amber-300 hover:bg-amber-400 active:bg-amber-500 text-black font-bold py-3 px-8 rounded-xl transition-colors"
                    >
                        Rejouer
                    </button>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
