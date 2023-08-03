import { GAME_FIELD_ROWS, GAME_FIELD_COLUMNS } from '../setup';
import { type GameFieldMatrixElement } from '../types';
import { type GameFigure } from '../sprites';

export default class GameFieldMatrix {
    private readonly _coloredMatrix: GameFieldMatrixElement[][];

    constructor () {
        this._coloredMatrix = [];
        // fill the game field matrix with empty cells
        for (let i = 0; i < GAME_FIELD_ROWS; ++i) {
            this._coloredMatrix.push(
                new Array(GAME_FIELD_COLUMNS).fill({
                    color: '',
                    darkColor: '',
                    lightColor: '',
                    value: 0
                })
            );
        }
    }

    // add current figure to the field matrix
    merge (figure: GameFigure): void {
        figure.matrix.forEach((row: number[], rowIndex: number) => {
            row.forEach((column: number, columnIndex: number) => {
                const bothRowIndex: number = figure.rowIndex + rowIndex;
                if (column === 1 && bothRowIndex >= 0) {
                    const bothColumnIndex: number = columnIndex + figure.columnIndex;
                    this._coloredMatrix[bothRowIndex][bothColumnIndex] = {
                        color: figure.color,
                        darkColor: figure.darkColor,
                        lightColor: figure.lightColor,
                        value: 1
                    };
                }
            });
        });
    }

    // looking for collision figure with field matrix
    isCollision (figure: GameFigure): boolean {
        for (let rowIndex: number = 0; rowIndex < figure.matrix.length; ++rowIndex) {
            for (let columnIndex: number = 0; columnIndex < figure.matrix[rowIndex].length; ++columnIndex) {
                if (figure.matrix[rowIndex][columnIndex] === 1 &&
                    (this._coloredMatrix[
                        rowIndex + figure.rowIndex
                    ][
                        columnIndex + figure.columnIndex
                    ].value === 1)) {
                    return true;
                }
            }
        }
        return false;
    }

    hasFullRows (): boolean {
        if (this._coloredMatrix.some((row: any) =>
            row.every((column: GameFieldMatrixElement) => column.value === 1))) {
            return true;
        };

        return false;
    }

    private _getFullRowIndexes (): number[] {
        // find indexes of full rows
        const fullRowsIndexes = this._coloredMatrix.map(
            (row: GameFieldMatrixElement[], rowIndex: number): number =>
                row.every((column: GameFieldMatrixElement) => column?.value === 1) ? rowIndex : 0
        ).filter(x => x > 0);

        return fullRowsIndexes;
    }

    getFullRowsCount (): number {
        const fullRowsIndexes = this._getFullRowIndexes();

        return fullRowsIndexes.length;
    }

    removeFullRows (): void {
        // find indexes of full rows
        const fullRowsIndexes = this._getFullRowIndexes();

        const rowsCount = fullRowsIndexes.length;
        const minIndex = Math.min(...fullRowsIndexes);

        // remove full rows from game field matrix
        this._coloredMatrix.splice(minIndex, rowsCount);

        // add empty rows to begin game field matrix
        for (let i: number = 0; i < rowsCount; ++i) {
            this._coloredMatrix.unshift(
                new Array(GAME_FIELD_COLUMNS).fill({
                    color: '',
                    darkColor: '',
                    lightColor: '',
                    value: 0
                }));
        }
    }

    // check a filled top rows in field matrix
    isOver (): boolean {
        return this._coloredMatrix[0].some(
            (column: GameFieldMatrixElement) => column.value === 1
        );
    }

    get coloredMatrix (): GameFieldMatrixElement[][] {
        return this._coloredMatrix;
    }
}
