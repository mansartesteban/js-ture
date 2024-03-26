import resolve from "rollup-plugin-node-resolve"
import commonjs from "rollup-plugin-commonjs"
import babel from "rollup-plugin-babel"
import terser from '@rollup/plugin-terser'

export default [
  {
    input: "src/index.js", // your entry point
    output: [
      {
        file: './dist/index.js',
        format: 'cjs'
      },
      {
        file: './dist/index.min.js',
        format: 'cjs',
        plugins: [terser()]
      },
      {
        file: './dist/index.mjs',
        format: 'es',
      },
      {
        file: './dist/index.min.mjs',
        format: 'es',
        plugins: [terser()]
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      babel({
        exclude: ["node_modules/**"],
      }),
    ],
  },
]