import process from 'process'

export let config = {
	DEV_MODE: process.env.NODE_ENV !== 'production'
}
