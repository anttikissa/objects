export function log(...args) {
	if (log.showDate) {
		let dateString = new Date().toISOString()
		dateString = dateString.replace('T', ' ').replace('Z', '')
		/* eslint-disable */
		console.log(dateString, ...args)
		/* eslint-enable */
	} else {
		/* eslint-disable */
		console.log(...args)
		/* eslint-enable */
	}
}

log.showDate = false
