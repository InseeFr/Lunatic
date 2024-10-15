import source from './source-rp.json';
import data from './data.json';
import Orchestrator from '../../utils/orchestrator.jsx';

const __FETCH = window.fetch;

/**
 * Pour éviter d'avoir à tester si le mock est actif dans le composant
 * exposé par la librairie.
 * @param {*} url
 * @param  {...any} options
 * @returns
 */
window.fetch = async (url, ...options) => {
	const urlParser = new URL(url);

	if (urlParser.origin === 'https://api-questionnaire-recensement.insee.fr') {
		console.warn('Mock', urlParser.host);
		return {
			json: () => ({
				NUMVOI_LOC_SUGG: '1',
				BISTER_LOC_SUGG: null,
				TYPEVOI_LOC_SUGG: 'Impasse',
				NOMVOI_LOC_SUGG: 'DU PINSON',
				RESPONSE: true,
			}),
		};
	}

	return __FETCH(url, ...options);
};

export default {
	title: 'Behaviour/Fillers',
	component: Orchestrator,
};

export const FillerRp = {
	args: {
		source: source,
		data,
	},
};
