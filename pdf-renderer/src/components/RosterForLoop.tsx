import type { LunaticComponentProps } from '../types.ts';
import { ValueWithLabel } from './ValueWithLabel.tsx';
import { decorateInterpretIteration } from '../utils/vtl.ts';
import { LunaticComponent } from './LunaticComponent.tsx';
import { Table, TR, TD } from '@ag-media/react-pdf-table';

type Props = LunaticComponentProps<'RosterForLoop'>;

export function RosterForLoop({ interpret, label, components }: Props) {
	// There is no subcomponents for this roster for loop
	if (components.length === 0) {
		return null;
	}
	const firstComponent = components.filter((c) => 'response' in c).at(0);
	if (!firstComponent) {
		return 'Cannot find a component with a variable inside this RosterForLoop';
	}
	const firstComponentValue = interpret(firstComponent.response.name);
	if (!Array.isArray(firstComponentValue)) {
		return 'Expected an array for the value of the first component';
	}
	const iterations = firstComponentValue.length;
	return (
		<ValueWithLabel label={interpret(label)}>
			<Table>
				{Array.from({ length: iterations }).map((_, k) => {
					const interpretAtIteration = decorateInterpretIteration(interpret, [
						k,
					]);
					return (
						<TR key={k}>
							{components.map((component, j) => (
								<TD key={j}>
									<LunaticComponent
										component={component}
										interpret={interpretAtIteration}
									/>
								</TD>
							))}
						</TR>
					);
				})}
			</Table>
		</ValueWithLabel>
	);
}
