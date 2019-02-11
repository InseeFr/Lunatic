import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import postcss from 'rollup-plugin-postcss';
//import { terser } from 'rollup-plugin-terser';

export default {
	input: 'src/components/index.js',
	output: {
		name: 'Lunatic',
		// TEMP
		file: 'dist/lunatic.js',
		format: 'cjs',
		strict: false,
		globals: {
			react: 'React',
			'react-dom': 'ReactDOM',
		},
		sourcemap: true,
	},
	plugins: [
		postcss(),
		babel({
			exclude: 'node_modules/**',
			plugins: ['external-helpers'],
		}),
		replace({
			ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
		}),
		resolve(),
		commonjs(),
		//	terser(),
	],
	external: [
		'react',
		'react-dom',
		'lodash.camelcase',
		'prop-types',
		'@babel/polyfill',
	],
};
