import fs from 'fs';
import path from 'path';
import request from 'request';
import rimraf from 'rimraf';
import AdmZip from 'adm-zip';

const headers = {
	'Content-Type': 'application/json',
	Accept: 'application/json',
	'Accept-Encoding': 'gzip, deflate, br',
	Connection: 'keep-alive',
	'X-Requested-With': 'ReplFiles',
	Referrer: 'https://replit.com/',
	Origin: 'https://replit.com/',
};

const tmpPath = path.join(process.cwd(), 'tmp');

export async function fetchFile(urlPath = '/', fileName) {
	if (!fs.existsSync(tmpPath)) {
		fs.mkdirSync(tmpPath);
	} else if (fs.readdirSync(tmpPath).length > 0) {
		rimraf(tmpPath, () => {
			fs.mkdirSync(tmpPath);
		});
	}
	const file = fs.createWriteStream(
		path.join(process.cwd(), `tmp/${urlPath.split('/')[2]}.zip`)
	);
	await new Promise((resolve, reject) => {
		request({
			uri: `https://staging.replit.com${urlPath}.zip`,
			headers,
			gzip: true,
		})
			.pipe(file)
			.on('finish', () => {
				resolve();
			})
			.on('error', (error) => {
				reject(error);
			});
	}).catch((error) => {
		console.log(`Something happened: ${error}`);
	});

	const output = [];

	const zip = new AdmZip(path.join(tmpPath, `${urlPath.split('/')[2]}.zip`));
	zip.getEntries().forEach((entry) => {
		const { entryName } = entry;
		if (entryName === fileName) {
			output.push({
				fileName: entryName,
				fileContent: zip.readAsText(entry),
			});
		}
	});

	rimraf(tmpPath, () => {
		console.log('');
	});
	return output;
}

export async function fetchFiles(urlPath = '/') {
	if (!fs.existsSync(tmpPath)) {
		fs.mkdirSync(tmpPath);
	} else if (fs.readdirSync(tmpPath).length > 0) {
		rimraf(tmpPath, () => {
			fs.mkdirSync(tmpPath);
		});
	}
	const file = fs.createWriteStream(
		path.join(process.cwd(), `tmp/${urlPath.split('/')[2]}.zip`)
	);
	await new Promise((resolve, reject) => {
		request({
			uri: `https://staging.replit.com${urlPath}.zip`,
			headers,
			gzip: true,
		})
			.pipe(file)
			.on('finish', () => {
				resolve();
			})
			.on('error', (error) => {
				reject(error);
			});
	}).catch((error) => {
		console.log(`Something happened: ${error}`);
	});

	const output = [];

	const zip = new AdmZip(path.join(tmpPath, `${urlPath.split('/')[2]}.zip`));
	zip.getEntries().forEach((entry) => {
		const { entryName } = entry;
		output.push({
			fileName: entryName,
			fileContent: zip.readAsText(entry),
		});
	});

	rimraf(tmpPath, () => {
		console.log('');
	});
	return output;
}
