import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';

export default {
    input: 'src/main.js',
    output: {
        dest: 'dist/BTime.min.js',
        format: 'umd',
        name: 'BTime'
    },
    plugins: [json(), resolve(), babel({
        exclude: 'node_modules/**'
    }), uglify()]
}