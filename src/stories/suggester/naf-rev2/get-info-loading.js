import fetchNaf from './fetch-naf';
import storeInfo from './store-info';

function get() {
	return { fetch: fetchNaf, storeInfo, idbVersion: 1 };
}

export default get;
