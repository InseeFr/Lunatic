import type { LunaticComponentProps } from '../types.ts';
import { ValueWithLabel } from './ValueWithLabel.tsx';
import { Text } from '@react-pdf/renderer';
import { styles } from '../styles.ts';

type Props = LunaticComponentProps<'Radio'>;

export function Radio({ interpret, label, response, options }: Props) {
	const value = interpret(response.name);
	const selectedOption = options.find((o) => o.value === value);

	return (
		<ValueWithLabel label={interpret(label)}>
			<Text style={styles.answer}>
				{value} -{' '}
				{selectedOption
					? interpret(selectedOption.label)
					: 'Aucune option sélectionnée'}
			</Text>
		</ValueWithLabel>
	);
}
