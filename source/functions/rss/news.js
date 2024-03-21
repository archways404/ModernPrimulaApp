const xml2js = require('xml2js');
const fetch = require('node-fetch'); // Ensure you have 'node-fetch' installed for this to work

const FEED_URL = 'https://archways404.hashnode.dev/rss.xml';

async function getNews() {
	try {
		const response = await fetch(FEED_URL);
		const data = await response.text();
		const parser = new xml2js.Parser();

		// Parse the XML to JSON
		const result = await parser.parseStringPromise(data);

		// Filter articles that contain 'ModernPrimula' in the title and take the first three
		const articles = result.rss.channel[0].item
			.filter((article) => article.title[0].includes('ModernPrimula'))
			.slice(0, 3);

		return articles;
	} catch (error) {
		console.error('Error fetching or parsing RSS feed:', error);
		return error;
	}
}

module.exports = {
	getNews,
};
