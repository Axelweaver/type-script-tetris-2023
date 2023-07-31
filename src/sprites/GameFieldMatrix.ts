import { GAME_FIELD_ROWS, GAME_FIELD_COLUMNS } from '../setup';
import { GameFieldMatrixElement } from '../types';
import { GameFigure } from './GameFigure';

export default class GameFieldMatrix {
    private readonly _matrix: number[][];
    private _coloredMatrix: GameFieldMatrixElement[][];

    constructor(){
        this._coloredMatrix = [];

        for(let i=0; i < GAME_FIELD_ROWS; ++i){
            this._coloredMatrix.push(
                new Array(GAME_FIELD_COLUMNS).fill({ color: '', value: 0 })
            );
        }
        this._updateSimpMatr();
    }

    private _updateSimpMatr(): void {
        this._matrix = this._coloredMatrix.map(row => 
            row.map(col => col.value)
        );
    }

    merge(figure: GameFigure) {
        figure.matrix.forEach((row, rowIndex) => {
            row.forEach((column, columnIndex) => {
                if(column === 1) {
                    this._coloredMatrix[rowIndex + figure.rowIndex][columnIndex + figure.columnIndex] = {
                        color: figure.color,
                        value: 1
                    };
                }
            })
        });
        this._updateSimpMatr();
    }

    isCollision(figure: GameFigure): boolean {
        //const [m, o] = [figure.matrix, figure.]
        for(let rowIndex = 0; rowIndex < figure.matrix.length; ++rowIndex){
            for(let columnIndex = 0; columnIndex < figure.matrix[rowIndex].length; ++columnIndex){
                if(figure.matrix[rowIndex][columnIndex] === 1 &&
                    (!!this._coloredMatrix[rowIndex + figure.rowIndex] &&
                        this._coloredMatrix[rowIndex + figure.rowIndex]
                        [columnIndex + figure.columnIndex].value === 1)) {
                            return true;
                        }
            }
        }
        return false;
    }

    isOver(): boolean {
        return this._coloredMatrix[0].some(column => column.value === 1);
    }

    get coloredMatrix(): GameFieldMatrixElement[][] {
        return this._coloredMatrix;
    }
}