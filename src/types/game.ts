interface Player {
    id: string;
    name: string;
    counter: string;
    position: number;
    money: number;
    properties: Property[];
    isJailed: boolean;
}

type PropertyType = 'property' | 'station' | 'utility' | 'special';
type PropertyColor = 'brown' | 'lightBlue' | 'pink' | 'orange' | 'red' | 'yellow' | 'green' | 'darkBlue' | null;

interface Property {
    id: number;
    name: string;
    price: number;
    rent: number[];
    ownerId: string | null;
    houses: number;
    mortgaged: boolean;
    type: PropertyType;
    color: PropertyColor;
}

interface GameState {
    players: Player[];
    currentPlayerIndex: number;
    properties: Property[];
    chanceCards: string[];
    communityChestCards: string[];
}

export type { Player, Property, GameState };
