<script setup lang="ts">
import { ref, computed } from 'vue';
import { useGameState } from '@/composables/useGameState';
import { usePlayerMovement } from '@/composables/usePlayerMovement';
import PropertySquare from './PropertySquare.vue';
import DiceRoller from './DiceRoller.vue';
import type { Property, GameState } from '@/types/game';
import { defaultProperties, boardPositions } from '@/utils/boardData';

const { gameState, initializeGame } = useGameState();

// Initialize with a test player if no game exists
if (!gameState.value) {
    initializeGame(['Player 1']);
}

const { movePlayer } = usePlayerMovement(gameState.value as GameState);

// Use default properties for testing
const properties = ref<Property[]>(defaultProperties);

// Adjust the slice ranges to match the actual board layout
const bottomRow = computed(() => properties.value.filter(p => boardPositions.bottom.includes(p.id)));
const leftColumn = computed(() => properties.value.filter(p => boardPositions.left.includes(p.id)));
const topRow = computed(() => properties.value.filter(p => boardPositions.top.includes(p.id)));
const rightColumn = computed(() => properties.value.filter(p => boardPositions.right.includes(p.id)));

// Calculate dimensions based on viewport and grid size
const squareSize = 'min(calc((100vh - 2rem) / 11), calc((100vw - 2rem) / 11))';

const currentPlayer = computed(() => {
    if (!gameState.value) return null;
    return gameState.value.players[gameState.value.currentPlayerIndex];
});

function handleDiceRoll(total: number, isDouble: boolean) {
    if (!currentPlayer.value || !gameState.value) return;
    movePlayer(currentPlayer.value.id, total);

    if (!isDouble) {
        gameState.value.currentPlayerIndex =
            (gameState.value.currentPlayerIndex + 1) % gameState.value.players.length;
    }
}
</script>

<template>
    <div class="relative w-screen h-screen bg-green-100 flex items-center justify-center">
        <div class="aspect-square" :style="{ width: 'calc(11 * ' + squareSize + ')', height: 'calc(11 * ' + squareSize + ')' }">
            <!-- Top row -->
            <div class="flex flex-none" :style="{ height: squareSize }">
                <PropertySquare
                    v-for="prop in topRow"
                    :key="prop.id"
                    :property="prop"
                    :is-corner="prop.id % 10 === 0"
                    class="border-r border-b last:border-r-0"
                    :style="{ width: squareSize }"
                />
            </div>

            <!-- Middle section -->
            <div class="flex" :style="{ height: 'calc(9 * ' + squareSize + ')' }">
                <!-- Left column -->
                <div class="flex-none flex flex-col" :style="{ width: squareSize }">
                    <PropertySquare
                        v-for="prop in leftColumn.slice().reverse()"
                        :key="prop.id"
                        :property="prop"
                        :is-corner="prop.id % 10 === 0"
                        class="flex-1 border-r border-b"
                    />
                </div>

                <!-- Center area -->
                <div class="flex-1 bg-white/50 backdrop-blur-sm m-4 rounded-lg
                           flex flex-col items-center justify-center">
                    <template v-if="currentPlayer">
                        <h2 class="text-2xl font-bold mb-4">
                            {{ currentPlayer.name }}'s Turn
                        </h2>
                        <DiceRoller @roll="handleDiceRoll" />
                    </template>
                </div>

                <!-- Right column -->
                <div class="flex-none flex flex-col" :style="{ width: squareSize }">
                    <PropertySquare
                        v-for="prop in rightColumn"
                        :key="prop.id"
                        :property="prop"
                        :is-corner="prop.id % 10 === 0"
                        class="flex-1 border-l border-b"
                    />
                </div>
            </div>

            <!-- Bottom row -->
            <div class="flex flex-none" :style="{ height: squareSize }">
                <PropertySquare
                    v-for="prop in bottomRow"
                    :key="prop.id"
                    :property="prop"
                    :is-corner="prop.id % 10 === 0"
                    class="border-r border-t last:border-r-0"
                    :style="{ width: squareSize }"
                />
            </div>
        </div>
    </div>
</template>
