import React, { useState, useEffect } from 'react';
import * as lunatic from 'components';
import { fillComponentExpressions } from '../../utils/to-expose/hooks/use-lunatic/commons';

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
	useEffect(
		function () {
			setComponentFilled(
				fillComponentExpressions(component, { executeExpression, iteration })
			);
		},
		[component, executeExpression, iteration]
	);

	if (componentType in lunatic) {
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
			/>
		);
	}
	return null;
}

export default RowComponent;
