import { queryParserTokenized, queryParserSoft } from '../query-parser';

let PARSERS = {};

async function resolve(name, queryParser) {
	if (name in PARSERS) {
		return PARSERS[name];
	}
	try {
		const { type } = queryParser;
		switch (type) {
			case 'tokenized':
				PARSERS[name] = queryParserTokenized;
				const { params } = queryParser;
				const { language, pattern, min, stemmer } = params;
				return (query) =>
					queryParserTokenized(query, { language, pattern, min, stemmer });
			case 'soft':
				PARSERS[name] = queryParserSoft;
				return queryParserSoft;
			default:
				throw new Error(`Unknown parser type ${type}`);
		}
	} catch (e) {
		throw new Error(e);
	}
}

export default resolve;
