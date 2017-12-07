import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

export default {
    input: 'src/main.js',
    output: {
        file: 'bundle.js',
        format: 'umd',
        name: 'BCalendar'
    },
    plugins: [json(), resolve(), babel({
        exclude: 'node_modules/**'
    })]
}