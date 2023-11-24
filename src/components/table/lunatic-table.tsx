import { Errors } from '../commons';
import { getComponentErrors } from '../commons/components/errors/errors';
import { Table, Tbody, Td, Tr } from '../commons/components/html-table';
import LunaticComponent from '../commons/components/lunatic-component-with-label';
import { LunaticComponents } from '../lunatic-components';
import type { LunaticComponentProps } from '../type';
import { TableHeader } from './table-header';

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
					{body.map((row, rowIndex) => {
						return (
							<Tr id={id} row={rowIndex} key={rowIndex}>
								<LunaticComponents
									components={row}
									wrapper={({ children, index, colspan, rowspan }) => (
										<Td
											id={id}
											row={rowIndex}
											index={index}
											colSpan={colspan}
											rowSpan={rowspan}
										>
											{children}
										</Td>
									)}
								/>
							</Tr>
						);
					})}
				</Tbody>
			</Table>
			<Errors errors={getComponentErrors(errors, id)} />
		</LunaticComponent>
	);
}

export default LunaticTable;
