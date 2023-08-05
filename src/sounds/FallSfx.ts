import { Howl } from 'howler'; // Howler

const FallSfx = new Howl({
    src: ['./src/sounds/mp3/fx-fall.mp3'],
    volume: 1,
    onplayerror: function () {
        FallSfx.once('unlock', function () {
            FallSfx.play();
        });
    }
});
export default FallSfx;
