import React from 'react';
import { OrchestratedComponent } from '../../commons';
import classnames from 'classnames';

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
	if (Array.isArray(components)) {
		return components.map(function (component) {
			const { response, id } = component;
			let componentValue = undefined;
			if (response) {
				const { name } = response;
				if (name in value) {
					componentValue = value[name] ?? '';
				}
			}
			return (
				<div
					className={classnames(
						'lunatic-component-set-component fr-mb-2w',
						classNames
					)}
					key={id}
				>
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
				</div>
			);
		});
	}
	return null;
}

export default ComponentSetComponents;
