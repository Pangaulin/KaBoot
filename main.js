const Kahoot = require('kahoot.js-latest');
const readline = require('readline');
const process = require('process');
const fs = require('fs');
const array = fs.readFileSync('dictionary.txt').toString().split('\n');


const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

function generateRandomUsername(id) {
	return 'user' + id + '_' + Math.floor(Math.random() * 100000);
}

function getDictionaryUsername(i) {
	return array[i];
}

rl.question('Please write the kahoot code: ', function(kahootCode) {
	rl.question('How do you want to generate nicknames : \n1. Random Usernames\n2. Usernames from the dictionary\nYour method : ', function(method) {
		if (method == '1') {
			for (let i = 0; i < 50; i++) {
				const client = new Kahoot();
				const username = generateRandomUsername(i);

				client.join(kahootCode, username).catch(err => {
					console.error(`Failed to join the Kahoot game with username ${username}:`, err);
				});

				client.on('Joined', () => {
					console.log(`Logged in as ${username}`);
				});
			}
		}
		else if (method == '2') {
			for (let i = 0; i < array.length; i++) {
				const client = new Kahoot();
				const username = getDictionaryUsername(i);

				client.join(kahootCode, username).catch(err => {
					console.error(`Failed to join the Kahoot game with username ${username}:`, err);
				});

				client.on('Joined', () => {
					console.log(`Logged in as ${username}`);
				});
			}
		}
		else {
			console.log('This method doesn\'t exist, the available methods are 1 or 2.');
		}
	});
});
