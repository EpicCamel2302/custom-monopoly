import type { Property } from '@/types/game';

interface GameConfig {
    properties: Property[];
    chanceCards: string[];
    communityChestCards: string[];
    rules: string[];
}

export async function parseGameConfig(configPath: string): Promise<GameConfig> {
    const response = await fetch(configPath);
    const markdown = await response.text();

    // Basic parser - you'll want to expand this based on your markdown format
    const config: GameConfig = {
        properties: [],
        chanceCards: [],
        communityChestCards: [],
        rules: []
    };

    // Parse markdown and populate config
    // This is a placeholder - implement based on your markdown structure

    return config;
}
