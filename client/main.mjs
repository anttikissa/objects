import { mount } from 'redom'

import './global-styles.styl'

import { App } from './components/App'

let app = new App()

mount(document.body, app)

