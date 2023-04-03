import { FunctionComponent, memo } from 'react';

export function displayLabelOrInput<T extends Record<string, unknown>>(
	Field: FunctionComponent<T>,
	name: string
) {
	const Memoized = memo<T>(Field);

	return function LabelOrInput(props: T) {
		const { editable, expanded } = props;

		const displayLabel = !editable || !expanded;

		if (
			(name === 'Input' && !displayLabel) ||
			(name === 'LabelSelection' && displayLabel)
		) {
			return <Memoized {...props} />;
		}

		return null;
	};
}
