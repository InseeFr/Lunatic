import { OrchestratedComponent } from '../../commons';
import ComponentSetComponentContainer from './component-set-component-container';
import { LunaticComponentProps } from '../../type';
import { getComponentValue } from '../../../utils/get-component-value';

type Props = {
	className?: string;
	componentClassName?: string;
} & Omit<LunaticComponentProps<'ComponentSet'>, 'id' | 'response'>;

function ComponentSetComponents({
	components,
	componentClassName,
	className,
	value: valueMap,
	executeExpression,
	...props
}: Props) {
	if (!Array.isArray(components)) {
		return null;
	}
	return (
		<>
			{components.map((component) => (
				<ComponentSetComponentContainer
					className={className}
					key={component.id}
					executeExpression={executeExpression}
					conditionFilter={component.conditionFilter}
				>
					<OrchestratedComponent
						{...props}
						executeExpression={executeExpression}
						component={component}
						id={component.id}
						className={componentClassName}
						value={getComponentValue(component, valueMap)}
					/>
				</ComponentSetComponentContainer>
			))}
		</>
	);
}

export default ComponentSetComponents;
