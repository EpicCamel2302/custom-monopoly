<script setup lang="ts">
import { ref, computed } from 'vue';

const isRolling = ref(false);
const dice1 = ref(1);
const dice2 = ref(1);
const currentAnimation = ref('');
const dice1Offset = ref({ x: 0, y: 0 });
const dice2Offset = ref({ x: 0, y: 0 });

const emit = defineEmits<{
    (e: 'roll', total: number, isDouble: boolean): void
}>();

// Define standard dice patterns using CSS grid positions
function getDiceFace(value: number) {
    const patterns = {
        1: ['center'],
        2: ['top-left', 'bottom-right'],
        3: ['top-left', 'center', 'bottom-right'],
        4: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
        5: ['top-left', 'top-right', 'center', 'bottom-left', 'bottom-right'],
        6: ['top-left', 'top-right', 'center-left', 'center-right', 'bottom-left', 'bottom-right']
    }[value];

    return patterns;
}

const dice1Dots = computed(() => getDiceFace(dice1.value));
const dice2Dots = computed(() => getDiceFace(dice2.value));

function getPositionClasses(position: string) {
    const classes = {
        'top-left': 'col-start-1 row-start-1',
        'top-right': 'col-start-3 row-start-1',
        'center-left': 'col-start-1 row-start-2',
        'center-right': 'col-start-3 row-start-2',
        'center': 'col-start-2 row-start-2',
        'bottom-left': 'col-start-1 row-start-3',
        'bottom-right': 'col-start-3 row-start-3'
    };
    return classes[position] || '';
}

function getRandomAnimation() {
    const animations = [
        'roll-bounce',
        'roll-spin',
        'roll-flip',
        'roll-shake'
    ];
    return animations[Math.floor(Math.random() * animations.length)];
}

function getRandomOffset() {
    return {
        x: (Math.random() - 0.5) * 30,
        y: (Math.random() - 0.5) * 30
    };
}

function updateDiceOffsets() {
    dice1Offset.value = getRandomOffset();
    dice2Offset.value = getRandomOffset();
}

function rollDice() {
    if (isRolling.value) return;

    isRolling.value = true;
    currentAnimation.value = getRandomAnimation();

    // Reset offsets
    dice1Offset.value = { x: 0, y: 0 };
    dice2Offset.value = { x: 0, y: 0 };

    // Animate dice rolling
    const rollInterval = setInterval(() => {
        dice1.value = Math.floor(Math.random() * 6) + 1;
        dice2.value = Math.floor(Math.random() * 6) + 1;
        updateDiceOffsets();
    }, 100);

    // Stop after 1 second
    setTimeout(() => {
        clearInterval(rollInterval);
        isRolling.value = false;
        currentAnimation.value = '';
        // Reset offsets
        dice1Offset.value = { x: 0, y: 0 };
        dice2Offset.value = { x: 0, y: 0 };

        const total = dice1.value + dice2.value;
        const isDouble = dice1.value === dice2.value;

        emit('roll', total, isDouble);
    }, 1000);
}

const dice1Style = computed(() => ({
    '--x-offset': `${dice1Offset.value.x}px`,
    '--y-offset': `${dice1Offset.value.y}px`
}));

const dice2Style = computed(() => ({
    '--x-offset': `${dice2Offset.value.x}px`,
    '--y-offset': `${dice2Offset.value.y}px`
}));
</script>

<template>
    <div class="flex flex-col items-center gap-4">
        <div class="flex gap-4">
            <!-- First Die -->
            <div
                class="die"
                :class="[{ 'is-rolling': isRolling }, currentAnimation]"
                :style="dice1Style"
            >
                <div v-for="position in dice1Dots" :key="position"
                     class="dot-container"
                     :class="getPositionClasses(position)"
                >
                    <div class="dot"></div>
                </div>
            </div>

            <!-- Second Die -->
            <div
                class="die"
                :class="[{ 'is-rolling': isRolling }, currentAnimation]"
                :style="dice2Style"
            >
                <div v-for="position in dice2Dots" :key="position"
                     class="dot-container"
                     :class="getPositionClasses(position)"
                >
                    <div class="dot"></div>
                </div>
            </div>
        </div>
        <button
            @click="rollDice"
            :disabled="isRolling"
            class="px-4 py-2 bg-blue-500 text-white rounded-lg
                   hover:bg-blue-600 disabled:bg-gray-400"
        >
            Roll Dice
        </button>
    </div>
</template>

<style scoped>
.die {
    width: 4rem;
    height: 4rem;
    background-color: white;
    border-radius: 0.75rem;
    border: 2px solid #e5e7eb;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    padding: 0.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transform-style: preserve-3d;
    --x-offset: 0px;
    --y-offset: 0px;
}

.is-rolling {
    transition: none;
}

.dot-container {
    display: flex;
    align-items: center;
    justify-content: center;
}

.dot {
    width: 0.5rem;
    height: 0.5rem;
    background-color: black;
    border-radius: 50%;
}

/* Roll Animations */
@keyframes bounce {
    0%, 100% { transform: translate(var(--x-offset), calc(var(--y-offset) + 0px)); }
    50% { transform: translate(var(--x-offset), calc(var(--y-offset) - 1rem)); }
}

@keyframes spin {
    0% { transform: translate(var(--x-offset), var(--y-offset)) rotate(0deg); }
    100% { transform: translate(var(--x-offset), var(--y-offset)) rotate(360deg); }
}

@keyframes flip {
    0% { transform: translate(var(--x-offset), var(--y-offset)) perspective(400px) rotateX(0); }
    100% { transform: translate(var(--x-offset), var(--y-offset)) perspective(400px) rotateX(360deg); }
}

@keyframes shake {
    0%, 100% { transform: translate(var(--x-offset), var(--y-offset)) rotate(0deg); }
    25% { transform: translate(calc(var(--x-offset) - 0.5rem), var(--y-offset)) rotate(-10deg); }
    75% { transform: translate(calc(var(--x-offset) + 0.5rem), var(--y-offset)) rotate(10deg); }
}

.roll-bounce {
    animation: bounce 0.5s cubic-bezier(0.36, 0, 0.66, -0.56) infinite;
}

.roll-spin {
    animation: spin 0.5s linear infinite;
}

.roll-flip {
    animation: flip 0.6s ease-in-out infinite;
}

.roll-shake {
    animation: shake 0.3s ease-in-out infinite;
}
</style>
