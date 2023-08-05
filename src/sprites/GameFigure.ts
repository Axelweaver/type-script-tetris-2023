import { getRandomNumber, rotateMatrix } from '../helpers';
import {
    GAME_FIGURE_MATRIX,
    GAME_FIGURE_COLORS,
    INITIAL_FIGURE_COL_INDEX,
    INITIAL_FIGURE_ROW_INDEX,
    GAME_FIELD_COLUMNS,
    GAME_FIELD_ROWS
} from '../setup';
import { type GameFieldMatrix } from '../sprites';

export default class GameFigure {
    private _matrix: number[][];
    private readonly _color: string;
    private readonly _darkColor: string;
    private readonly _lightColor: string;
    private _rowIndex: number;
    private _columnIndex: number;
    private _width: number;
    private _height: number;
    private _moveLeft: boolean;
    private _moveRight: boolean;
    private _moveDown: boolean;
    private _rotate: boolean;
    private readonly _gameField: GameFieldMatrix;
    private readonly _mergeFunc: () => void;

    constructor (gameField: GameFieldMatrix, mergeFunc: () => void) {
        this._gameField = gameField;
        this._mergeFunc = mergeFunc;
        this._matrix = GAME_FIGURE_MATRIX[
            getRandomNumber(0, GAME_FIGURE_MATRIX.length - 1)
        ];

        const colors = GAME_FIGURE_COLORS[
            getRandomNumber(0, GAME_FIGURE_COLORS.length - 1)
        ];

        this._color = colors[0];
        this._darkColor = colors[1];
        this._lightColor = colors[2];
        this._height = 0;
        this._width = 0;
        this._rowIndex = INITIAL_FIGURE_ROW_INDEX;
        this._columnIndex = INITIAL_FIGURE_COL_INDEX;
        this._moveLeft = false;
        this._moveRight = false;
        this._moveDown = false;
        this._rotate = false;
        this._calcSize();
        document.addEventListener('keydown', this._eventHandlerKeydown);
        document.addEventListener('keyup', this._eventHandlerKeyup);
    }

    // calculating width and height
    private _calcSize (): void {
        const widthArray = this._matrix.map(row =>
            row.map((col, ind) => col === 1 ? ind + 1 : 0))
            .filter(frow => !(frow.length === 0))
            .flatMap(x => x);

        this._width = Math.max(...widthArray);
        this._height = this._matrix.filter(row =>
            row.some(col => col === 1)
        ).length;
    }

    // move the figure in matrix for correct size
    private _checkAndNormalize (): void {
        while (this._matrix[0].every(col => col === 0)) {
            this._matrix = this._matrix.slice(1)
                .concat([new Array(this._matrix.length).fill(0)]);
        }
        while (this._matrix.every(row => row[0] === 0)) {
            this._matrix = this._matrix.map(row =>
                row.slice(1).concat([0])
            );
        }
    }

    private readonly _eventHandlerKeydown = (e: KeyboardEvent): void => {
        if (e.keyCode === 37 || e.keyCode === 65) {
            this._moveLeft = true;
        }
        if (e.keyCode === 39 || e.keyCode === 68) {
            this._moveRight = true;
        }
        if (e.keyCode === 40 || e.keyCode === 83) {
            this._moveDown = true;
        }
        if (e.keyCode === 38 || e.keyCode === 119) {
            this._rotate = true;
        }
    };

    private readonly _eventHandlerKeyup = (e: KeyboardEvent): void => {
        if (e.keyCode === 37 || e.keyCode === 65) {
            this._moveLeft = false;
        }
        if (e.keyCode === 39 || e.keyCode === 68) {
            this._moveRight = false;
        }
        if (e.keyCode === 40 || e.keyCode === 83) {
            this._moveDown = false;
        }
        if (e.keyCode === 38 || e.keyCode === 119) {
            this._rotate = false;
        }
    };

    move (): void {
        if (this._moveLeft) {
            if (this._columnIndex > 0) {
                --this._columnIndex;
                if (this._gameField.isCollision(this)) {
                    ++this._columnIndex;
                }
            }
        }
        if (this._moveRight) {
            if ((this._columnIndex + this._width) < GAME_FIELD_COLUMNS) {
                ++this._columnIndex;
                if (this._gameField.isCollision(this)) {
                    --this._columnIndex;
                }
            }
        }
        if (this._moveDown) {
            if ((this._rowIndex + this._height) < GAME_FIELD_ROWS) {
                ++this._rowIndex;
                if (this._gameField.isCollision(this)) {
                    --this._rowIndex;
                    this._mergeFunc();
                    this._rowIndex = INITIAL_FIGURE_ROW_INDEX;
                    this._columnIndex = INITIAL_FIGURE_COL_INDEX;
                }
            }
        }
        if (this._rotate) {
            if (this._rowIndex >= 0) {
                const oldMatrix = this._matrix;
                this.rotate();

                while (this._columnIndex + this._width >= GAME_FIELD_COLUMNS) {
                    --this._columnIndex;
                }

                if ((this._rowIndex + this._height) >= GAME_FIELD_ROWS ||
                    this._gameField.isCollision(this)) {
                    this._matrix = oldMatrix;
                }
            }
        }
    }

    get matrix (): number[][] {
        return this._matrix;
    }

    get color (): string {
        return this._color;
    }

    get darkColor (): string {
        return this._darkColor;
    }

    get lightColor (): string {
        return this._lightColor;
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

    get isMovingDown (): boolean {
        return this._moveDown;
    }

    moveUp (): void {
        --this._rowIndex;
    }

    moveDown (): void {
        ++this._rowIndex;
    }

    rotate (): void {
        this._matrix = rotateMatrix(this._matrix);
        this._checkAndNormalize();
        this._calcSize();
    }
}
