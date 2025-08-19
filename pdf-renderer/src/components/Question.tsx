import type { LunaticComponentProps } from '../types.ts';
import { LunaticComponent } from './LunaticComponent.tsx';
import { ValueWithLabel } from './ValueWithLabel.tsx';

type Props = LunaticComponentProps<'Question'>;

export function Question({ interpret, label, components }: Props) {
	return (
		<ValueWithLabel label={interpret(label)}>
			{components.map((component, k) => (
				<LunaticComponent key={k} component={component} interpret={interpret} />
			))}
		</ValueWithLabel>
	);
}
