import {
    type IRectangle,
    type ITextInfo,
    type GameSquare,
    type GameFieldMatrixElement
} from './types';
import {
    clearRect,
    drawFilledRect,
    drawEmptyRect,
    drawText,
    drawCorner,
    drawSoundIcon,
    drawMutedSoundIcon
} from './helpers';

import { BORDER_COLOR, GAME_FIELD_COLUMNS, GAME_FIELD_ROWS, GAME_FIELD_PADDING } from './setup';
import { type GameFieldMatrix, type GameFigure } from './sprites';
import { Howler } from 'howler';

export class MainView {
    canvas: HTMLCanvasElement;
    private readonly _context: CanvasRenderingContext2D | null;
    private readonly _gameField: IRectangle;
    private readonly _nextFigureField: IRectangle;
    private readonly _scoreField: IRectangle;
    private readonly _soundButtonField: IRectangle;
    private readonly _textInfo: ITextInfo;
    private readonly _secondaryTextInfo: ITextInfo;
    private readonly _gameSquare: GameSquare;
    private _isMutedSound: boolean = false;

    constructor (canvasName: string) {
        this.canvas = document.querySelector(canvasName) as HTMLCanvasElement;
        this._context = this.canvas.getContext('2d');

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

        this._scoreField = {
            positionX: 12,
            positionY: this._nextFigureField.positionY - 28,
            width: Math.round(this.canvas.width / 4) - 18,
            height: this._gameField.height
        };

        this._textInfo = {
            positionX: Math.round(this.canvas.width / 2),
            positionY: Math.round(this.canvas.height / 2),
            fontSize: Math.round(this.canvas.width / 18),
            font: '',
            align: 'center'
        };
        this._textInfo.font = `bold ${this._textInfo.fontSize}px Cascadia Mono SemiBold`;

        this._secondaryTextInfo = {
            positionX: Math.round(this.canvas.width / 2),
            positionY: Math.round(this.canvas.height / 2) + Math.round(this.canvas.height / 7),
            fontSize: Math.round(this.canvas.width / 22),
            font: '',
            align: 'center'
        };
        this._secondaryTextInfo.font = `bold ${this._secondaryTextInfo.fontSize}px Cascadia Mono SemiBold`;

        this._gameSquare = {
            width: Math.round(gameFieldWidth / GAME_FIELD_COLUMNS) - GAME_FIELD_PADDING,
            height: Math.round(this._gameField.height / GAME_FIELD_ROWS) - GAME_FIELD_PADDING
        };

        this._soundButtonField = {
            positionX: this.canvas.width - 68,
            positionY: this.canvas.height - 72,
            width: 56,
            height: 56
        };
        this._drawSoundButton();
        this.canvas.addEventListener('click', this._mouseClickEventHandler);
        document.addEventListener('keypress', this._muteKeypressEventHandler);
    }

    private readonly _mouseClickEventHandler = (e: MouseEvent): void => {
        const canvasRect = this.canvas.getBoundingClientRect();
        const x = e.clientX - canvasRect.left;
        const y = e.clientY - canvasRect.top;

        const isMatch = x > this._soundButtonField.positionX &&
        x < this._soundButtonField.positionX + this._soundButtonField.width &&
        y > this._soundButtonField.positionY &&
        y < this._soundButtonField.positionY + this._soundButtonField.height;

        this._isMutedSound = isMatch ? !this._isMutedSound : this._isMutedSound;

        if (isMatch) {
            this._clearSoundButton();
            Howler.mute(this._isMutedSound);
            this.drawSoundControl();
        }
    };

    private readonly _muteKeypressEventHandler = (e: KeyboardEvent): void => {
        if (e.code === 'KeyM') {
            this._isMutedSound = !this._isMutedSound;
            this._clearSoundButton();
            Howler.mute(this._isMutedSound);
            this.drawSoundControl();
        }
    };

    drawSoundControl (): void {
        if (this._isMutedSound) {
            this._drawMutedSoundButton();
            return;
        }
        this._drawSoundButton();
    }

    private _clearSoundButton (): void {
        clearRect(this._context, this._soundButtonField);
    }

    private _drawSoundButton (): void {
        drawSoundIcon(this._context,
            this.canvas.width - 64,
            this.canvas.height - 64,
            BORDER_COLOR,
            0.1);
    }

    private _drawMutedSoundButton (): void {
        drawMutedSoundIcon(this._context,
            this.canvas.width - 60,
            this.canvas.height - 58,
            BORDER_COLOR,
            0.1);
    }

