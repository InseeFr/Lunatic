import type { LunaticComponentProps } from '../types.ts';
import { Text, View } from '@react-pdf/renderer';
import { styles } from '../styles.ts';

type Props = PropsWithChildren<
	LunaticComponentProps<'Sequence' | 'Subsequence'>
>;

export function Sequence({ interpret, label, componentType, children }: Props) {
	const text = interpret(label);
	const textStyle = componentType === 'Sequence' ? styles.h1 : styles.h2;

	return (
		<View bookmark={{ title: text, fit: true, expanded: false }}>
			<Text style={textStyle}>{text}</Text>
			<View style={styles.sequence}>{children}</View>
		</View>
	);
}
