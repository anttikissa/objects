//
// Build the project once or whenever items change (if given argument --watch).
// Results in public/ being populated with .js and .css files.
//
// Run this from the root directory.
// e.g. node dev/build.mjs
//

import rollup from 'rollup'
import path from 'path'
import process from 'process'

import { log } from '../common/log'

// Allows us to import npm modules
import rollupResolve from 'rollup-plugin-node-resolve'

// Allows us to import CSS, and, as it happens, also Stylus files
import rollupPostcss from 'rollup-plugin-postcss'

let outputOptions = {
	file: 'public/bundle.js',
	format: 'iife'
}

let rollupOptions = {
	input: 'client/main.mjs',
	output: outputOptions,
	watch: {
		clearScreen: false
	},
	plugins: [
		rollupResolve({
			browser: true
		}),
		rollupPostcss({
			extract: 'public/styles.css',
			sourceMap: true,
			plugins: []
		})
	]
}

let args = process.argv
let doWatch = args.includes('--watch') || args.includes('-w')

async function doIt() {
	if (doWatch) {
		let watcher = rollup.watch(rollupOptions)
		watcher.on('event', ev => {
			handleEvent(ev)
		})
	} else {
		let start = new Date()

		log(`Bundling ${rollupOptions.input} => ${outputOptions.file}`)
		const bundle = await rollup.rollup(rollupOptions)

		await bundle.write(outputOptions)
		let end = new Date()

		log(`Finished ${rollupOptions.input} => ${outputOptions.file} in ${end - start} ms`)
	}
}

// Return { file, line, column } from any error, if we can
function findLoc(error) {
	let result

	if (error.loc) {
		result = error.loc
	} else {
		result = {
			file: error.file,
			line: error.line,
			column: error.column
		}
	}

	if (!result.file || !result.line || !result.column) {
		return null
	}

	return result
}

function handleEvent(ev) {
	if (ev.code === 'FATAL' || ev.code === 'ERROR') {
		let loc = findLoc(ev.error)
		log(ev.error.toString())
		if (loc) {
			log(`${ev.error.code} in file ${loc.file}:${loc.line}:${loc.column}`)
		} else {
			if (ev.error.code) {
				log(`Error code ${ev.error.code}`)
			} else {
				// This likely gives no new information and is ugly but it happens
				// rarely and might contain something, so just dump all the info
				log('Error in its entirety:', ev.error)
			}
		}
		ev.error.frame && log(ev.error.frame)
		// log(ev.error)
		// log('debug', ev)
	} else if (ev.code === 'START') {
		// log('Start')
	} else if (ev.code === 'END') {
		// log('End')
	} else if (ev.code === 'BUNDLE_START') {
		let outputPath
		if (ev.output.length > 1) {
			outputPath = ev.output.length.join(', ')
		} else {
			outputPath = path.relative(process.cwd(), ev.output[0])
		}

		log(`Bundling ${ev.input} => ${outputPath}`)
	} else if (ev.code === 'BUNDLE_END') {
		let outputPath
		if (ev.output.length > 1) {
			outputPath = ev.output.length.join(', ')
		} else {
			outputPath = path.relative(process.cwd(), ev.output[0])
		}

		// Note that files imported from .css or .styl files are not included here.
		// Let's leave with that for a while.
		// log('Watching files', ev.result.watchFiles)

		// log('debug', ev)

		log(`Finished ${ev.input} => ${outputPath} in ${ev.duration} ms`)
	} else {
		log('Event', ev)
	}
}

doIt()
	.then(() => {})
	.catch(log)
