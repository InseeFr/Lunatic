import { sortWithMeloto } from './sort-with-meloto';
import { type Entities } from './sort-with-meloto';

/**
 * Rank and sort documents to have more relevant first
 */
function sortDocuments(
	documents: Entities,
	// List of words in the search
	tokens: Array<string>,
	useMelotoRanking = true
): Entities {
	const sortedDocumentsWithScore = documents
		.map(function (doc) {
			const { tokensSearch } = doc;
			const score = Object.keys(tokensSearch).length;
			return { ...doc, score };
		})
		.sort((a, b) => b.score - a.score);

	return useMelotoRanking
		? sortWithMeloto(sortedDocumentsWithScore, tokens)
		: sortedDocumentsWithScore;
}

export default sortDocuments;
