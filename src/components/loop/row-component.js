import React, { useCallback } from 'react';
import * as lunatic from 'components';

function RowComponent({
	id,
	component,
	handleChange,
	features,
	missing,
	shortcut,
	management,
	preferences,
	value,
	executeExpression,
	iteration,
}) {
	const { componentType } = component;
	const Component = lunatic[componentType];

	const executeExpressionWithIteration = useCallback(
		function (expression) {
			const { bindingDependencies } = component;
			return executeExpression(expression, { iteration, bindingDependencies });
		},
		[executeExpression, iteration, component]
	);
	if (componentType in lunatic) {
		return (
			<Component
				{...component}
				id={id}
				handleChange={handleChange}
				preferences={preferences}
				management={management}
				features={features}
				missing={missing}
				shortcut={shortcut}
				value={value}
				executeExpression={executeExpressionWithIteration}
			/>
		);
	}
	return null;
}

export default RowComponent;
