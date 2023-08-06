export default function drawMutedSoundIcon (
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
    context.moveTo(positionX + 47.0849493, positionY - 1.42108547e-14);
    context.lineTo(positionX + 298.668, positionY + 251.583611);
    context.lineTo(positionX + 304.101001, positionY + 257.015597);
    context.lineTo(positionX + 304.101, positionY + 257.016);
    context.lineTo(positionX + 353.573532, positionY + 306.488791);
    context.bezierCurveTo(
        positionX + 353.573732,
        positionY + 306.488458,
        positionX + 353.573933,
        positionY + 306.488124,
        positionX + 353.574133,
        positionY + 306.48779);
    context.lineTo(positionX + 384.435257, positionY + 337.348961);
    context.lineTo(positionX + 384.434, positionY + 337.349);
    context.lineTo(positionX + 409.751616, positionY + 362.666662);
    context.lineTo(positionX + 379.581717, positionY + 392.836561);
    context.lineTo(positionX + 191.749, positionY + 205.003);
    context.lineTo(positionX + 191.749973, positionY + 369.105851);
    context.lineTo(positionX + 81.0208, positionY + 283.647505);
    context.lineTo(positionX + 7.10542736e-15, positionY + 283.647505);
    context.lineTo(positionX + 7.10542736e-15, positionY + 112.980838);
    context.lineTo(positionX + 80.8957867, positionY + 112.980838);
    context.lineTo(positionX + 91.433, positionY + 104.688);
    context.lineTo(positionX + 16.9150553, positionY + 30.169894);
    context.lineTo(positionX + 47.0849493, positionY - 1.42108547e-14);
    context.closePath();
    context.moveTo(positionX + 361.298133, positionY + 28.0146513);
    context.bezierCurveTo(
        positionX + 429.037729,
        positionY + 103.653701,
        positionX + 443.797162,
        positionY + 209.394226,
        positionX + 405.578884,
        positionY + 298.151284);
    context.lineTo(positionX + 372.628394, positionY + 265.201173);
    context.bezierCurveTo(
        positionX + 396.498256,
        positionY + 194.197542,
        positionX + 381.626623,
        positionY + 113.228555,
        positionX + 328.013013,
        positionY + 54.642278);
    context.lineTo(positionX + 361.298133, positionY + 28.0146513);
    context.closePath();
    context.moveTo(positionX + 276.912853, positionY + 95.5237713);
    context.bezierCurveTo(
        positionX + 305.539387,
        positionY + 127.448193,
        positionX + 318.4688,
        positionY + 168.293162,
        positionX + 315.701304,
        positionY + 208.275874);
    context.lineTo(positionX + 266.464558, positionY + 159.040303);
    context.bezierCurveTo(
        positionX + 261.641821,
        positionY + 146.125608,
        positionX + 254.316511,
        positionY + 133.919279,
        positionX + 244.488548,
        positionY + 123.156461);
    context.lineTo(positionX + 243.588693, positionY + 122.182545);
    context.lineTo(positionX + 276.912853, positionY + 95.5237713);
    context.closePath();
    context.moveTo(positionX + 191.749973, positionY + 25.7516113);
    context.lineTo(positionX + 191.749, positionY + 84.3256113);
    context.lineTo(positionX + 158.969, positionY + 51.5456113);
    context.lineTo(positionX + 191.749973, positionY + 25.7516113);
    context.closePath();
    context.fill('evenodd');
    context.stroke();
    context.restore();
    context.setTransform(1, 0, 0, 1, 0, 0);
}
