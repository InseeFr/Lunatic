import { useState, useEffect } from 'react';
import { Table, Tbody } from '../commons/components/html-table';
import Header from './header';
import LunaticComponent from '../commons/components/lunatic-component-without-label';
import TableOrchestrator from './table-orchestrator';
import { LunaticComponentProps } from '../type';
import { Errors } from '../commons';

function LunaticTable(props: LunaticComponentProps<'Table'>) {
	const {
		id,
		handleChange,
		value,
		body,
		header,
		executeExpression,
		iteration,
		errors,
		preferences,
		missing,
		declarations,
		missingResponse,
		management,
		description,
		label,
	} = props;
	const [nbRows, setNbRows] = useState<number>();

	useEffect(
		function () {
			if (Array.isArray(body)) {
				const { length } = body;
				setNbRows(length);
			}
		},
		[body]
	);
	return (
		<LunaticComponent
			id={id}
			preferences={preferences}
			label={label}
			declarations={declarations}
			value={value}
			missing={missing}
			missingResponse={missingResponse}
			management={management}
			description={description}
			handleChange={handleChange}
		>
			<Table id={id}>
				<Header id={id} header={header} />
				<Tbody>
					<TableOrchestrator
						id={id}
						body={body}
						executeExpression={executeExpression}
						handleChange={handleChange}
						iteration={iteration}
						value={value}
						errors={errors}
					/>
				</Tbody>
			</Table>
			<Errors errors={errors} activeId={id} />
		</LunaticComponent>
	);
}

export default LunaticTable;
