import { LunaticComponentProps } from '../type';
import ComponentSet from './html/component-set';
import ComponentSetComponents from './html/component-set-components';
import { wrapWithDeclarations } from '../commons/hoc/wrap-with-declarations';

const WrappedComponentSet = wrapWithDeclarations(ComponentSet);

function LunaticComponentSet(props: LunaticComponentProps<'ComponentSet'>) {
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
		className,
		iteration,
	} = props;

	return (
		<WrappedComponentSet
			id={id}
			declarations={declarations}
			value={value}
			description={description}
			handleChange={handleChange}
			legendText={label}
			errors={errors}
		>
			<ComponentSetComponents
				className={className}
				components={components}
				features={features}
				errors={errors}
				value={value}
				iteration={iteration}
				executeExpression={executeExpression}
				preferences={preferences}
				management={management}
				missing={missing}
				shortcut={shortcut}
				handleChange={handleChange}
			/>
		</WrappedComponentSet>
	);
}

export default LunaticComponentSet;
