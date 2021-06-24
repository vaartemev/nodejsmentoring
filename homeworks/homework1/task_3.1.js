import readline from 'readline';

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

rl.question('Type your word here: ', (answer) => {
	let reversedAnswer = answer.split('').reverse().join('');
	process.stdout.write(`Your reversed word: ${reversedAnswer}`);
	rl.close();
});