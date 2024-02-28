const { MongoClient, ServerApiVersion } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config({ path: '../.env' });

const username = encodeURIComponent(process.env.DB_USERNAME);
const password = encodeURIComponent(process.env.DB_PASSWORD);
const cluster = process.env.DB_CLUSTER;
const args = process.env.DB_ARGS;

let uri = `mongodb+srv://${username}:${password}@${cluster}/?${args}`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});

async function run() {
	try {
		// Connect the client to the server
		await client.connect();
		console.log('Connected successfully to server');

		// Get the database and collection
		const db = client.db('ModernPrimula-logs');
		const infoCollection = db.collection('info');
		const errorCollection = db.collection('errors');

		// Insert the data into the database
		const testInfoData = {
			computerid: 'ab1234',
			usage: 'testing',
			date: 'today',
			version: '1.0.0',
		};

		const testErrorData = {
			computerid: 'ab1234',
			usage: 'testing',
			date: 'today',
			version: '1.0.0',
			error: 'error',
			line: '100',
			function: 'testFunction',
		};

		const infoResult = await infoCollection.insertOne(testInfoData);
		console.log(`Information inserted with the _id: ${infoResult.insertedId}`);

		const errorResult = await errorCollection.insertOne(testErrorData);
		console.log(
			`Error information inserted with the _id: ${errorResult.insertedId}`
		);
	} finally {
		// Ensures that the client will close when you finish/error
		await client.close();
	}
}

run().catch(console.error);
