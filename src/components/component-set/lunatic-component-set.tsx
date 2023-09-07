import LunaticComponentWithoutLabel from '../commons/components/lunatic-component-without-label';
import type { LunaticComponentProps } from '../type';
import ComponentSet from './html/component-set';
import ComponentSetComponents from './html/component-set-components';

function LunaticComponentSet({
	id,
	label,
	declarations,
	description,
	response, // Do not propagate the response (it's undefined)
	...props // These props will be sent down to children components
}: LunaticComponentProps<'ComponentSet'>) {
	return (
		<LunaticComponentWithoutLabel
			id={id}
			declarations={declarations}
			description={description}
			preferences={props.preferences}
			value={props.value}
			missing={props.missing}
			management={props.management}
			handleChange={props.handleChange}
		>
			<ComponentSet id={id} legendText={label} errors={props.errors}>
				<ComponentSetComponents {...props} />
			</ComponentSet>
		</LunaticComponentWithoutLabel>
	);
}

export default LunaticComponentSet;
