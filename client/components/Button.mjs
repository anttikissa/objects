import { el } from '/redom.mjs'
// You cannot do that so let's have a build step after all
// import './Button.css'

export class Button {
	constructor(text) {
		this.el = el('button.Button', text)
	}

	set onclick(f) {
		this.el.onclick = f
	}
}
