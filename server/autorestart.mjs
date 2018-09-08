import { log } from '../common/log'
import chokidar from 'chokidar'
import process from 'process'

export function autorestart() {
	// log('autorestarting... files', files)

	chokidar.watch(['server', 'common']).on('all', (event, path) => {
		if (event === 'add' || event === 'addDir') {
			return
		}

		log(`Detected change in ${path}, restarting.`)
		process.exit(10)
	})


	// chokidar.watch(files, { ignored }).on('all', (ev, p) => {
	// 	log('ev', ev, 'p', p)
	// })
}
