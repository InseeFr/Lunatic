import { OrchestratedComponent } from '../../commons';
import ComponentSetComponentContainer from './component-set-component-container';
import { LunaticComponentProps } from '../../type';
import {
	ComponentWithResponses,
	getComponentValue,
} from '../../../utils/get-component-value';

type Props = {
	className?: string;
	componentClassName?: string;
} & Omit<LunaticComponentProps<'ComponentSet'>, 'id' | 'response'>;

function ComponentSetComponents({
	components,
	componentClassName,
	className,
	value: valueMap,
	...props
}: Props) {
	if (!Array.isArray(components)) {
		return null;
	}
	return (
		<>
			{components.map((component) => {
				const { id } = component;
				let componentValue = getComponentValue(
					component as ComponentWithResponses,
					valueMap
				);
				return (
					<ComponentSetComponentContainer className={className} key={id}>
						<OrchestratedComponent
							{...props}
							component={component}
							id={id}
							className={componentClassName}
							value={componentValue}
						/>
					</ComponentSetComponentContainer>
				);
			})}
		</>
	);
}

export default ComponentSetComponents;
