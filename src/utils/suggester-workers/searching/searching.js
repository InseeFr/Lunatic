import getDb from './get-db';
import { CONSTANTES } from '../../store-tools';
import { getEntity } from '../../idb-tools';
import searchInIndex from './search-in-index';
import resolveQueryParser from './resolve-query-parser';
import sortDocuments from './sort-documents';
import getOrderingFunction from './order';

/**
 * Transform documents before sending it back to the main thread
 */
function normalizeDocuments(response) {
	return response.map(({ suggestion, tokensMap }) => ({
		...suggestion,
		tokensMap,
	}));
}

/**
 * Search documents matching one of the token and add the token count
 *
 * @param {string[]} tokens
 * @param {IDBIndex} index
 * @return {Promise<[{id: string, tokensSearch: {[token: string]: number},[key: string]: unknown}]>}
 */
async function searchTokens(tokens, index) {
	// Find the rows matching each token in the index
	const results = await Promise.all(
		tokens.map((token) => searchInIndex(token, index))
	);
	// Flatten the results and add the number of time a token is encountered for each row
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

/**
 * Limit the number of results retrieved
 */
function limitSize(documents, max) {
	if (max && max < documents.length) {
		return documents.slice(0, max);
	}
	return documents;
}

async function searching(search, { name, version = '1', meloto = true }) {
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
			const tokens = parser(search);
			const documents = await searchTokens(tokens, index);

			return {
				results: normalizeDocuments(
					getOrderingFunction(order)(
						limitSize(sortDocuments(documents, tokens, meloto), max),
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
