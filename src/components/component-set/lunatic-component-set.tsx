import LunaticComponentWithoutLabel from '../commons/components/lunatic-component-without-label';
import { LunaticComponentProps } from '../type';
import ComponentSet from './html/component-set';
import ComponentSetComponents from './html/component-set-components';

export type getSuggesterStatusType = Pick<
	LunaticComponentProps<'Suggester'>,
	'getSuggesterStatus'
>;

function LunaticComponentSet(
	props: LunaticComponentProps<'ComponentSet'> & getSuggesterStatusType
) {
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
		disabled,
		getSuggesterStatus,
	} = props;
	return (
		<LunaticComponentWithoutLabel
			id={id}
			preferences={preferences}
			declarations={declarations}
			value={value}
			missing={missing}
			management={management}
			description={description}
			handleChange={handleChange}
		>
			<ComponentSet id={id} legendText={label} errors={errors}>
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
					getSuggesterStatus={getSuggesterStatus}
					disabled={disabled}
				/>
			</ComponentSet>
		</LunaticComponentWithoutLabel>
	);
}

export default LunaticComponentSet;
