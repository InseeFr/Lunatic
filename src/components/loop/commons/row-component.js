import React, { useState, useEffect } from 'react';
import * as lunatic from 'components';
import { fillComponentExpressions } from '../../../utils/to-expose/hooks/use-lunatic/commons';

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
	iteration,
	executeExpression,
}) {
	const { componentType } = component;
	const [componentFilled, setComponentFilled] = useState(component);
	const Component = lunatic[componentType];
	const [filled, setFilled] = useState(false);

	useEffect(
		function () {
			setComponentFilled(
				fillComponentExpressions(component, { executeExpression, iteration })
			);
			setFilled(true);
		},
		[component, executeExpression, iteration]
	);

	if (componentType in lunatic && filled) {
		return (
			<Component
				{...componentFilled}
				id={id}
				handleChange={handleChange}
				preferences={preferences}
				management={management}
				features={features}
				missing={missing}
				shortcut={shortcut}
				value={value}
				executeExpression={executeExpression}
			/>
		);
	}
	return null;
}

export default RowComponent;
