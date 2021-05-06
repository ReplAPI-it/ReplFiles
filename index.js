import express from 'express';
import { fetchFile, fetchFiles } from './utils/file.js';

const app = express();

app.get('/', (req, res) => {
	res.end(
		'Send Get Requests to: \n-`/file/[username]/[slug]`\n-`/files/[username]/[slug]`'
	);
});

app.get('/file/:username/:slug', async (req, res) => {
	const { username, slug } = req.params;
	const { filename } = req.query;
	try {
		const info = await fetchFile(`/@${username}/${slug}`, filename);
		res.end(JSON.stringify(info));
	} catch (err) {
		res.end(
			JSON.stringify({
				error: 'An Unexpected Error Occured. Try again later.',
			})
		);
	}
});

app.get('/files/:username/:slug', async (req, res) => {
	const { username, slug } = req.params;
	try {
		const info = await fetchFiles(`/@${username}/${slug}`);
		res.end(JSON.stringify(info));
	} catch (err) {
		res.end(
			JSON.stringify({
				error: 'An Unexpected Error Occured. Try again later.',
			})
		);
	}
});

app.get('*', (req, res) => {
	res.end(
		JSON.stringify({
			error: 'Invalid Endpoint.',
		})
	);
});

app.listen(3000);
