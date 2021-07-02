import optionRenderer from './option-renderer';
import fetchNaf from './fetch-naf';
import storeInfo from './store-info';

function get() {
	return { optionRenderer, fetch: fetchNaf, storeInfo, idbVersion: 1 };
}

export default get;
