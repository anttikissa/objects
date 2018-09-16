import { el } from 'redom'
import './App.styl'
import { Scene } from './Scene.mjs'

export class App {
	constructor() {
		this.el = el(
			'div.App',

			this.scene = new Scene(),
		)
	}
}
