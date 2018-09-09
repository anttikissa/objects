import resolve from 'rollup-plugin-node-resolve'
import stylus from 'rollup-plugin-stylus-css-modules'

export default {
	input: 'client/main.mjs',
	output: {
		file: 'public/bundle.js',
		format: 'iife'
	},
	plugins: [
		resolve({
			browser: true, // Default: false
			// not all files you want to resolve are .js files
			extensions: ['.mjs', '.js', '.jsx', '.json'] // Default: [ '.mjs', '.js', '.json', '.node' ]
		}),
		stylus({
			output: 'public/styles-dev.css'
		})
	]
}
