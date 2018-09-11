import Koa from 'koa'
import koaStatic from 'koa-static'
import mount from 'koa-mount'
import { log } from '../common/log'

import { config } from './config'

log.showDate = true

if (config.DEV_MODE) {
	log('Starting server in development mode')
} else {
	log('Starting server in production mode')
}

const PORT = 4000

async function main() {
	let koa = new Koa()

	// Serve index.html
	koa.use(koaStatic('./public'))
	// Serve main.mjs (and other code)
	koa.use(koaStatic('./client'))

	koa.use(mount('/common', koaStatic('./common')))

	koa.listen(PORT)

	log(`Listening at http://localhost:${PORT}`)

	if (config.DEV_MODE) {
		let { autorestart } = await import('./autorestart')
		autorestart()
	}
}

main()
	.then(() => {})
	.catch(err => log)
