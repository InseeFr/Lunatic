import { renderToStream, Font } from '@react-pdf/renderer';
import { serve } from 'bun';
import { LunaticQuestionnaire } from './src/LunaticQuestionnaire';
import source from './src/questionnaire.json';
import data from './src/data.json';

Font.register({
	family: 'Geist',
	fonts: [
		{ src: './public/Geist-Regular.ttf' },
		{ src: './public/Geist-SemiBold.ttf', fontWeight: 'semibold' },
	],
});

serve({
	port: 3001,
	routes: {
		'/': async () =>
			new Response(
				await renderToStream(
					<LunaticQuestionnaire source={source} data={data.data} />
				)
			),
	},
});
