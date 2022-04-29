import React from 'react';

function displayLabelOrInput(Field) {
	const Memoized = React.memo(Field);
	const { name } = Field;

	return function LabelOrInput(props) {
		const { editable, expended } = props;

		const displayLabel = !editable || !expended;

		if (
			(name === 'Input' && !displayLabel) ||
			(name === 'Label' && displayLabel)
		) {
			return <Memoized {...props} />;
		}

		return null;
	};
}

export default displayLabelOrInput;
