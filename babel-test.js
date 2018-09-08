
async function wait(time) {
	return new Promise(resolve => {
		setTimeout(resolve, time);
	});
}

async function main() {
	await wait(1000);
	return 10;
}

main().then((result) => console.log(result)).catch(err => console.log('err', err));

