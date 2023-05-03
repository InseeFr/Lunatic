import React from 'react';
import { OrchestratedComponent } from '../../commons';
import ComponentSetComponentContainer from './component-set-component-container';

function getComponentValue(component, value) {
	const { response } = component;

	if (response && response.name in value) {
		return value[response.name] ?? '';
	}
	return undefined;
}

function ComponentSetComponents({
	components,
	value,
	features,
	missing,
	shortcut,
	management,
	preferences,
	executeExpression,
	errors,
	classNames,
	handleChange,
}) {
	if (!Array.isArray(components)) {
		return null;
	}
	return (
		<>
			{components.map((component) => {
				const { id } = component;
				let componentValue = getComponentValue(component, value);
				return (
					<ComponentSetComponentContainer className={classNames} key={id}>
						<OrchestratedComponent
							component={component}
							features={features}
							missing={missing}
							shortcut={shortcut}
							management={management}
							value={componentValue}
							id={id}
							preferences={preferences}
							executeExpression={executeExpression}
							errors={errors}
							handleChange={handleChange}
						/>
					</ComponentSetComponentContainer>
				);
			})}
		</>
	);
}

export default ComponentSetComponents;
