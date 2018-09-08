import { el, mount } from '/redom.mjs'

import { log } from './log.mjs'
import { sleep } from './util.mjs'

async function main() {

	let app = el('div.app', 'Hello world!')
	mount(document.body, app)

	for (let i = 0; i < 5; i++) {
		await sleep(300)

		mount(app, el('p', `This is ${i}`))
		log('Slept 300 ms')
	}
	return 'main returned'
}

main()
	.then(result => log(result))
	.catch(err => log('err', err))
