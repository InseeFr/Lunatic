import { queryParserTokenized, queryParserSoft } from './query-parser';

async function resolve(queryParser) {
	try {
		switch (queryParser.type) {
			case 'tokenized':
				return (query) => queryParserTokenized(query, queryParser.params);
			case 'soft':
				return queryParserSoft;
			default:
				throw new Error(`Unknown parser type ${queryParser.type}`);
		}
	} catch (e) {
		throw new Error(`Cannot resolve parser, ${e.toString()}`);
	}
}

export default resolve;
