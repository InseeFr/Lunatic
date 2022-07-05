import React from 'react';

function displayLabelOrInput(Field) {
	const Memoized = React.memo(Field);
	const { name } = Field;
	console.log({ name });
	return function LabelOrInput(props) {
		const { editable, expended } = props;

		const displayLabel = !editable || !expended;

		if (
			(name === 'Input' && !displayLabel) ||
			(name === 'LabelSelection' && displayLabel)
		) {
			return <Memoized {...props} />;
		}

		return null;
	};
}

export default displayLabelOrInput;
