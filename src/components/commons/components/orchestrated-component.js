import React from 'react';
import * as lunatic from '../../../components';
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
	errors,
}) {
	const { componentType } = component;

	const componentFilled = fillComponentExpressions(component, {
		executeExpression,
		pager: { iteration, linksIterations },
	});

	const Component = lunatic[componentType];
	const { conditionFilter } = componentFilled;
	const hasToBeDisplay = conditionFilter !== undefined ? conditionFilter : true;

	if (componentType in lunatic && hasToBeDisplay) {
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
				errors={errors}
			/>
		);
	}
	return null;
}

export default OrchestratedComponent;
