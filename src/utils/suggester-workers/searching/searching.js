import getDb from './get-db';
import { CONSTANTES } from '../../store-tools';
import searchInIndex from './search-in-index';
import resolveQueryParser from './resolve-query-parser';
import computeScore from './compute-score';

function prepare(response) {
	return response.map(({ suggestion }) => suggestion);
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

async function searching(search, name, version = '1', max = 30) {
	try {
		if (isValideSearch(search)) {
			const db = await getDb(name, version);
			const parser = await resolveQueryParser(db, name);
			const transaction = db.transaction(
				CONSTANTES.STORE_DATA_NAME,
				'readonly'
			);
			const store = transaction.objectStore(CONSTANTES.STORE_DATA_NAME);
			const index = store.index(CONSTANTES.STORE_INDEX_NAME);
			const tokens = parser(search);
			const tokensSuggestions = await searchTokens(tokens, index);
			const resultat = computeScore(tokensSuggestions);
			if (max && max < resultat.length) {
				return { results: prepare(resultat.slice(0, max)), search };
			}
			return { results: prepare(resultat), search };
		}
		return { results: [], search };
	} catch (e) {
		console.err(e);
		throw e;
	}
}

export default searching;
