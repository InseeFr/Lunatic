import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import postcss from 'rollup-plugin-postcss';
import autoExternal from 'rollup-plugin-auto-external';

export default {
	input: 'src/components/index.js',
	output: {
		name: 'lunatic',
		file: 'lib/index.js',
		format: 'cjs',
		strict: false,
		globals: {
			react: 'React',
		},
		sourcemap: true,
	},
	plugins: [
		resolve(),
		postcss(),
		babel({
			exclude: 'node_modules/**',
			plugins: ['external-helpers'],
		}),
		replace({
			exclude: 'node_modules/**',
			ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
		}),
		commonjs(),
		autoExternal(),
	],
};
