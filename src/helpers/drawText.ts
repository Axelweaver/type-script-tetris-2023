import { ITextInfo } from './types';

export default function drawText (
    context: CanvasRenderingContext2D | null,
    textInfo: ITextInfo,
    color: string,
    text: string): void {
        console.log(`drawText "${text}", context: `, context, 'textInfo: ', textInfo);
        if(!context){
            return;
        }

        context.fillStyle = color;
        context.font = textInfo.font;
        context.textAlign = textInfo.align;
        context.textBaseline = 'middle';
        context.fillText(
            text, 
            textInfo.positionX, 
            textInfo.positionY);           
}