import type { LunaticComponentProps } from '../types.ts';
import { ValueWithLabel } from './ValueWithLabel.tsx';
import { Text } from '@react-pdf/renderer';
import { styles } from '../styles.ts';

type Props = LunaticComponentProps<'InputNumber'>;

export function Input({ interpret, label, response, unit }: Props) {
	return (
		<ValueWithLabel label={interpret(label)}>
			<Text style={styles.answer}>
				{interpret(response.name) ?? '__'}{' '}
				{typeof unit === 'string' ? unit : interpret(unit)}
			</Text>
		</ValueWithLabel>
	);
}
