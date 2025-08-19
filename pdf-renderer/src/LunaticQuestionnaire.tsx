import { useMemo } from 'react';
import { LunaticVariablesStore } from '../../src/use-lunatic/commons/variables/lunatic-variables-store.ts';
import { LunaticComponents } from './components/LunaticComponent.tsx';
import { makeInterpret } from './utils/vtl.ts';
import { type LunaticData, type LunaticSource } from '../../src';
import { Document, Page } from '@react-pdf/renderer';
import { styles } from './styles.ts';

type Props = {
	source: LunaticSource;
	data: LunaticData;
};

// Create Document Component
export const LunaticQuestionnaire = ({ source, data }: Props) => {
	const store = useMemo(
		() => LunaticVariablesStore.makeFromSource(source, data),
		[source, data]
	);
	const interpret = useMemo(() => makeInterpret(store), [store]);
	return (
		<Document pageMode="useOutlines">
			<Page size="A4" style={styles.page}>
				<LunaticComponents
					components={source.components}
					interpret={interpret}
				/>
			</Page>
		</Document>
	);
};
