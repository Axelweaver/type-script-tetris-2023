export const CANVAS_ID: string = 'gameCanvas';
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
    ['#87CEFA', '#48D1CC', '#AFEEEE'],
    ['#B22222', '#8B0000', '#CD5C5C'],
    ['#228B22', '#2E8B57', '#98FB98'],
    ['#0000CD', '#00008B', '#4169E1'],
    ['#98FB98', '#66CDAA', '#7FFF00'],
    ['#FFD700', '#DAA520', '#FFFACD'],
    ['#FF69B4', '#CD5C5C', '#FFB6C1']
];