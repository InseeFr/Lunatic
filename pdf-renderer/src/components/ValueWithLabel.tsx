import type { PropsWithChildren, ReactNode } from 'react';
import { Text, View } from '@react-pdf/renderer';
import { depth, styles } from '../styles.ts';

type Props = PropsWithChildren<{
	label: ReactNode;
}>;
export function ValueWithLabel({ label, children }: Props) {
	if (!label) {
		return children;
	}
	if (depth.current === 2) {
		return (
			<View style={styles.question1} wrap={false}>
				<View style={[styles.question1, styles.question]} wrap={false}>
					<Text style={styles.label}>{label}</Text>
					{children}
				</View>
			</View>
		);
	}
	return (
		<View style={[styles.question, styles.question1]} wrap={false}>
			<Text style={styles.label}>{label}</Text>
			{children}
		</View>
	);
}
