import { el, mount } from 'redom'

import { log } from '../common/log'
import { sleep } from '../common/util'

import './global-styles.styl'

import { Button } from './components/Button'

class App {
	constructor() {
		this.el = el(
			'div.app',
			'Hello world!',
			(this.button = new Button('Hello')),
			(this.button2 = new Button('Active button', 'Button-active'))
		)

		this.button.onclick = () => log('Click')
	}
}

async function main() {
	let app = new App()

	mount(document.body, app)

	for (let i = 0; i < 5; i++) {
		await sleep(300)
		log('Hello IE!')

		mount(app, el('p', `This is ${i}`))
		log('Slept 300 ms')
	}
	return 'main returned'
}

main()
	.then(result => log(result))
	.catch(err => log('err', err))
