import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';

//const repo = 'type-script-tetris-2023';

export default defineConfig(({command, mode, ssrBuild}) => {
  if (mode == "production") {
    return {
      //base: `/${repo}/`
      base: './'
    };
  }

  return { plugins: [eslint()] };
});