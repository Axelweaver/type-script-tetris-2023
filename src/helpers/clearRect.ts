import { IRectangle } from '/types';

export default function clearRect (
    context: CanvasRenderingContext2D | null,
    rect: IRectangle): void {

        if(!context){
            return;
        }
        
        context.clearRect(
            rect.positionX,
            rect.positionY,
            rect.width,
            rect.height);
 }