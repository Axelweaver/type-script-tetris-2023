import { GameFigure } from './sprites';
import { rotateMatrix } from './helpers';
import { MainView } from './mainView';
import { GAME_OVER_COLOR, SECONDARY_TEXT_COLOR } from './setup';

console.log('index.ts');

let matrix: Matrix = [
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [1, 1, 0, 0],
    [0, 0, 0, 0]
 ];


 

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


// start

const view = new MainView("#gameCanvas");
view.drawGameField();

//view.drawInfo('GAME OVER', GAME_OVER_COLOR);
//view.drawSecondaryInfo('secondary info', SECONDARY_TEXT_COLOR);

// for(let i = 0; i < 20; ++i){
//     for(let j = 0; j < 10; ++j){
//         view.drawGameSquare(j, i, 'blue');
//     }
// }

let figure = new GameFigure();
view.drawGameFigure(figure);
/* I - lightBlue, J - red, L - green, O - blue, S - cyan, T - yellow, Z - pink

                    ■■■      ■■■        ■■         ■■       ■■■         ■■
     ■■■■             ▀      ▀          ▀▀        ▀▀         ▀           ▀▀
*/