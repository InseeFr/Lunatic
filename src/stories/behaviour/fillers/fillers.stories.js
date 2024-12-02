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
		mockFiller: (url) => {
			return new Promise((resolve) => {
				setTimeout(
					() => {
						const code = new URL(url).searchParams.get('code');
						if (code === '34000') {
							return resolve({ CITY: 'Montpellier' });
						} else if (code === '31000') {
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
