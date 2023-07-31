import { getRandomNumber, rotateMatrix } from '../helpers';
import { 
    GAME_FIGURE_MATRIX, 
    GAME_FIGURE_COLORS,
    INITIAL_FIGURE_COL_INDEX,
    INITIAL_FIGURE_ROW_INDEX
} from '../setup';

export default class GameFigure {
    private readonly _matrix: number[][];
    private readonly _color: string;
    private _rowIndex: number;
    private _columnIndex: number;
    private _width: number;
    private _height: number;

    constructor() {
        this._matrix = GAME_FIGURE_MATRIX[
            getRandomNumber(0, GAME_FIGURE_MATRIX.length - 1)
        ];
        this._color = GAME_FIGURE_COLORS[
            getRandomNumber(0, GAME_FIGURE_COLORS.length - 1)
        ];

        this._rowIndex = INITIAL_FIGURE_ROW_INDEX;
        this._columnIndex = INITIAL_FIGURE_COL_INDEX;
        this._calcSize();

    }

    private _calcSize (): void {
        const widthArray = this._matrix.map(row => 
            row.map((col, ind) => col === 1 ? ind + 1 : 0))
            .filter(frow => !!frow.length)
            .flatMap(x => x);

        this._width = Math.max(...widthArray);
        this._height = this._matrix.filter(row => 
            row.some(col => col === 1)
            ).length;

        console.log('calc size figure, width:', this._width, 'height:', this._height, this._matrix);
    }
    private _checkAndNormalize (): void {
        while(this._matrix[0].every(col => col === 0)){
            console.log('_checkAndNormalize old arr:', this._matrix);
            this._matrix = this._matrix.slice(1)
            .concat([new Array(this._matrix.length).fill(0)]);
            console.log('_checkAndNormalize new arr:', this._matrix);
        }
        while(this._matrix.every(row => row[0] === 0)){
            console.log('_checkAndNormalize old arr:', this._matrix);
            this._matrix = this._matrix.map(row =>
                row.slice(1).concat([0])
            );            
            console.log('_checkAndNormalize new arr:', this._matrix);
        }
    }

    get matrix (): number[][] {
        return this._matrix;
    }

    get color (): string {
        return this._color;
    }

    get rowIndex (): number {
        return this._rowIndex;
    }

    get columnIndex (): number {
        return this._columnIndex;
    }
    get width (): number {
        return this._width;
    }

    get height (): number {
        return this._height;
    }

    setMatrix(matrix: number[][]) {
        this._matrix = matrix;
        this._checkAndNormalize();
        this._calcSize();
    }

    moveUp(): void {
        --this._rowIndex;
    }

    moveDown(): void {
        ++this._rowIndex;
    }

    moveLeft(): void {
        --this._columnIndex;
    }

    moveRight(): void {
        ++this._columnIndex;
    }

    rotate() {
        this._matrix = rotateMatrix(this._matrix);
        this._checkAndNormalize();
        this._calcSize();
    }
}