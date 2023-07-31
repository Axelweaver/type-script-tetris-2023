export default function handleKeyUp (keys: object) {

    return (e: KeyboardEvent): void => {
        if (e.code === 'ArrowLeft' || e.key === 'ArrowLeft' ||
        e.code === 'KeyA' || e.key.toUpperCase() === 'A') {
            keys.moveLeft = false;
        }

        if (e.code === 'ArrowRight' || e.key === 'ArrowRight' ||
        e.code === 'KeyD' || e.key.toUpperCase() === 'D') {
            keys.moveRight = false;
        }

        if (e.code === 'ArrowDown' || e.key === 'ArrowDown' ||
        e.code === 'KeyS' || e.key.toUpperCase() === 'S') {
            keys.moveDown = false;
        }

        if (e.code === 'ArrowUp' || e.key === 'ArrowUp' ||
        e.code === 'KeyW' || e.key.toUpperCase() === 'W') {
            keys.rotateFigure = false;
        }    
    };
};