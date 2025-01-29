import { ref } from 'vue';
import type { GameState } from '@/types/game';

export function useGameState() {
    const gameState = ref<GameState | null>(null);

    function saveGame() {
        if (gameState.value) {
            localStorage.setItem('monopoly-save', JSON.stringify(gameState.value));
        }
    }

    function loadGame(): boolean {
        const savedGame = localStorage.getItem('monopoly-save');
        if (savedGame) {
            gameState.value = JSON.parse(savedGame);
            return true;
        }
        return false;
    }

    function initializeGame(players: string[]) {
        gameState.value = {
            players: players.map((name, index) => ({
                id: crypto.randomUUID(),
                name,
                counter: '',
                position: 0,
                money: 1500,
                properties: [],
                isJailed: false
            })),
            currentPlayerIndex: 0,
            properties: [], // Will be loaded from game config
            chanceCards: [],
            communityChestCards: []
        };
    }

    return {
        gameState,
        saveGame,
        loadGame,
        initializeGame
    };
}
