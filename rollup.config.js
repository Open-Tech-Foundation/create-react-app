import cleaner from 'rollup-plugin-cleaner';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import copy from 'rollup-plugin-copy'

import pkg from './package.json';

export default {
  input: './src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
    },
    {
      file: pkg.module,
      format: 'es',
    },
  ],
  external: ['fs', 'path', ...Object.keys(pkg.dependencies || {})],
  plugins: [
    cleaner({
      targets: [
        './dist'
      ]
    }),
    typescript({
      typescript: require('typescript'),
      clean: true,
      verbosity: 2,
      check: true,
    }),
    terser(),
    copy({
      targets: [
        { src: 'src/templates', dest: 'dist' },
      ]
    })
  ],
};
