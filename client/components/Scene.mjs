import { el, svg } from 'redom'
import { log } from '../../common/log'

import './Scene.styl'

export class Scene {
	constructor() {
		this.el = svg('svg.Scene',
			// { width: '300', height: '200' },
			svg('rect', { width: '300', height: '200', fill: 'red' }),
			svg('circle', { cx: '150', cy: '100', r: '80', fill: 'green' }),
			svg('text', { x: '150', y: '125', 'font-size': 60, 'text-anchor': 'middle', fill: 'white' }, 'SVG')
		)
	}

	onmount() {
		log('mount')
		log('width', this.el.clientWidth)
	}
}
