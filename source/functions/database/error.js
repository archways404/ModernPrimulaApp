const { MongoClient, ServerApiVersion } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

async function sendError(computerid, usage, date, version, error, line, func, username, password, cluster, args) {

	let uri = `mongodb+srv://${username}:${password}@${cluster}/?${args}`;

	const client = new MongoClient(uri, {
		serverApi: {
			version: ServerApiVersion.v1,
			strict: true,
			deprecationErrors: true,
		},
	});

	try {
		await client.connect();
		console.log('Connected successfully to server');
		const db = client.db('ModernPrimula-logs');
		const errorCollection = db.collection('errors');

		const errorData = {
			computerid: computerid,
			usage: usage,
			date: date,
			version: version,
			error: error,
			line: line,
			function: func,
		};
		const errorResult = await errorCollection.insertOne(errorData);
	} finally {
		await client.close();
	}
}

module.exports = sendError;
