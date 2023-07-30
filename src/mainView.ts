import { Figure, GameField, IRectangle, ITextInfo, GameSquare } from './types';
import { clearRect, drawFilledRect, drawEmptyRect, drawText } from './helpers';
import { BORDER_COLOR, GAME_FIELD_COLUMNS, GAME_FIELD_ROWS, GAME_FIELD_PADDING } from './setup';

export class MainView {
  canvas: HTMLCanvasElement;
  private _context: CanvasRenderingContext2D | null;
  private readonly _gameField: IRectangle;
  private readonly _nextFigureField: IRectangle;
  private readonly _textInfo: ITextInfo;
  private readonly _secondaryTextInfo: ITextInfo;
  private readonly _gameSquare: GameSquare;
  //figure: Figure;

  constructor(canvasName: string) {
    this.canvas = document.querySelector(canvasName) as HTMLCanvasElement;
    this._context = this.canvas.getContext('2d');

    // const textPositionY = Math.round(this.canvas.height / 2) + Math.round(this.canvas.height / 5);
    // const textPositionX = Math.round(this.canvas.width / 2);

    const gameFieldWidth = Math.round(this.canvas.width / 2);
    this._gameField = {
      positionX: Math.round(this.canvas.width / 2) - Math.round(gameFieldWidth / 2),
      positionY: Math.round(this.canvas.height / 2) - Math.round(gameFieldWidth / 2) * 2,
      width: gameFieldWidth,
      height: gameFieldWidth * 2
    };

    this._nextFigureField = {
      positionX: this._gameField.positionX + 
        this._gameField.width + Math.round(gameFieldWidth / 8),
      positionY: this._gameField.positionY + Math.round(gameFieldWidth / 8),
      width: Math.round(gameFieldWidth / 4),
      height: Math.round(gameFieldWidth / 4) * 2
    };

    this._textInfo = {
      positionX: Math.round(this.canvas.width / 2),
      positionY: Math.round(this.canvas.height / 2),
      fontSize: Math.round(this.canvas.width / 18),
      font: '',
      align: 'center'
    };
    this._textInfo.font = `bold ${this._textInfo.fontSize}px Verdana`;

    this._secondaryTextInfo = {
      positionX: Math.round(this.canvas.width / 2),
      positionY: Math.round(this.canvas.height / 2) + Math.round(this.canvas.height / 5),
      fontSize: Math.round(this.canvas.width / 22),
      font: '',
      align: 'center'
    };
    this._secondaryTextInfo.font = `bold ${this._secondaryTextInfo.fontSize}px Verdana`;

    this._gameSquare = {
      width: Math.round(gameFieldWidth / GAME_FIELD_COLUMNS) - GAME_FIELD_PADDING,
      height: Math.round(this._gameField.height / GAME_FIELD_ROWS)  - GAME_FIELD_PADDING
    };
  }

  clearGameField(): void {
    clearRect(this._context, this._gameField);
  }
  
  cleartNextFigure(): void {
    clearRect(this._context, this._nextFigureField);
  }

  drawNextFigureField(): void {
    for(let i = 1; i < 3; ++i){
      drawEmptyRect(
        this._context,
        BORDER_COLOR,
        this._nextFigureField.positionX - i,
        this._nextFigureField.positionY - i,
        this._nextFigureField.width + i * 2,
        this._nextFigureField.height + i * 2
        );      
    }
  }

  drawGameField(): void {
    for(let i = 1; i < 4; ++i){
      drawEmptyRect(
        this._context,
        BORDER_COLOR,
        this._gameField.positionX - i,
        this._gameField.positionY - i,
        this._gameField.width + i * 2,
        this._gameField.height + i * 2
        );      
    }
  }

  drawNextFigure(figure: GameFigure): void {
    const nextSquareSize = Math.round(this._nextFigureField.width / 5) - 1;
    figure.matrix.forEach((row, rowIndex) =>
      row.forEach((column, columnIndex) => {
        if(column === 1){
          const x = this._nextFigureField.positionX + 
            (columnIndex + 1) * (nextSquareSize + 1);

          const y = this._nextFigureField.positionY +
            (rowIndex + 3) * (nextSquareSize + 1);

          drawFilledRect(
            this._context,
            figure.color,
            x,
            y,
            nextSquareSize,
            nextSquareSize
          );
        }
      })
    );
  }

  drawGameFigure(figure: GameFigure){
    figure.matrix.forEach((row, rowIndex) =>
      row.forEach((column, columnIndex) => {
        if(column === 1){
          this.drawGameSquare(
            figure.columnIndex + columnIndex,
            figure.rowIndex + rowIndex,
            figure.color
          );
        }
      })
    );
  }

  drawGameSquare(columnIndex: number, rowIndex: number, color: string): void {
    const x = this._gameField.positionX + 
      (this._gameSquare.width + GAME_FIELD_PADDING) * columnIndex;
    const y = this._gameField.positionY +
      (this._gameSquare.height + GAME_FIELD_PADDING) * rowIndex;

    drawFilledRect(
      this._context,
      color,
      x,
      y,
      this._gameSquare.width,
      this._gameSquare.height
    )
  }

  drawInfo (text: string, color: string): void {
    drawText(
        this._context,
        this._textInfo,
        color,
        text);
  }

  drawSecondaryInfo (text: string, color: string): void {
      drawText(
          this._context,
          this._secondaryTextInfo,
          color,
          text);
  }
}