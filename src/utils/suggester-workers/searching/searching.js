import getDb from './get-db';
import { CONSTANTES } from '../../store-tools';
import { getEntity } from '../../idb-tools';
import searchInIndex from './search-in-index';
import resolveQueryParser from './resolve-query-parser';
import computeScore from './compute-score';
import getOrderingFunction from './order';

function prepare(response) {
	return response.map(({ suggestion, tokensMap }) => ({
		...suggestion,
		tokensMap,
	}));
}

async function searchTokens(tokens, index) {
	const results = await Promise.all(
		tokens.map((token) => searchInIndex(token, index))
	);

	return results.reduce(function (a, step, i) {
		return { ...a, [tokens[i]]: step };
	}, {});
}

function isValideSearch(search) {
	if (typeof search === 'string' && search.trim().length) {
		return true;
	}
	return false;
}

function filterSize(response, max) {
	if (max && max < response.length) {
		return response.slice(0, max);
	}
	return response;
}

async function searching(search, { name, version = '1' }) {
	try {
		if (isValideSearch(search)) {
			const db = await getDb(name, version);
			const info = await getEntity(db, CONSTANTES.STORE_INFO_NAME, name);
			const { queryParser, max, order } = info;
			const parser = await resolveQueryParser(queryParser);
			const transaction = db.transaction(
				CONSTANTES.STORE_DATA_NAME,
				'readonly'
			);
			const store = transaction.objectStore(CONSTANTES.STORE_DATA_NAME);
			const index = store.index(CONSTANTES.STORE_INDEX_NAME);
			const tokensSearch = parser(search);
			const tokensSuggestions = await searchTokens(tokensSearch, index);
			const response = computeScore(tokensSuggestions);
			return {
				results: prepare(
					getOrderingFunction(order)(filterSize(response, max), order)
				),
				search,
				tokensSearch,
			};
		}
		return { results: [], search };
	} catch (e) {
		console.error(e);
		throw e;
	}
}

export default searching;
