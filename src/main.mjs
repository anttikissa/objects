import { log } from './log'
import { sleep } from './util'

async function main() {
	for (let i = 0; i < 5; i++) {
		await sleep(300)
		log('Slept 300 ms')
	}
	return 'main returned'
}

main()
	.then(result => log(result))
	.catch(err => log('err', err))
