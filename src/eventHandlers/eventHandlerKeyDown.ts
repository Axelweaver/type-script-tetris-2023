import { type KeyboardState } from '../types';

export default function eventHandlerKeyDown (keys: KeyboardState) {
    return (e: KeyboardEvent): void => {
        if (e.code === 'ArrowLeft' || e.key === 'ArrowLeft' ||
        e.code === 'KeyA' || e.key.toUpperCase() === 'A') {
            keys.moveLeft = true;
        }

        if (e.code === 'ArrowRight' || e.key === 'ArrowRight' ||
        e.code === 'KeyD' || e.key.toUpperCase() === 'D') {
            keys.moveRight = true;
        }

        if (e.code === 'ArrowDown' || e.key === 'ArrowDown' ||
        e.code === 'KeyS' || e.key.toUpperCase() === 'S') {
            keys.moveDown = true;
        }

        if (e.code === 'ArrowUp' || e.key === 'ArrowUp' ||
        e.code === 'KeyW' || e.key.toUpperCase() === 'W') {
            keys.rotateFigure = true;
        }
    };
}
