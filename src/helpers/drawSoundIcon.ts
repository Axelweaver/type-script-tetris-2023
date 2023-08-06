export default function drawSoundIcon (
    context: CanvasRenderingContext2D | null,
    positionX: number,
    positionY: number,
    color: string,
    scale: number = 1): void {
    if (context == null) {
        return;
    }

    positionX = positionX / scale;
    positionY = positionY / scale;
    context.scale(scale, scale);
    context.beginPath();
    context.lineWidth = 1;
    context.fillStyle = color;
    context.strokeStyle = color;
    context.moveTo(positionX, positionY);
    context.translate(42.666667, 85.333333);

    context.moveTo(positionX + 361.299413, positionY + 341.610667);
    context.lineTo(positionX + 328.014293, positionY + 314.98176);
    context.bezierCurveTo(
        positionX + 402.206933,
        positionY + 233.906133,
        positionX + 402.206933,
        positionY + 109.96608,
        positionX + 328.013013,
        positionY + 28.8906667);
    context.lineTo(positionX + 361.298133, positionY + 2.26304);
    context.bezierCurveTo(
        positionX + 447.910187,
        positionY + 98.97536,
        positionX + 447.908907,
        positionY + 244.898347,
        positionX + 361.299413,
        positionY + 341.610667);
    context.closePath();
    context.moveTo(positionX + 276.912853, positionY + 69.77216);
    context.lineTo(positionX + 243.588693, positionY + 96.4309333);
    context.bezierCurveTo(
        positionX + 283.38432,
        positionY + 138.998613,
        positionX + 283.38304,
        positionY + 204.87488,
        positionX + 243.589973,
        positionY + 247.44256);
    context.lineTo(positionX + 276.914133, positionY + 274.101333);
    context.bezierCurveTo(
        positionX + 329.118507,
        positionY + 215.880107,
        positionX + 329.118507,
        positionY + 127.992107,
        positionX + 276.912853,
        positionY + 69.77216);
    context.closePath();
    context.moveTo(positionX + 191.749973, positionY + 1.42108547e-14);
    context.lineTo(positionX + 80.8957867, positionY + 87.2292267);
    context.lineTo(positionX + 7.10542736e-15, positionY + 87.2292267);
    context.lineTo(positionX + 7.10542736e-15, positionY + 257.895893);
    context.lineTo(positionX + 81.0208, positionY + 257.895893);
    context.lineTo(positionX + 191.749973, positionY + 343.35424);
    context.lineTo(positionX + 191.749973, positionY + 1.42108547e-14);
    context.lineTo(positionX + 191.749973, positionY + 1.42108547e-14);
    context.closePath();
    context.fill('evenodd');
    context.stroke();
    context.restore();
    context.setTransform(1, 0, 0, 1, 0, 0);
}
