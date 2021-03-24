import csv from 'csvtojson';
import fs from 'fs';

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