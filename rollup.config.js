import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'

const production = !process.env.ROLLUP_WATCH

export default {
  input: 'index.js',
  output: {
    file: 'dist/index.js',
    format: 'cjs', // immediately-invoked function expression — suitable for <script> tags
    sourcemap: true
  },
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    production && uglify() // minify, but only in production
  ]
}