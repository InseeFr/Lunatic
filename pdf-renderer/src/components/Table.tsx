import type { LunaticComponentProps } from '../types.ts';
import { ValueWithLabel } from './ValueWithLabel.tsx';
import { ErrorBoundary } from 'react-error-boundary';
import { LunaticComponent } from './LunaticComponent.tsx';

import { Table as PDFTable, TR, TD } from '@ag-media/react-pdf-table';
import { Text } from '@react-pdf/renderer';
import { styles } from '../styles.ts';
type Props = LunaticComponentProps<'Table'>;

export function Table({ interpret, label, body }: Props) {
	return (
		<ValueWithLabel label={interpret(label)}>
			<PDFTable class={styles.table}>
				{body.map((row, y) => (
					<TR key={y}>
						{row.map((col, x) => (
							<TD key={x} style={styles.td}>
								{'componentType' in col ? (
									<ErrorBoundary
										fallback={<article>Error {col.componentType}</article>}
										key={x}
									>
										<LunaticComponent interpret={interpret} component={col} />
									</ErrorBoundary>
								) : (
									<Text style={styles.answer}>{interpret(col.label)}</Text>
								)}
							</TD>
						))}
					</TR>
				))}
			</PDFTable>
		</ValueWithLabel>
	);
}
