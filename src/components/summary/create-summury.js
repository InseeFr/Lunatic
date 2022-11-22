import memoizee from 'memoizee';
import SummaryHtml from './summary';

const parseSource = memoizee(function (source) {
	if (typeof source === 'object') {
		const { components } = source;
		if (Array.isArray(components)) {
			return components.reduce(function (sequences, component) {
				const { componentType } = component;
				if (componentType === 'Sequence') {
					const { page, label } = component;
					return [...sequences, { page, label }];
				}
				return sequences;
			}, []);
		}
	}
	return [];
});

function fillVtl(sequences, executeExpression) {
	return sequences.map(function (sequence) {
		const { label, page } = sequence;
		return { page, label: executeExpression(label) };
	});
}

function createSummury(source, executeExpression, goToPage) {
	const sequences = fillVtl(parseSource(source), executeExpression);
	return function Summary() {
		return <SummaryHtml sequences={sequences} goToPage={goToPage} />;
	};
}

export default memoizee(createSummury);
