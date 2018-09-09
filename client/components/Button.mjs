import { el } from 'redom'
// import { log } from '../../common/log.mjs'

import './Button.styl'

export class Button {
	constructor(text) {
		this.el = el('button.Button', text)
	}

	set onclick(f) {
		this.el.onclick = f
	}
}
