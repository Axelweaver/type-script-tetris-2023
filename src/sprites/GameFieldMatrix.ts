import { GAME_FIELD_ROWS, GAME_FIELD_COLUMNS } from '../setup';
import { GameFieldMatrixElement } from '../types';
import { GameFigure } from './GameFigure';

export default class GameFieldMatrix {
    private _coloredMatrix: GameFieldMatrixElement[][];

    constructor(){
        this._coloredMatrix = [];

        for(let i=0; i < GAME_FIELD_ROWS; ++i){
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

    merge(figure: GameFigure) {
        figure.matrix.forEach((row, rowIndex) => {
            row.forEach((column, columnIndex) => {
                if(column === 1 && (figure.rowIndex + rowIndex ) >= 0) {
                    this._coloredMatrix[rowIndex + figure.rowIndex]
                    [columnIndex + figure.columnIndex] = {
                        color: figure.color,
                        darkColor: figure.darkColor,
                        lightColor: figure.lightColor,
                        value: 1
                    };
                }
            })
        });
    }

    isCollision(figure: GameFigure): boolean {
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