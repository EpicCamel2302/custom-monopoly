import type { Property } from '@/types/game';

// Define property colors for different groups
export const propertyColors = {
    brown: '#8B4513',
    lightBlue: '#87CEEB',
    pink: '#FF69B4',
    orange: '#FFA500',
    red: '#FF0000',
    yellow: '#FFD700',
    green: '#008000',
    darkBlue: '#00008B',
    station: '#000000',
    utility: '#808080'
} as const;

export const boardPositions = {
    top: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],        // GO to Jail
    right: [11, 12, 13, 14, 15, 16, 17, 18, 19],    // Pink to Orange
    bottom: [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],  // Free Parking to Go To Jail
    left: [31, 32, 33, 34, 35, 36, 37, 38, 39]      // Green to Dark Blue
};

export const defaultProperties: Property[] = [
    // Top row (left to right)
    { id: 0, name: 'GO', price: 0, rent: [], ownerId: null, houses: 0, mortgaged: false, type: 'special', color: null },
    { id: 1, name: 'Old Kent Road', price: 60, rent: [2, 10, 30, 90, 160, 250], ownerId: null, houses: 0, mortgaged: false, type: 'property', color: 'brown' },
    { id: 2, name: 'Community Chest', price: 0, rent: [], ownerId: null, houses: 0, mortgaged: false, type: 'special', color: null },
    { id: 3, name: 'Whitechapel Road', price: 60, rent: [4, 20, 60, 180, 320, 450], ownerId: null, houses: 0, mortgaged: false, type: 'property', color: 'brown' },
    { id: 4, name: 'Income Tax', price: 200, rent: [], ownerId: null, houses: 0, mortgaged: false, type: 'special', color: null },
    { id: 5, name: 'Kings Cross Station', price: 200, rent: [25, 50, 100, 200], ownerId: null, houses: 0, mortgaged: false, type: 'station', color: null },
    { id: 6, name: 'The Angel Islington', price: 100, rent: [6, 30, 90, 270, 400, 550], ownerId: null, houses: 0, mortgaged: false, type: 'property', color: 'lightBlue' },
    { id: 7, name: 'Chance', price: 0, rent: [], ownerId: null, houses: 0, mortgaged: false, type: 'special', color: null },
    { id: 8, name: 'Euston Road', price: 100, rent: [6, 30, 90, 270, 400, 550], ownerId: null, houses: 0, mortgaged: false, type: 'property', color: 'lightBlue' },
    { id: 9, name: 'Pentonville Road', price: 120, rent: [8, 40, 100, 300, 450, 600], ownerId: null, houses: 0, mortgaged: false, type: 'property', color: 'lightBlue' },
    { id: 10, name: 'Jail', price: 0, rent: [], ownerId: null, houses: 0, mortgaged: false, type: 'special', color: null },

    // Right column (top to bottom)
    { id: 11, name: 'Pall Mall', price: 140, rent: [10, 50, 150, 450, 625, 750], ownerId: null, houses: 0, mortgaged: false, type: 'property', color: 'pink' },
    { id: 12, name: 'Electric Company', price: 150, rent: [4, 10], ownerId: null, houses: 0, mortgaged: false, type: 'utility', color: null },
    { id: 13, name: 'Whitehall', price: 140, rent: [10, 50, 150, 450, 625, 750], ownerId: null, houses: 0, mortgaged: false, type: 'property', color: 'pink' },
    { id: 14, name: 'Northumberland Avenue', price: 160, rent: [12, 60, 180, 500, 700, 900], ownerId: null, houses: 0, mortgaged: false, type: 'property', color: 'pink' },
    { id: 15, name: 'Marylebone Station', price: 200, rent: [25, 50, 100, 200], ownerId: null, houses: 0, mortgaged: false, type: 'station', color: null },
    { id: 16, name: 'Bow Street', price: 180, rent: [14, 70, 200, 550, 750, 950], ownerId: null, houses: 0, mortgaged: false, type: 'property', color: 'orange' },
    { id: 17, name: 'Community Chest', price: 0, rent: [], ownerId: null, houses: 0, mortgaged: false, type: 'special', color: null },
    { id: 18, name: 'Marlborough Street', price: 180, rent: [14, 70, 200, 550, 750, 950], ownerId: null, houses: 0, mortgaged: false, type: 'property', color: 'orange' },
    { id: 19, name: 'Vine Street', price: 200, rent: [16, 80, 220, 600, 800, 1000], ownerId: null, houses: 0, mortgaged: false, type: 'property', color: 'orange' },

    // Bottom row (right to left)
    { id: 20, name: 'Free Parking', price: 0, rent: [], ownerId: null, houses: 0, mortgaged: false, type: 'special', color: null },
    { id: 21, name: 'Strand', price: 220, rent: [18, 90, 250, 700, 875, 1050], ownerId: null, houses: 0, mortgaged: false, type: 'property', color: 'red' },
    { id: 22, name: 'Chance', price: 0, rent: [], ownerId: null, houses: 0, mortgaged: false, type: 'special', color: null },
    { id: 23, name: 'Fleet Street', price: 220, rent: [18, 90, 250, 700, 875, 1050], ownerId: null, houses: 0, mortgaged: false, type: 'property', color: 'red' },
    { id: 24, name: 'Trafalgar Square', price: 240, rent: [20, 100, 300, 750, 925, 1100], ownerId: null, houses: 0, mortgaged: false, type: 'property', color: 'red' },
    { id: 25, name: 'Fenchurch St Station', price: 200, rent: [25, 50, 100, 200], ownerId: null, houses: 0, mortgaged: false, type: 'station', color: null },
    { id: 26, name: 'Leicester Square', price: 260, rent: [22, 110, 330, 800, 975, 1150], ownerId: null, houses: 0, mortgaged: false, type: 'property', color: 'yellow' },
    { id: 27, name: 'Coventry Street', price: 260, rent: [22, 110, 330, 800, 975, 1150], ownerId: null, houses: 0, mortgaged: false, type: 'property', color: 'yellow' },
    { id: 28, name: 'Water Works', price: 150, rent: [4, 10], ownerId: null, houses: 0, mortgaged: false, type: 'utility', color: null },
    { id: 29, name: 'Piccadilly', price: 280, rent: [24, 120, 360, 850, 1025, 1200], ownerId: null, houses: 0, mortgaged: false, type: 'property', color: 'yellow' },
    { id: 30, name: 'Go To Jail', price: 0, rent: [], ownerId: null, houses: 0, mortgaged: false, type: 'special', color: null },

    // Left column (bottom to top)
    { id: 31, name: 'Regent Street', price: 300, rent: [26, 130, 390, 900, 1100, 1275], ownerId: null, houses: 0, mortgaged: false, type: 'property', color: 'green' },
    { id: 32, name: 'Oxford Street', price: 300, rent: [26, 130, 390, 900, 1100, 1275], ownerId: null, houses: 0, mortgaged: false, type: 'property', color: 'green' },
    { id: 33, name: 'Community Chest', price: 0, rent: [], ownerId: null, houses: 0, mortgaged: false, type: 'special', color: null },
    { id: 34, name: 'Bond Street', price: 320, rent: [28, 150, 450, 1000, 1200, 1400], ownerId: null, houses: 0, mortgaged: false, type: 'property', color: 'green' },
    { id: 35, name: 'Liverpool St Station', price: 200, rent: [25, 50, 100, 200], ownerId: null, houses: 0, mortgaged: false, type: 'station', color: null },
    { id: 36, name: 'Chance', price: 0, rent: [], ownerId: null, houses: 0, mortgaged: false, type: 'special', color: null },
    { id: 37, name: 'Park Lane', price: 350, rent: [35, 175, 500, 1100, 1300, 1500], ownerId: null, houses: 0, mortgaged: false, type: 'property', color: 'darkBlue' },
    { id: 38, name: 'Super Tax', price: 100, rent: [], ownerId: null, houses: 0, mortgaged: false, type: 'special', color: null },
    { id: 39, name: 'Mayfair', price: 400, rent: [50, 200, 600, 1400, 1700, 2000], ownerId: null, houses: 0, mortgaged: false, type: 'property', color: 'darkBlue' }
];
