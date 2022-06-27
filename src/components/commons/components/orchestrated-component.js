import React, { useState, useEffect } from 'react';
import * as lunatic from 'components';
import { fillComponentExpressions } from '../../../use-lunatic/commons';

function OrchestratedComponent({
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
	linksIterations,
	executeExpression,
	custom,
}) {
	const { componentType } = component;
	const componentFilled = fillComponentExpressions(component, {
		executeExpression,
		pager: { iteration, linksIterations },
	});
	const Component = lunatic[componentType];

	const isFiltered = componentFilled?.conditionFilter;

	if (componentType in lunatic && isFiltered) {
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
				custom={custom}
			/>
		);
	}
	return null;
}

export default OrchestratedComponent;
