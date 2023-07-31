export const CANVAS_ID: string = '#gameCanvas';
export const GAME_FIELD_COLUMNS: number = 10;
export const GAME_FIELD_ROWS: number = 20;
export const GAME_FIELD_PADDING: number = 2;
export const INITIAL_FIGURE_ROW_INDEX: number = -2;
export const INITIAL_FIGURE_COL_INDEX: number = 3;
export const GAME_MOVE_PER_FRAMES: number = 94;

export const BORDER_COLOR: string = '#F0FFF0';
export const GAME_OVER_COLOR: string = '#800000';
export const SECONDARY_TEXT_COLOR: string = '#F0FFF0';

export const GAME_FIGURE_MATRIX: string[][][] = [
    [
        [1, 0, 0, 0],
        [1, 0, 0, 0],
        [1, 0, 0, 0],
        [1, 0, 0, 0]
    ],
    [
        [1, 1, 1],
        [0, 0, 1],
        [0, 0, 0]        
    ],    
    [
        [1, 1, 1],
        [1, 0, 0],
        [0, 0, 0]
    ],    
    [
        [1, 1],
        [1, 1]
    ],    
    [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0]
    ],    
    [
        [1, 1, 1],
        [0, 1, 0],
        [0, 0, 0]
    ],    
    [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0]
     ]  
];
export const GAME_FIGURE_COLORS: string[][] = [
    ['#87CEFA', '#48D1CC', '#AFEEEE'], // light blue
    ['#B22222', '#8B0000', '#CD5C5C'], // red
    ['#228B22', '#006400', '#98FB98'], // dark green
    ['#0000CD', '#00008B', '#4169E1'], // dark blue
    ['#98FB98', '#66CDAA', '#7FFF00'], // light green
    ['#FFD700', '#DAA520', '#FFFACD'], // Yellow
    ['#FF69B4', '#CD5C5C', '#FFB6C1'] // pink
];