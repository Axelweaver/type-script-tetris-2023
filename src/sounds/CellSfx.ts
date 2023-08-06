import { Howl } from 'howler'; // Howler
import FX_CELL_MP3 from './mp3/fx-cell.mp3';

const CellSfx = new Howl({
    src: [FX_CELL_MP3],
    volume: 0.35
});
export default CellSfx;
