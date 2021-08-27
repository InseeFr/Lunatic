import createAppendTask from '../../components/suggester-loader-widget/create-append-task';
import { clearStoreData } from './clear-store-data';

export const loadSuggesters = (suggesterFetcher) => async (suggesters) => {
	const urls = Object.values(suggesters).map(({ url, idKey }) => ({
		url,
		idKey,
	}));
	const a = await suggesterFetcher(urls[0].url, urls[0].idKey);
	console.log(a);
	function load() {
		let abort;
		async function go() {
			try {
				if (entities && db && idbVersion && fields) {
					const [start, abort_] = createAppendTask(
						name,
						idbVersion,
						fields,
						log
					);
					abort = abort_;
					clearStoreData(db);
					await start(entities);
					post(name, entities.length);
				}
			} catch (e) {
				console.warn(e);
			}
		}

		go();
	}
};

// const loadSuggester = (url, idKey) => suggesterFetcher =>
