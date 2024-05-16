import source from './source.json';
import Orchestrator from '../../utils/orchestrator.jsx';

export default {
	title: 'Behaviour/Fillers',
	component: Orchestrator,
};

export const Default = {
	args: {
		source: source,
		data: {},
		mockFiller: (data) => {
			return new Promise((resolve) => {
				setTimeout(
					() => {
						if (data.CODE === '34000') {
							return resolve({ CITY: 'Montpellier' });
						} else if (data.CODE === '31000') {
							return resolve({ CITY: 'Toulouse' });
						}
						return resolve({});
					},
					window.location.hash.startsWith('#t')
						? parseInt(window.location.hash.replace('#t', ''), 10)
						: 1500
				);
			});
		},
	},
};
