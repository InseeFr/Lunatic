import type { LunaticComponentProps } from '../types.ts';
import { ValueWithLabel } from './ValueWithLabel.tsx';
import { Text } from '@react-pdf/renderer';
import { styles } from '../styles.ts';

type Props = LunaticComponentProps<'CheckboxBoolean'>;

export function CheckboxBoolean({ interpret, label, response }: Props) {
	return (
		<ValueWithLabel label={interpret(label)}>
			<Text style={styles.answer}>
				{interpret(response.name) ? 'Oui' : 'Non'}
			</Text>
		</ValueWithLabel>
	);
}
