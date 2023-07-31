import { GameFigure, GameFieldMatrix } from './sprites';
import { rotateMatrix } from './helpers';
import { MainView } from './mainView';
import { 
    GAME_OVER_COLOR, 
    SECONDARY_TEXT_COLOR, 
    GAME_MOVE_PER_FRAMES,
    GAME_FIELD_ROWS,
    GAME_FIELD_COLUMNS
} from './setup';

console.log('index.ts');

let moveLeft = false;
let moveRight = false;
let moveDown = false;
let rotateFigure = false;

const handleKeyUp = (e: KeyboardEvent): void => {
    if (e.code === 'ArrowLeft' || e.key === 'ArrowLeft' ||
    e.code === 'KeyA' || e.key.toUpperCase() === 'A') {
        moveLeft = false;
    }

    if (e.code === 'ArrowRight' || e.key === 'ArrowRight' ||
    e.code === 'KeyD' || e.key.toUpperCase() === 'D') {
        moveRight = false;
    }

    if (e.code === 'ArrowDown' || e.key === 'ArrowDown' ||
    e.code === 'KeyS' || e.key.toUpperCase() === 'S') {
        moveDown = false;
    }

    if (e.code === 'ArrowUp' || e.key === 'ArrowUp' ||
    e.code === 'KeyW' || e.key.toUpperCase() === 'W') {
        rotateFigure = false;
    }    
};

const handleKeyDown = (e: KeyboardEvent): void => {
    if (e.code === 'ArrowLeft' || e.key === 'ArrowLeft' ||
    e.code === 'KeyA' || e.key.toUpperCase() === 'A') {
        moveLeft = true;
    }

    if (e.code === 'ArrowRight' || e.key === 'ArrowRight' ||
    e.code === 'KeyD' || e.key.toUpperCase() === 'D') {
        moveRight = true;
    }

    if (e.code === 'ArrowDown' || e.key === 'ArrowDown' ||
    e.code === 'KeyS' || e.key.toUpperCase() === 'S') {
        moveDown = true;
    }

    if (e.code === 'ArrowUp' || e.key === 'ArrowUp' ||
    e.code === 'KeyW' || e.key.toUpperCase() === 'W') {
        rotateFigure = true;
    }   
}; 

document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);

// console.log('old matrix', matrix);

// let rotated90Matrix = rotateMatrix(matrix);

// console.log('90 matrix', rotated90Matrix);

// let rotated180Matrix = rotateMatrix(rotated90Matrix);

// console.log('180 matrix', rotated180Matrix);

// let rotated270Matrix = rotateMatrix(rotated180Matrix);

// console.log('270 matrix', rotated270Matrix);

// initial variables

// initial methods


// game loop

const view = new MainView("#gameCanvas");
// start
let nextFigure = new GameFigure();
let figure = new GameFigure();
let countFrames = 0;
let countKeyboardFrames = 0;
let fieldMatrix = new GameFieldMatrix();

function gameLoop() {
    view.clearGameField();

    if(++countKeyboardFrames > 14) {
        if(moveLeft && figure.columnIndex > 0){
            figure.moveLeft();
            if(fieldMatrix.isCollision(figure)){
                figure.moveRight();
            }
        }
        if(moveRight && (figure.columnIndex +
            figure.width) < GAME_FIELD_COLUMNS){
            figure.moveRight();
            if(fieldMatrix.isCollision(figure)){
                figure.moveLeft();
            }
        }
        if(moveDown &&
            (figure.rowIndex + figure.height) < GAME_FIELD_ROWS){
            figure.moveDown();
            if(fieldMatrix.isCollision(figure)){
                figure.moveUp();
                mergeFigure();
            }
        }
        if(rotateFigure){
            const oldMatrix = figure.matrix;
            figure.rotate();

            while (figure.columnIndex + figure.width >= GAME_FIELD_COLUMNS){
               figure.moveLeft();
            }

            if((figure.rowIndex + figure.height) >=  GAME_FIELD_ROWS){
                figure.setMatrix(oldMatrix);
            }
            
        }
        countKeyboardFrames = 0;    
    }

    if(++countFrames > GAME_MOVE_PER_FRAMES){
        
        if((figure.rowIndex + figure.height) < GAME_FIELD_ROWS){
            figure.moveDown();
            if(fieldMatrix.isCollision(figure)){
                figure.moveUp();
                mergeFigure();
            }            
        }

        if(figure.rowIndex + figure.height >= GAME_FIELD_ROWS) {
            mergeFigure();
        }
        countFrames = 0;
    }

    view.drawFieldMatrix(fieldMatrix);
    view.drawGameFigure(figure);
    
    if(fieldMatrix.isOver()) {
        showGameOver();
        return;
    }

    requestAnimationFrame(() => { gameLoop(); });
}

function mergeFigure(): void {
        fieldMatrix.merge(figure);
        figure = nextFigure;
        nextFigure = new GameFigure();
        view.cleartNextFigure();
        view.drawNextFigure(nextFigure);
}

function showGameOver(): void {
    view.drawInfo('GAME OVER', GAME_OVER_COLOR);
}

view.drawGameField();
view.drawNextFigureField();

//view.drawInfo('GAME OVER', GAME_OVER_COLOR);
//view.drawSecondaryInfo('secondary info', SECONDARY_TEXT_COLOR);

// for(let i = 0; i < 20; ++i){
//     for(let j = 0; j < 10; ++j){
//         view.drawGameSquare(j, i, 'blue');
//     }
// }


console.log('figure width:', figure.width, 'figure height:', figure.height);
//view.drawGameFigure(figure);
view.drawNextFigure(nextFigure);
gameLoop();


/* I - lightBlue, J - red, L - green, O - blue, S - cyan, T - yellow, Z - pink

                    ■■■      ■■■        ■■         ■■       ■■■         ■■
     ■■■■             ▀      ▀          ▀▀        ▀▀         ▀           ▀▀
*/