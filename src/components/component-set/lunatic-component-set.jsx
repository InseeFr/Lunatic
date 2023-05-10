import React from 'react';
import LunaticComponent from '../commons/components/lunatic-component-without-label';
import ComponentSet from './html/component-set';
import ComponentSetComponents from './html/component-set-components';

function LunaticComponentSet(props) {
	const {
		declarations,
		label,
		id,
		components,
		value,
		executeExpression,
		shortcut,
		management,
		missing,
		features,
		preferences,
		errors,
		description,
		handleChange,
	} = props;

	return (
		<LunaticComponent
			id={id}
			preferences={preferences}
			declarations={declarations}
			value={value}
			missing={missing}
			management={management}
			description={description}
			components={components}
			executeExpression={executeExpression}
			shortcut={shortcut}
			features={features}
			handleChange={handleChange}
		>
			<ComponentSet
				id={id}
				legendText={label}
				errors={errors}
				components={components}
				value={value}
				features={features}
				executeExpression={executeExpression}
				preferences={preferences}
				management={management}
				missing={missing}
				shortcut={shortcut}
			>
				<ComponentSetComponents
					components={components}
					features={features}
					errors={errors}
					value={value}
					executeExpression={executeExpression}
					preferences={preferences}
					management={management}
					missing={missing}
					shortcut={shortcut}
					handleChange={handleChange}
				/>
			</ComponentSet>
		</LunaticComponent>
	);
}

export default LunaticComponentSet;
