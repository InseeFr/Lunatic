import LunaticComponentWithoutLabel from '../commons/components/lunatic-component-without-label';
import type { LunaticComponentProps } from '../type';
import { LunaticComponents } from '../lunatic-components';
import { ComponentSet } from './html/component-set';
import { ComponentSetWrapper } from './html/component-set-wrapper';

export function LunaticComponentSet({
	id,
	label,
	declarations,
	description,
	response, // Do not propagate the response (it's undefined)
	components,
	...props // Props to propagate to children
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
				<LunaticComponents
					components={components}
					// Component props take precedence (we don't want to override value for instance)
					componentProps={(c) => ({ ...props, ...c })}
					wrapper={(p) => <ComponentSetWrapper {...p} />}
				/>
			</ComponentSet>
		</LunaticComponentWithoutLabel>
	);
}
