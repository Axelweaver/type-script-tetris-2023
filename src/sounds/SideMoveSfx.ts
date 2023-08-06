import { Howl } from 'howler'; // Howler
import FX_SHORT_MP3 from './mp3/fx-short.mp3';

const SideMoveSfx = new Howl({
    src: [FX_SHORT_MP3],
    volume: 1
});
export default SideMoveSfx;
