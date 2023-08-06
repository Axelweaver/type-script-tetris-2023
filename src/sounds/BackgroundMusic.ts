import { Howl } from 'howler'; // Howler
import ORIGINAL_THEME_MP3 from './mp3/original-theme.mp3';

const BackgroundMusic = new Howl({
    src: [ORIGINAL_THEME_MP3],
    // html5: true,
    // autoplay: true,
    loop: true,
    volume: 0.2
});

export default BackgroundMusic;
