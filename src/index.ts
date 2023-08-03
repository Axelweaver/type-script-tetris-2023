import { GameFigure, GameFieldMatrix } from './sprites';
import { eventHandlerKeyDown, eventHandlerKeyUp } from './eventHandlers';
import { MainView } from './mainView';
import {
    CANVAS_ID,
    GAME_OVER_COLOR,
    GAME_MOVE_PER_FRAMES,
    GAME_FIELD_ROWS,
    GAME_FIELD_COLUMNS
} from './setup';
import { type KeyboardState } from './types';

const keysState: KeyboardState = {
    moveLeft: false,
    moveRight: false,
    moveDown: false,
    rotateFigure: false
};

document.addEventListener(
    'keydown',
    eventHandlerKeyDown(keysState)
);
document.addEventListener(
    'keyup',
    eventHandlerKeyUp(keysState)
);

const view = new MainView(CANVAS_ID);

let nextFigure = new GameFigure();
let figure = new GameFigure();
let countFrames = 0;
let countKeyboardFrames = 0;
const fieldMatrix = new GameFieldMatrix();
const level = 1;
let score = 0;
let lines = 0;
// game loop
function gameLoop (): void {
    view.clearGameField();

    if (++countKeyboardFrames > 10) {
        if (keysState.moveLeft && figure.columnIndex > 0) {
            figure.moveLeft();
            if (fieldMatrix.isCollision(figure)) {
                figure.moveRight();
            }
        }
        if (keysState.moveRight && (figure.columnIndex +
            figure.width) < GAME_FIELD_COLUMNS) {
            figure.moveRight();
            if (fieldMatrix.isCollision(figure)) {
                figure.moveLeft();
            }
        }
        if (keysState.moveDown &&
            (figure.rowIndex + figure.height) < GAME_FIELD_ROWS) {
            figure.moveDown();
            if (fieldMatrix.isCollision(figure)) {
                figure.moveUp();
                mergeFigure();
            }
        }
        if (keysState.rotateFigure && figure.rowIndex >= 0) {
            const oldMatrix = figure.matrix;
            figure.rotate();

            while (figure.columnIndex + figure.width >= GAME_FIELD_COLUMNS) {
                figure.moveLeft();
            }

            if ((figure.rowIndex + figure.height) >= GAME_FIELD_ROWS ||
                fieldMatrix.isCollision(figure)) {
                figure.setMatrix(oldMatrix);
            }
        }
        countKeyboardFrames = 0;
    }

    if (++countFrames > GAME_MOVE_PER_FRAMES) {
        if ((figure.rowIndex + figure.height) < GAME_FIELD_ROWS) {
            figure.moveDown();
            if (fieldMatrix.isCollision(figure)) {
                figure.moveUp();
                mergeFigure();
            }
        }

        if (figure.rowIndex + figure.height >= GAME_FIELD_ROWS) {
            mergeFigure();
        }
        countFrames = 0;
    }

    view.drawFieldMatrix(fieldMatrix);
    view.drawGameFigure(figure);

    if (fieldMatrix.isOver()) {
        showGameOver();
        return;
    }

    requestAnimationFrame(() => { gameLoop(); });
}

function mergeFigure (): void {
    fieldMatrix.merge(figure);
    figure = nextFigure;
    nextFigure = new GameFigure();
    view.cleartNextFigure();
    view.drawNextFigure(nextFigure);

    const fullRowsCount = fieldMatrix.getFullRowsCount();

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

view.drawGameField();
view.drawNextFigureField();

// view.drawInfo('GAME OVER', GAME_OVER_COLOR);
// view.drawSecondaryInfo('secondary info', SECONDARY_TEXT_COLOR);
// view.drawGameFigure(figure);
view.drawNextFigure(nextFigure);
view.drawScoreInfo(level, lines, score);
// start
gameLoop();

/* I - lightBlue, J - red, L - green, O - blue, S - cyan, T - yellow, Z - pink

                    ■■■      ■■■        ■■         ■■       ■■■         ■■
     ■■■■             ▀      ▀          ▀▀        ▀▀         ▀           ▀▀
*/
