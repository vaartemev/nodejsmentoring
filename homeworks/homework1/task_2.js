const csv = require('csvtojson');
const fs = require('fs');

const csvFilePath = 'homeworks/homework1/assets/data.csv';
const textFilePath = 'homeworks/homework1/assets/data.txt'

const readStream = fs.createReadStream(csvFilePath);
const writeStream = fs.createWriteStream(textFilePath);

const csvOptions = {
	ignoreColumns: /amount/gi
};

readStream
	.pipe(csv(csvOptions))
	.pipe(writeStream);