    clear (): void {
        clearRect(this._context,
            {
                positionX: 0,
                positionY: 0,
                width: this.canvas.width,
                height: this.canvas.height
            });
    }

    clearGameField (): void {
        clearRect(this._context, this._gameField);
    }

    cleartNextFigure (): void {
        clearRect(this._context, this._nextFigureField);
    }

    clearScoreInfo (): void {
        clearRect(this._context, this._scoreField);
    }

    drawScoreInfo (level: number, lines: number, score: number): void {
        const scoreTextInfo = { ...this._secondaryTextInfo };
        scoreTextInfo.positionX = 12;
        scoreTextInfo.positionY = this._nextFigureField.positionY - 20;
        scoreTextInfo.font = 'bold 16px Cascadia Mono SemiBold';
        scoreTextInfo.align = 'left';

        drawText(
            this._context,
            scoreTextInfo,
            BORDER_COLOR,
            'SCORE:');

        scoreTextInfo.font = 'bold 20px Cascadia Mono SemiBold';
        scoreTextInfo.positionY += 40;

        drawText(
            this._context,
            scoreTextInfo,
            BORDER_COLOR,
            `${score}`.padStart(9, '0'));

        scoreTextInfo.positionY += 80;
        scoreTextInfo.font = 'bold 16px Cascadia Mono SemiBold';
        drawText(
            this._context,
            scoreTextInfo,
            BORDER_COLOR,
            `LEVEL: ${level}`);

        scoreTextInfo.positionY += 80;
        drawText(
            this._context,
            scoreTextInfo,
            BORDER_COLOR,
            `LINES: ${lines}`);
    }

    drawNextFigureField (): void {
        const nextTextInfo = { ...this._secondaryTextInfo };
        nextTextInfo.positionX = this._nextFigureField.positionX;
        nextTextInfo.positionY = this._nextFigureField.positionY - 20;
        nextTextInfo.font = 'bold 16px Cascadia Mono SemiBold';
        nextTextInfo.align = 'left';

        drawText(
            this._context,
            nextTextInfo,
            BORDER_COLOR,
            'N E X T:'
        );

        for (let i = 1; i < 3; ++i) {
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

    drawGameField (): void {
        for (let i = 1; i < 4; ++i) {
            drawEmptyRect(
                this._context,
                BORDER_COLOR,
                this._gameField.positionX - GAME_FIELD_PADDING - i,
                this._gameField.positionY - GAME_FIELD_PADDING - i,
                this._gameField.width + GAME_FIELD_PADDING + i * 2,
                this._gameField.height + GAME_FIELD_PADDING + i * 2
            );
        }
    }

    drawNextFigure (figure: GameFigure): void {
        const nextSquareSize = Math.round(this._nextFigureField.width / 5) - 1;
        figure.matrix.forEach((row: number[], rowIndex: number) => {
            row.forEach((column: number, columnIndex: number) => {
                if (column === 1) {
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
            });
        }
        );
    }

    drawGameFigure (figure: GameFigure): void {
        figure.matrix.forEach((row: number[], rowIndex: number) => {
            row.forEach((column: number, columnIndex: number) => {
                if (column === 1) {
                    this.drawGameSquare(
                        figure.columnIndex + columnIndex,
                        figure.rowIndex + rowIndex,
                        figure.color,
                        figure.darkColor,
                        figure.lightColor
                    );
                }
            });
        }
        );
    }

    drawGameSquare (
        columnIndex: number,
        rowIndex: number,
        color: string,
        darkColor: string,
        lightColor: string): void {
        if (rowIndex < 0) {
            return;
        }

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
        );

        drawCorner(
            this._context,
            darkColor,
            lightColor,
            x,
            y,
            this._gameSquare.width,
            this._gameSquare.height
        );
    }

    drawFieldMatrix (matrix: GameFieldMatrix): void {
        matrix.coloredMatrix.forEach((row: any, rowIndex: number) => {
            row.forEach((column: GameFieldMatrixElement, columnIndex: number) => {
                if (column?.value === 1) {
                    this.drawGameSquare(
                        columnIndex,
                        rowIndex,
                        column?.color,
                        column?.darkColor,
                        column?.lightColor);
                }
            });
        });
    }

    drawInfo (text: string, color: string): void {
        drawFilledRect(
            this._context,
            '#0a0a0a', // '#778899',
            this._textInfo.positionX - Math.round(this.canvas.width / 3),
            this._textInfo.positionY - Math.round(this.canvas.height / 8),
            Math.round(this.canvas.width / 1.5),
            Math.round(this.canvas.height / 3)
        );
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
