import { Howl } from 'howler'; // Howler
import FX_ROTATE_MP3 from './mp3/fx-rotate.mp3';

const RotateSfx = new Howl({
    src: [FX_ROTATE_MP3],
    volume: 0.7
});
export default RotateSfx;
