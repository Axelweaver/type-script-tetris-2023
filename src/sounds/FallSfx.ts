import { Howl } from 'howler'; // Howler
import FX_FALL_MP3 from './mp3/fx-fall.mp3';

const FallSfx = new Howl({
    src: [FX_FALL_MP3],
    volume: 1,
    onplayerror: function () {
        FallSfx.once('unlock', function () {
            FallSfx.play();
        });
    }
});
export default FallSfx;
