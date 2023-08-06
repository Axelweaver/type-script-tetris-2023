import { Howl } from 'howler'; // Howler
import FX_HARD_DROP_MP3 from './mp3/fx-hard-drop.mp3';

const HardDropSfx = new Howl({
    src: [FX_HARD_DROP_MP3],
    volume: 0.3
});
export default HardDropSfx;
