import { CONSTANTES, getEntity } from '../commons-idb';
import { queryParserTokenized, queryParserSoft } from '../query-parser';

let PARSERS = {};

async function resolve(db, name) {
	if (name in PARSERS) {
		return PARSERS[name];
	}
	try {
		const info = await getEntity(db, CONSTANTES.STORE_INFO_NAME, name);
		const { queryParser } = info;
		const { type } = queryParser;
		switch (type) {
			case 'tokenized':
				PARSERS[name] = queryParserTokenized;
				const { params } = queryParser;
				const { language, pattern, min } = params;
				return (query) =>
					queryParserTokenized(query, { language, pattern, min });
			case 'soft':
				PARSERS[name] = queryParserSoft;
				return queryParserSoft;
			default:
				throw new Error(`Unknow parser type ${type}`);
		}
	} catch (e) {
		throw new Error(e);
	}
}

export default resolve;
