import { createRoot } from 'react-dom/client';
import { LunaticQuestionnaire } from './LunaticQuestionnaire.tsx';
import { Font, PDFViewer } from '@react-pdf/renderer';
import source from './questionnaire.json';
import data from './data.json';
Font.register({
	family: 'Geist',
	fonts: [
		{ src: '/Geist-Regular.ttf' },
		{ src: '/Geist-SemiBold.ttf', fontWeight: 'semibold' },
	],
});

createRoot(document.getElementById('root')!).render(
	<PDFViewer>
		<LunaticQuestionnaire source={source} data={data.data} />
	</PDFViewer>
);
