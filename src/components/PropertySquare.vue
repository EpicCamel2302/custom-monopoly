<script setup lang="ts">
import { computed, ref } from 'vue';
import type { Property } from '@/types/game';
import PropertyTooltip from './PropertyTooltip.vue';

interface Props {
    property: Property;
    isCorner?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    isCorner: false
});

const showTooltip = ref(false);

const squareClasses = computed(() => ({
    'bg-white p-2 relative flex flex-col justify-between items-center hover:bg-gray-50 cursor-pointer': true,
    'aspect-square': true
}));

const colorBarClasses = computed(() => {
    if (!props.property.color) return '';
    return {
        'w-full h-8 mb-1': true,
        'bg-[#8B4513]': props.property.color === 'brown',
        'bg-[#87CEEB]': props.property.color === 'lightBlue',
        'bg-[#FF69B4]': props.property.color === 'pink',
        'bg-[#FFA500]': props.property.color === 'orange',
        'bg-[#FF0000]': props.property.color === 'red',
        'bg-[#FFD700]': props.property.color === 'yellow',
        'bg-[#008000]': props.property.color === 'green',
        'bg-[#00008B]': props.property.color === 'darkBlue',
    };
});

const specialIcon = computed(() => {
    switch (props.property.name) {
        case 'GO':
            return {
                icon: `<svg viewBox="0 0 24 24" class="w-8 h-8 fill-red-600">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                    <path d="M12 17l5-5-5-5v3H7v4h5z"/>
                </svg>`,
                class: 'flex items-center justify-center'
            };
        case 'Jail':
            return { icon: '🔒', class: 'text-4xl text-gray-700' };
        case 'Free Parking':
            return { icon: '🅿️', class: 'text-4xl text-blue-600' };
        case 'Go To Jail':
            return { icon: '👮', class: 'text-4xl' };
        case 'Chance':
            return { icon: '❓', class: 'text-3xl text-orange-500' };
        case 'Community Chest':
            return { icon: '📦', class: 'text-3xl text-yellow-600' };
        case 'Income Tax':
            return { icon: '💰', class: 'text-3xl text-green-600' };
        case 'Super Tax':
            return { icon: '💸', class: 'text-3xl text-green-700' };
        case 'Electric Company':
            return { icon: '⚡', class: 'text-3xl text-yellow-400' };
        case 'Water Works':
            return { icon: '💧', class: 'text-3xl text-blue-400' };
        default:
            return null;
    }
});
</script>

<template>
    <div
        :class="squareClasses"
        @mouseenter="showTooltip = true"
        @mouseleave="showTooltip = false"
    >
        <!-- Color bar for properties -->
        <div v-if="property.color" :class="colorBarClasses"></div>

        <!-- Special square icons -->
        <template v-if="property.type === 'station'">
            <div class="text-2xl mb-1">🚂</div>
        </template>
        <template v-else-if="specialIcon">
            <div :class="specialIcon.class" v-if="property.name === 'GO'" v-html="specialIcon.icon"></div>
            <div :class="specialIcon.class" v-else>{{ specialIcon.icon }}</div>
        </template>

        <!-- Property name -->
        <div class="text-xs font-bold text-center leading-tight">{{ property.name }}</div>

        <!-- Price -->
        <div v-if="property.price" class="text-xs mt-1 text-center">£{{ property.price }}</div>

        <!-- Owner indicator -->
        <div
            v-if="property.ownerId"
            class="absolute bottom-0 left-0 right-0 h-4"
            :style="{ backgroundColor: property.ownerId }"
        />

        <!-- Tooltip -->
        <PropertyTooltip
            v-if="showTooltip"
            :property="property"
            class="transition duration-200 ease-out"
            :class="{
                'opacity-0 scale-95': !showTooltip,
                'opacity-100 scale-100': showTooltip
            }"
        />
    </div>
</template>
