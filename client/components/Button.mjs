import { el } from 'redom'
// import { log } from '../../common/log.mjs'

import './Button.styl'

export class Button {
	constructor(text, optionalClass) {
		this.el = el('button.Button', text)
		if (optionalClass) {
			this.el.classList.add(optionalClass)
		}
	}

	set onclick(f) {
		this.el.onclick = f
	}
}
