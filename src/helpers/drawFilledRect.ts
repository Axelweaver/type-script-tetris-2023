export default function drawFilledRect (
    context: CanvasRenderingContext2D | null,
    color: string,
    x: number,
    y: number,
    width: number,
    height: number): void {

        if(!context){
            return;
        }
        context.fillStyle = color;
        context.fillRect(x, y, width, height);
}