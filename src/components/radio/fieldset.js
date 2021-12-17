import React from 'react';

function Fieldset({
	children,
	legend,
	executeExpression,
	bindingDependencies,
	iteration,
}) {
	const legendCompute = executeExpression(legend, {
		bindingDependencies,
		iteration,
	});

	return (
		<fieldset>
			<legend>{legendCompute}</legend>
			{children}
		</fieldset>
	);
}

export default Fieldset;
