import type { LunaticComponentProps } from '../types.ts';
import { ValueWithLabel } from './ValueWithLabel.tsx';
import { Text, View } from '@react-pdf/renderer';
import { styles } from '../styles.ts';

type Props = LunaticComponentProps<'CheckboxGroup'>;

export function CheckboxGroup({ interpret, label, responses }: Props) {
	return (
		<ValueWithLabel label={interpret(label)}>
			<View>
				{responses
					.filter((r) => interpret(r.response.name))
					.map((r, k) => (
						<Text style={styles.answer} key={k}>
							- {interpret(r.label)}
						</Text>
					))}
			</View>
		</ValueWithLabel>
	);
}
