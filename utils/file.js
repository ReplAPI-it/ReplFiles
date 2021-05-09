import fs from 'fs';
import path from 'path';
import request from 'request';
import rimraf from 'rimraf';
import AdmZip from 'adm-zip';
import { nanoid } from 'nanoid';

const headers = {
	'Content-Type': 'application/json',
	Accept: 'application/json',
	'Accept-Encoding': 'gzip, deflate, br',
	Connection: 'keep-alive',
	'X-Requested-With': 'ReplFiles',
	Referrer: 'https://replit.com/',
	Origin: 'https://replit.com/',
};

export async function fetchFile(urlPath = '/', fileName, raw = '0') {
	const tmpPath = path.join(process.cwd(), nanoid());

	if (!fs.existsSync(tmpPath)) {
		fs.mkdirSync(tmpPath);
	} else if (fs.readdirSync(tmpPath).length > 0) {
		rimraf(tmpPath, () => {
			fs.mkdirSync(tmpPath);
		});
	}
	const file = fs.createWriteStream(
		path.join(tmpPath, `${urlPath.split('/')[2]}.zip`)
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

	try {
		const zip = new AdmZip(path.join(tmpPath, `${urlPath.split('/')[2]}.zip`));
		const entry = zip.getEntry(fileName);

		rimraf(tmpPath, () => {});
		if (raw === '1') return zip.readAsText(entry);
		return JSON.stringify([zip.readAsText(entry)]);
	} catch (err) {
    rimraf(tmpPath, () => {
      console.log("Deleted temp folder")
    });
		console.log(err);
		return `An error occured reading the ZIP file for your Repl.`
	}
}

export async function fetchFiles(urlPath = '/') {
	const tmpPath = path.join(process.cwd(), nanoid());

	if (!fs.existsSync(tmpPath)) {
		fs.mkdirSync(tmpPath);
	} else if (fs.readdirSync(tmpPath).length > 0) {
		rimraf(tmpPath, () => {
			fs.mkdirSync(tmpPath);
		});
	}
	const file = fs.createWriteStream(
		path.join(tmpPath, `${urlPath.split('/')[2]}.zip`)
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

  // Fix necessary?
	const zip = new AdmZip(path.join(tmpPath, `${urlPath.split('/')[2]}.zip`));
	const gitignored = zip.getEntry('.gitignore');
	const ignoredFilesTxt = zip.readAsText(gitignored).split('\n');
	const ignoredFiles = [];

	for (let i = ignoredFilesTxt.length; i > 0; i -= 1) {
		if (
			ignoredFilesTxt[i - 1].charAt(0) !== '#' &&
			ignoredFilesTxt[i - 1].charAt(0) !== ''
		)
			ignoredFiles.push(ignoredFilesTxt[i - 1]);
	}

	try {
		zip.getEntries().forEach((entry) => {
			const { entryName } = entry;
			const criteria = [];

			for (let i = ignoredFiles.length; i > 0; i -= 1) {
				if (
					entryName.slice(0, ignoredFiles[i - 1].length) === ignoredFiles[i - 1]
				)
					criteria.push(false);
				else criteria.push(true);
			}

			if (!criteria.includes(false)) {
				output.push({
					fileName: entryName,
					fileContent: zip.readAsText(entry),
				});
			}
		});

		rimraf(tmpPath, () => {});
		return output;
	} catch (err) {
		console.log(err);
		return JSON.stringify({
			error: 'There was an error reading the zip file from your Repl.',
		});
	}
}
