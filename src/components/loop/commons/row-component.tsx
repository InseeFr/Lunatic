import React, { useState, useEffect } from 'react';
import * as lunatic from '../../../components';
import { fillComponentExpressions } from '../../../use-lunatic/commons';
import { LunaticComponentDefinition } from '../../../use-lunatic/type';
import { LunaticBaseProps } from '../../type';

type Props = {
	linksIterations?: [number, number];
	component: LunaticComponentDefinition;
	features?: string[];
} & Pick<
	LunaticBaseProps,
	| 'id'
	| 'iteration'
	| 'executeExpression'
	| 'handleChange'
	| 'missing'
	| 'shortcut'
	| 'management'
	| 'preferences'
	| 'value'
	| 'errors'
>;

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
}: Props) {
	const { componentType } = component;
	const [componentFilled, setComponentFilled] = useState(component);
	const [filled, setFilled] = useState(false);

	useEffect(
		function () {
			setComponentFilled(
				fillComponentExpressions(component, {
					executeExpression,
					pager: { iteration },
				})
			);
			setFilled(true);
		},
		[component, executeExpression, iteration]
	);

	if (componentType in lunatic && filled) {
		const Component = (lunatic as any)[componentType]; // This is too dynamic, orchestration has no way to check props
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
