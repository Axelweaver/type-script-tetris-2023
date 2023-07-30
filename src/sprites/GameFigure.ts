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
            row.filter(fcol => fcol === 1)
            .map((col, ind) => ind + 1))
            .filter(frow => !!frow.length)
            .flatMap(x => x);

        this._width = Math.max(...widthArray);
        this._height = this._matrix.filter(row => 
            row.some(col => col === 1)
            ).length;
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

    moveDown(): void {
        this._rowIndex += 1;
    }

    moveLeft(): void {
        this._columnIndex -= 1;
    }

    moveRight(): void {
        this._columnIndex += 1;
    }

    rotate() {
        this._matrix = rotateMatrix(this._matrix);
        this._calcSize();
    }
}