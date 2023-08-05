import { GameFigure, GameFieldMatrix } from './sprites';
import { MainView } from './mainView';
import {
    CANVAS_ID,
    GAME_OVER_COLOR,
    GAME_MOVE_PER_FRAMES,
    GAME_FIELD_ROWS,
    GAME_FIELD_COLUMNS
} from './setup';
import { type AnimatedMatrixElement } from './types';

// game variables
const view = new MainView(CANVAS_ID);
const fieldMatrix = new GameFieldMatrix();
let nextFigure = new GameFigure(fieldMatrix, mergeFigure);
let figure = new GameFigure(fieldMatrix, mergeFigure);
let countFrames = 0;
let countKeyboardFrames = 0;

const level = 1;
let score = 0;
let lines = 0;
let isAnimation = false;
let lastFullRowsCount = 0;
let animatedMatrix: AnimatedMatrixElement[] = [];
let animatedFramesCount = 0;

// game loop
function gameLoop (): void {
    view.clearGameField();
    // animation deleting filled rows
    if (isAnimation && ++animatedFramesCount > 10) {
        if (animatedMatrix.some(row => row.columnsCount > 0)) {
            animatedMatrix.forEach((row: AnimatedMatrixElement, rowIndex: number): void => {
                if (rowIndex === 0 ||
                    animatedMatrix[rowIndex - 1].columnsCount < GAME_FIELD_COLUMNS - 2) {
                    const columnIndex1 = GAME_FIELD_COLUMNS - Math.floor(row.columnsCount / 2);
                    const columnIndex2 = Math.floor(row.columnsCount / 2) - 1;
                    if (row.columnsCount > 0) {
                        fieldMatrix.removeRowCell(row.rowIndex, columnIndex1);
                        fieldMatrix.removeRowCell(row.rowIndex, columnIndex2);
                        row.columnsCount -= 2;
                    }
                }
            });
            // remove animated empty rows from game matrix
            animatedMatrix.filter((row: AnimatedMatrixElement): boolean =>
                row.columnsCount === 0
            ).forEach((row: AnimatedMatrixElement): void => {
                fieldMatrix.shiftEmptyRows(row.rowIndex);
            });
        } else {
            isAnimation = false;
            animatedMatrix = [];
            addScore(lastFullRowsCount);
            lastFullRowsCount = 0;
        }
        animatedFramesCount = 0;
    } else {
        if (++countKeyboardFrames > 16) {
            figure.move();
            countKeyboardFrames = 0;
        }
        // moving the figure down
        if (++countFrames > GAME_MOVE_PER_FRAMES) {
            if ((figure.rowIndex + figure.height) < GAME_FIELD_ROWS) {
                figure.moveDown();
                // If the figure rests on the old figures when moving down
                if (fieldMatrix.isCollision(figure)) {
                    figure.moveUp();
                    mergeFigure();
                }
            }
            // If the figure has reached the bottom
            if (figure.rowIndex + figure.height >= GAME_FIELD_ROWS) {
                mergeFigure();
            }
            countFrames = 0;
        }
    }
    // drawing old figures and current
    view.drawFieldMatrix(fieldMatrix);
    view.drawGameFigure(figure);
    // Check field for a full
    if (fieldMatrix.isOver() && !isAnimation) {
        showGameOver();
        return;
    }
    requestAnimationFrame(() => { gameLoop(); });
}
// add current figure to the game field matrix
function mergeFigure (): void {
    fieldMatrix.merge(figure);
    figure = nextFigure;
    nextFigure = new GameFigure(fieldMatrix, mergeFigure);
    view.cleartNextFigure();
    view.drawNextFigure(nextFigure);

    lastFullRowsCount = fieldMatrix.getFullRowsCount();
    // starting animation if having filled rows
    if (lastFullRowsCount > 0) {
        isAnimation = true;
        // create an array of rows, the removal of which we animate
        animatedMatrix = fieldMatrix.getFullRowIndexes().map(
            (row: number): AnimatedMatrixElement => {
                return {
                    rowIndex: row,
                    columnsCount: GAME_FIELD_COLUMNS
                };
            }
        );
    }
}

function addScore (rowsCount: number): void {
    score += level * rowsCount * 10;
    lines += rowsCount;
    view.clearScoreInfo();
    view.drawScoreInfo(level, lines, score);
}

function showGameOver (): void {
    view.drawInfo('GAME OVER', GAME_OVER_COLOR);
}
// show initial screen
view.drawGameField();
view.drawNextFigureField();
view.drawNextFigure(nextFigure);
view.drawScoreInfo(level, lines, score);
// start game
gameLoop();
