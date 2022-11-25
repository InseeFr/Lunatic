import React from 'react';

function displayLabelOrInput(Field, name) {
	const Memoized = React.memo(Field);

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
