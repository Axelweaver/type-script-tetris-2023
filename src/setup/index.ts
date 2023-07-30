export const CANVAS_ID: string = 'gameCanvas';
export const GAME_FIELD_COLUMNS: number = 10;
export const GAME_FIELD_ROWS: number = 20;
export const GAME_FIELD_PADDING: number = 2;
export const INITIAL_FIGURE_ROW_INDEX: number = 0;
export const INITIAL_FIGURE_COL_INDEX: number = 3;
export const GAME_MOVE_PER_FRAMES: number = 64;

export const BORDER_COLOR: string = '#F0FFF0';
export const GAME_OVER_COLOR: string = '#CD5C5C';
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
export const GAME_FIGURE_COLORS: string[] = [
    '#87CEFA',
    '#CD5C5C',
    '#228B22',
    '#000080',
    '#98FB98',
    '#FFD700',
    '#FF69B4'
];