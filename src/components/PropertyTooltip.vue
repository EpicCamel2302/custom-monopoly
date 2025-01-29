<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue';
import type { Property } from '@/types/game';

interface Props {
    property: Property;
}

const props = defineProps<Props>();
const tooltipRef = ref<HTMLElement | null>(null);

// Position state
const position = ref({
    top: true,
    left: '50%'
});

// Update tooltip position based on viewport boundaries
function updatePosition() {
    if (!tooltipRef.value) return;

    const tooltip = tooltipRef.value;
    const rect = tooltip.getBoundingClientRect();
    const parentRect = tooltip.parentElement?.getBoundingClientRect();

    if (!parentRect) return;

    // Check vertical position
    const spaceAbove = parentRect.top;
    const spaceBelow = window.innerHeight - parentRect.bottom;
    position.value.top = spaceAbove > rect.height || spaceAbove > spaceBelow;

    // Check horizontal position
    const leftOverflow = rect.left < 0;
    const rightOverflow = rect.right > window.innerWidth;

    if (leftOverflow) {
        position.value.left = '0';
    } else if (rightOverflow) {
        position.value.left = '100%';
        tooltip.style.transform = 'translateX(-100%)';
    } else {
        position.value.left = '50%';
        tooltip.style.transform = 'translateX(-50%)';
    }
}

onMounted(() => {
    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);
});

onUnmounted(() => {
    window.removeEventListener('resize', updatePosition);
    window.removeEventListener('scroll', updatePosition);
});

const tooltipClasses = computed(() => ({
    'absolute z-50 bg-white shadow-lg rounded-lg p-4 w-64 border border-gray-200 text-sm': true,
    'bottom-full mb-3': position.value.top,
    'top-full mt-3': !position.value.top
}));

const arrowClasses = computed(() => ({
    'absolute w-0 h-0': true,
    'border-8 border-transparent': true,
    'border-t-white -bottom-4 after:border-t-gray-200': position.value.top,
    'border-b-white -top-4 after:border-b-gray-200': !position.value.top,
    'after:content-[""] after:absolute after:w-0 after:h-0 after:border-8 after:border-transparent after:-top-[9px] after:left-[-8px]': true
}));

const arrowStyle = computed(() => {
    if (position.value.left === '0') {
        return {
            left: `${tooltipRef.value?.parentElement?.offsetWidth ? tooltipRef.value.parentElement.offsetWidth / 2 : 50}px`,
            transform: 'none'
        };
    }
    if (position.value.left === '100%') {
        return {
            right: `${tooltipRef.value?.parentElement?.offsetWidth ? tooltipRef.value.parentElement.offsetWidth / 2 : 50}px`,
            left: 'auto',
            transform: 'none'
        };
    }
    return {
        left: '50%',
        transform: 'translateX(-50%)'
    };
});

const rentDisplay = computed(() => {
    if (props.property.type === 'property') {
        return [
            { label: 'Rent', value: props.property.rent[0], prefix: '£' },
            { label: 'With 1 House', value: props.property.rent[1], prefix: '£' },
            { label: 'With 2 Houses', value: props.property.rent[2], prefix: '£' },
            { label: 'With 3 Houses', value: props.property.rent[3], prefix: '£' },
            { label: 'With 4 Houses', value: props.property.rent[4], prefix: '£' },
            { label: 'With Hotel', value: props.property.rent[5], prefix: '£' }
        ];
    } else if (props.property.type === 'station') {
        return [
            { label: 'Rent', value: props.property.rent[0], prefix: '£' },
            { label: 'With 2 Stations', value: props.property.rent[1], prefix: '£' },
            { label: 'With 3 Stations', value: props.property.rent[2], prefix: '£' },
            { label: 'With 4 Stations', value: props.property.rent[3], prefix: '£' }
        ];
    } else if (props.property.type === 'utility') {
        return [
            { label: '1 Utility', value: props.property.rent[0], suffix: '× dice' },
            { label: '2 Utilities', value: props.property.rent[1], suffix: '× dice' }
        ];
    }
    return [];
});

