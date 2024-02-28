import getDb from './get-db';
import { CONSTANTES } from '../../store-tools';
import { getEntity } from '../../idb-tools';
import searchInIndex from './search-in-index';
import resolveQueryParser from './resolve-query-parser';
import computeScore from './compute-score';
import getOrderingFunction from './order';
import {
	STORE_DATA_NAME,
	STORE_INDEX_NAME,
	STORE_INFO_NAME,
} from '../../../constants/indexedDBStore';

function prepare(response) {
	return response.map(({ suggestion, tokensMap }) => ({
		...suggestion,
		tokensMap,
	}));
}

async function searchTokens(tokens, index) {
	// ask IDB
	const results = await Promise.all(
		tokens.map((token) => searchInIndex(token, index))
	);
	// concat and tokens count
	const map = results.reduce(function (m, docs, i) {
		const token = tokens[i];
		return docs.reduce(function (m2, doc) {
			const { id } = doc;
			const tokensSearch = id in m2 ? m2[id].tokensSearch : {};
			const count = token in tokensSearch ? tokensSearch[token] + 1 : 1;

			return {
				...m2,
				[id]: { ...doc, tokensSearch: { ...tokensSearch, [token]: count } },
			};
		}, m);
	}, {});

	return Object.values(map);
}

function isValideSearch(search) {
	if (typeof search === 'string' && search.trim().length) {
		return true;
	}
	return false;
}

function filterSize(documents, max) {
	if (max && max < documents.length) {
		return documents.slice(0, max);
	}
	return documents;
}

async function searching(search, { name, version = '1', meloto = true }) {
	try {
		if (isValideSearch(search)) {
			const db = await getDb(name, version);
			const info = await getEntity(db, STORE_INFO_NAME, name);
			const { queryParser, max, order } = info;
			const parser = await resolveQueryParser(queryParser);
			const tokens = parser(search);

			// Do not start a transaction if we have nothing to search
			if (tokens.length === 0) {
				return {
					results: [],
					search,
					tokens,
				};
			}
			const transaction = db.transaction(STORE_DATA_NAME, 'readonly');
			const store = transaction.objectStore(STORE_DATA_NAME);
			const index = store.index(STORE_INDEX_NAME);
			const documents = await searchTokens(tokens, index);
			return {
				results: prepare(
					getOrderingFunction(order)(
						filterSize(computeScore(documents, tokens, meloto), max),
						order
					)
				),
				search,
				tokens,
			};
		}
		return { results: [], search };
	} catch (e) {
		console.error(e);
		throw e;
	}
}

export default searching;
