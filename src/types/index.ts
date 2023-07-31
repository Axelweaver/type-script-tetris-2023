export interface IRectangle {
    positionX: number;
    positionY: number;
    width: number;
    height: number;
}

export interface ITextInfo {
    positionX: number;
    positionY: number;
    fontSize: number;
    font: string;
    align: CanvasTextAlign;
}

export type GameSquare = {
    width: number;
    height: number;
};

export type GameFieldMatrixElement = {
    color: string;
    value: number;
};