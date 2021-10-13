import { queryParserTokenized, queryParserSoft } from '../query-parser';

async function resolve(name, queryParser) {
	try {
		const { type } = queryParser;
		switch (type) {
			case 'tokenized':
				const { params } = queryParser;
				const { language, pattern, min, stemmer } = params;
				return (query) =>
					queryParserTokenized(query, { language, pattern, min, stemmer });
			case 'soft':
				return queryParserSoft;
			default:
				throw new Error(`Unknown parser type ${type}`);
		}
	} catch (e) {
		throw new Error(e);
	}
}

export default resolve;
