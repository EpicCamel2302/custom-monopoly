import { computed } from 'vue';
import type { GameState } from '@/types/game';

export function usePlayerMovement(gameState: GameState) {
    function movePlayer(playerId: string, spaces: number) {
        const player = gameState.players.find(p => p.id === playerId);
        if (!player) return;

        const boardSize = 40; // Standard Monopoly board size
        player.position = (player.position + spaces) % boardSize;

        // If passed GO
        if (player.position < spaces) {
            player.money += 200;
        }
    }

    function teleportPlayer(playerId: string, position: number) {
        const player = gameState.players.find(p => p.id === playerId);
        if (!player) return;

        player.position = position;
    }

    return {
        movePlayer,
        teleportPlayer
    };
}
