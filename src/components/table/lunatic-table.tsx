import { Table, Tbody, Td, Tr } from '../commons/components/html-table';
import LunaticComponent from '../commons/components/lunatic-component-with-label';
import type { LunaticComponentProps } from '../type';
import { Errors } from '../commons';
import { LunaticComponents } from '../lunatic-components';
import { TableHeader } from './table-header';
import { getComponentErrors } from '../commons/components/errors/errors';

export function LunaticTable(props: LunaticComponentProps<'Table'>) {
	const {
		id,
		handleChange,
		body,
		header,
		errors,
		missing,
		declarations,
		missingResponse,
		management,
		description,
		label,
	} = props;

	return (
		<LunaticComponent
			id={id}
			label={label}
			declarations={declarations}
			missing={missing}
			missingResponse={missingResponse}
			management={management}
			description={description}
			handleChange={handleChange}
		>
			<Table id={id}>
				<TableHeader id={id} header={header} />
				<Tbody>
					{body.map((row, rowIndex) => (
						<Tr id={id} row={rowIndex} key={rowIndex}>
							<LunaticComponents
								components={row}
								wrapper={({ children, index }) => (
									<Td id={id} row={rowIndex} index={index}>
										{children}
									</Td>
								)}
							/>
						</Tr>
					))}
				</Tbody>
			</Table>
			<Errors errors={getComponentErrors(errors, id)} />
		</LunaticComponent>
	);
}

export default LunaticTable;
