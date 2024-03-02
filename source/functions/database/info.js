const { MongoClient, ServerApiVersion } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

async function sendInfo(
	computerid,
	usage,
	date,
	version,
	username,
	password,
	cluster,
	args
) {

  if ((!username, !password, !cluster, !args)) {
		console.log('No database credentials found');
		return;
	} else {
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
			const db = client.db('ModernPrimula-logs');
			const infoCollection = db.collection('info');

			const infoData = {
				computerid: computerid,
				usage: usage,
				date: date,
				version: version,
			};

			const infoResult = await infoCollection.insertOne(infoData);
		} finally {
			await client.close();
		}
	}
}

module.exports = sendInfo;
