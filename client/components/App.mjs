import { el } from 'redom'
import './App.styl'

export class App {
	constructor() {
		this.el = el(
			'div.App',

			'Some test content here'
		)
	}
}