const specialSquareContent = computed(() => {
    switch (props.property.name) {
        case 'GO':
            return {
                mechanics: 'Collect £200 salary as you pass GO',
                flavor: 'The starting point of every great fortune... or bankruptcy.',
                icon: '💰'
            };
        case 'Jail':
            return {
                mechanics: 'Just visiting... for now. End up here by rolling doubles three times, landing on "Go to Jail", or drawing the wrong card.',
                flavor: 'At least the rent is free!',
                icon: '🔒'
            };
        case 'Free Parking':
            return {
                mechanics: 'Take a break! Nothing happens here in the official rules.',
                flavor: 'The only free real estate in London.',
                icon: '🅿️'
            };
        case 'Go To Jail':
            return {
                mechanics: 'Go directly to Jail. Do not pass GO. Do not collect £200.',
                flavor: 'Your monopolistic practices have finally caught up with you!',
                icon: '👮'
            };
        case 'Chance':
            return {
                mechanics: 'Draw a Chance card and follow its instructions. Could be good, could be bad - that\'s the chance you take!',
                flavor: 'Life is like a deck of Chance cards, you never know what you\'re gonna get.',
                icon: '❓'
            };
        case 'Community Chest':
            return {
                mechanics: 'Draw a Community Chest card. These usually involve receiving or paying money, or getting out of Jail free.',
                flavor: 'The community gives, and the community takes away...',
                icon: '📦'
            };
        case 'Income Tax':
            return {
                mechanics: 'Pay £200 to the bank. No deductions allowed!',
                flavor: 'The taxman always finds you, even in Monopoly.',
                icon: '💰'
            };
        case 'Super Tax':
            return {
                mechanics: 'Pay £100 to the bank. Consider it a luxury tax for being so successful.',
                flavor: 'Mo\' money, mo\' problems... and mo\' taxes.',
                icon: '💸'
            };
        default:
            return null;
    }
});
</script>

<template>
    <div
        ref="tooltipRef"
        :class="tooltipClasses"
        :style="{ left: position.left }"
    >
        <!-- Header -->
        <div class="flex justify-between items-center mb-2">
            <h3 class="font-bold">{{ property.name }}</h3>
            <span v-if="property.price" class="font-bold text-green-600">£{{ property.price }}</span>
        </div>

        <!-- Special Square Content -->
        <template v-if="specialSquareContent">
            <div class="flex items-center gap-2 mb-3">
                <span class="text-2xl">{{ specialSquareContent.icon }}</span>
                <span class="font-medium text-gray-800">{{ property.name }}</span>
            </div>
            <div class="space-y-3">
                <div class="text-sm text-gray-600">
                    <div class="font-medium text-gray-700 mb-1">Rules:</div>
                    {{ specialSquareContent.mechanics }}
                </div>
                <div class="text-sm italic text-gray-500 border-t border-gray-100 pt-2">
                    "{{ specialSquareContent.flavor }}"
                </div>
            </div>
        </template>

        <!-- Regular Property Content -->
        <template v-else>
            <!-- Status -->
            <div v-if="property.type !== 'special'" class="mb-2 space-y-1">
                <div class="flex justify-between text-gray-600">
                    <span>Status:</span>
                    <span class="font-medium">
                        {{ property.mortgaged ? 'Mortgaged' : (property.ownerId ? 'Owned' : 'Available') }}
                    </span>
                </div>
                <div v-if="property.type === 'property'" class="flex justify-between text-gray-600">
                    <span>Houses:</span>
                    <span class="font-medium">{{ property.houses }}</span>
                </div>
            </div>

            <!-- Rent Information -->
            <div v-if="rentDisplay.length > 0" class="border-t border-gray-200 mt-2 pt-2">
                <div class="font-medium mb-1">Rent Prices:</div>
                <div class="space-y-1">
                    <div v-for="(rent, index) in rentDisplay"
                         :key="index"
                         class="flex justify-between text-gray-600 text-xs">
                        <span>{{ rent.label }}:</span>
                        <span class="font-medium">
                            {{ rent.prefix || '' }}{{ rent.value }}{{ rent.suffix || '' }}
                        </span>
                    </div>
                </div>
            </div>

            <!-- Mortgage Info -->
            <div v-if="property.type !== 'special'" class="border-t border-gray-200 mt-2 pt-2 text-xs text-gray-600">
                <div class="flex justify-between">
                    <span>Mortgage Value:</span>
                    <span class="font-medium">£{{ Math.floor(property.price / 2) }}</span>
                </div>
            </div>
        </template>

        <!-- Triangle pointer -->
        <div
            :class="arrowClasses"
            :style="arrowStyle"
        ></div>
    </div>
</template>

<style scoped>
.after\:border-t-gray-200::after {
    border-top-color: #e5e7eb;
}

.after\:border-b-gray-200::after {
    border-bottom-color: #e5e7eb;
}
</style>
