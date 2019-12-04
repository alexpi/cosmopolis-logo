import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';

const minify = () => (process.env.BUILD === 'production') ? terser() : '';

export default {
	input: 'src/logo.js',
	output: {
		file: 'public/logo.js',
		format: 'iife'
	},
	plugins: [
		resolve(),
		commonjs({
			include: 'node_modules/**'
		}),
		babel({
			exclude: 'node_modules/**'
		}),
		minify()
	]
};
