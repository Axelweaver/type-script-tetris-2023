
// imports
import { Matrix } from './types';
import { rotateMatrix } from './helpers';

console.log('index.ts');

let matrix: Matrix = [
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [1, 1, 0, 0],
    [0, 0, 0, 0]
 ];


 

 console.log('old matrix', matrix);

let rotated90Matrix = rotateMatrix(matrix);

console.log('90 matrix', rotated90Matrix);

let rotated180Matrix = rotateMatrix(rotated90Matrix);

console.log('180 matrix', rotated180Matrix);

let rotated270Matrix = rotateMatrix(rotated180Matrix);

console.log('270 matrix', rotated270Matrix);

// initial variables

// initial methods


// game loop


// start