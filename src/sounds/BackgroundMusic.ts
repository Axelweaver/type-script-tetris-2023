import { Howl } from 'howler'; // Howler

const BackgroundMusic = new Howl({
    src: ['./src/sounds/mp3/original-theme.mp3'],
    // html5: true,
    // autoplay: true,
    loop: true,
    volume: 0.2
});

export default BackgroundMusic;
