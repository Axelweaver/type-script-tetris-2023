import { GameFigure, GameFieldMatrix } from './sprites';
import { eventHandlerKeyDown, eventHandlerKeyUp } from './eventHandlers';
import { MainView } from './mainView';
import {
    CANVAS_ID,
    GAME_OVER_COLOR,
    GAME_MOVE_PER_FRAMES,
    GAME_FIELD_ROWS
} from './setup';
import { type KeyboardState } from './types';

const keysState: KeyboardState = {
    moveLeft: false,
    moveRight: false,
    moveDown: false,
    rotateFigure: false
};

// add keyboard event listeners for a keys
document.addEventListener('keydown', eventHandlerKeyDown(keysState));
document.addEventListener('keyup', eventHandlerKeyUp(keysState));
// game variables
const view = new MainView(CANVAS_ID);
const fieldMatrix = new GameFieldMatrix();
let nextFigure = new GameFigure(fieldMatrix, mergeFigure);
let figure = new GameFigure(fieldMatrix, mergeFigure);
let countFrames = 0;
// const countKeyboardFrames = 0;

const level = 1;
let score = 0;
let lines = 0;

// game loop
function gameLoop (): void {
    view.clearGameField();

    // if (++countKeyboardFrames > 10) {
    //     if (keysState.moveLeft && figure.columnIndex > 0) {
    //         figure.moveLeft();
    //         if (fieldMatrix.isCollision(figure)) {
    //             figure.moveRight();
    //         }
    //     }
    //     if (keysState.moveRight && (figure.columnIndex +
    //         figure.width) < GAME_FIELD_COLUMNS) {
    //         figure.moveRight();
    //         if (fieldMatrix.isCollision(figure)) {
    //             figure.moveLeft();
    //         }
    //     }
    //     if (keysState.moveDown &&
    //         (figure.rowIndex + figure.height) < GAME_FIELD_ROWS) {
    //         figure.moveDown();
    //         if (fieldMatrix.isCollision(figure)) {
    //             figure.moveUp();
    //             mergeFigure();
    //         }
    //     }
    //     if (keysState.rotateFigure && figure.rowIndex >= 0) {
    //         const oldMatrix = figure.matrix;
    //         figure.rotate();

    //         while (figure.columnIndex + figure.width >= GAME_FIELD_COLUMNS) {
    //             figure.moveLeft();
    //         }

    //         if ((figure.rowIndex + figure.height) >= GAME_FIELD_ROWS ||
    //             fieldMatrix.isCollision(figure)) {
    //             figure.setMatrix(oldMatrix);
    //         }
    //     }
    //     countKeyboardFrames = 0;
    // }
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
    // drawing old figures and current
    view.drawFieldMatrix(fieldMatrix);
    view.drawGameFigure(figure);
    // Check field for a full
    if (fieldMatrix.isOver()) {
        showGameOver();
        return;
    }
    requestAnimationFrame(() => { gameLoop(); });
}
// add current figure to the game field matrix
function mergeFigure (): void {
    fieldMatrix.merge(figure);
    figure = nextFigure;
    nextFigure = new GameFigure(fieldMatrix, this);
    view.cleartNextFigure();
    view.drawNextFigure(nextFigure);

    const fullRowsCount = fieldMatrix.getFullRowsCount();
    // change the score if there are filled rows
    if (fullRowsCount > 0) {
        score += level * fullRowsCount * 10;
        lines += fullRowsCount;
        fieldMatrix.removeFullRows();
        view.clearScoreInfo();
        view.drawScoreInfo(level, lines, score);
    }
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
