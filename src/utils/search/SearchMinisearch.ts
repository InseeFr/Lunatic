import type {
	IndexEntry,
	SearchInfo,
	SearchInterface,
} from './SearchInterface';
import { applyMelauto } from './melauto';
import MiniSearch from 'minisearch';
import { tokenizer } from './tokenizer';
import { normalizeStr } from './utils';

function getMelautoQuery(query: string, info: SearchInfo) {
	const tokens = tokenizer(info)(query);

	// existing query tokens (already tokenized/normalized by tokenizer).
	const expandedTokens = new Set(tokens);

	// add synonyms to keep melauto ranking.
	for (const field of info.fields) {
		if (!field.synonyms) {
			continue;
		}
		for (const source in field.synonyms) {
			const normalizedSource = normalizeStr(source);
			const normalizedSynonyms = field.synonyms[source].map((synonym) =>
				normalizeStr(synonym)
			);

			// source -> synonyms
			if (expandedTokens.has(normalizedSource)) {
				normalizedSynonyms.forEach((synonym) => expandedTokens.add(synonym));
			}

			// synonym -> source
			if (normalizedSynonyms.some((synonym) => expandedTokens.has(synonym))) {
				expandedTokens.add(normalizedSource);
			}
		}
	}

	return Array.from(expandedTokens).join(' ');
}

export class SearchMinisearch<T extends IndexEntry>
	implements SearchInterface<T>
{
	db: MiniSearch<T> | null = null;
	info: SearchInfo;
	indexed = false;

	constructor(info: SearchInfo) {
		this.info = info;
	}

	isIndexed() {
		return this.indexed;
	}

	async index(data: T[]): Promise<void> {
		if (this.indexed) {
			return Promise.resolve();
		}
		const nameFields = this.info.fields.map(({ name }) => name);
		this.db = new MiniSearch({
			fields: nameFields,
			storeFields: data[0] ? Object.keys(data[0]) : nameFields,
			tokenize: tokenizer(this.info),
		});
		this.db.addAll(data);
		this.indexed = true;
	}

	async search(q: string): Promise<T[]> {
		if (!this.db || !this.info.queryParser) {
			return [];
		}
		let data = this.db.search(q, {
			prefix: (term) => term.length > 2,
		}) as any as T[];

		// Apply melauto to classify results
		data = applyMelauto(getMelautoQuery(q, this.info), data);

		data = data.slice(0, this.info.max);

		return data;
	}

	getFieldsById(id: any) {
		if (!this.db) {
			return {} as T;
		}
		return this.db.getStoredFields(id) as T;
	}
}
