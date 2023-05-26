import {
	DeclarationsBeforeText,
	DeclarationsDetachable,
	DECLARATION_POSITIONS,
} from '../../declarations';

import FieldContainer from './field-container';
import Missing from './missing';
import React, { ReactElement } from 'react';
import VariableStatus from './variable-status';
import { LunaticBaseProps } from '../../type';
import { QuestionContext, QuestionInformation } from '../../questions';

type Props = {
	children: ReactElement;
	componentType?: string;
	paginatedLoop?: boolean;
	handleChange: (
		response: { name: string },
		value: any,
		args?: Record<string, unknown>
	) => void;
} & Pick<
	LunaticBaseProps,
	| 'description'
	| 'declarations'
	| 'management'
	| 'id'
	| 'label'
	| 'missingResponse'
	| 'preferences'
	| 'value'
	| 'missing'
	| 'questionContext'
	| 'questionInformation'
>;

function LunaticComponent(props: Props) {
	const {
		id,
		declarations,
		children,
		management,
		description,
		handleChange,
		questionContext,
		questionInformation,
	} = props;
	const content = (
		<>
			<DeclarationsBeforeText declarations={declarations} id={id} />
			<QuestionContext text={questionContext} />
			<FieldContainer>
				{React.cloneElement(children, {
					description: getDescription({ declarations, description }),
				})}
				<QuestionInformation text={questionInformation} />
			</FieldContainer>
			<DeclarationsDetachable declarations={declarations} id={id} />
			<Missing {...props} handleChange={handleChange} />
		</>
	);
	return management ? <VariableStatus>{content}</VariableStatus> : content;
}

function getDescription({
	declarations,
	description,
}: {
	declarations: LunaticBaseProps['declarations'];
	description: LunaticBaseProps['description'];
}) {
	if (Array.isArray(declarations)) {
		return declarations.filter(
			(declaration) => declaration.position === DECLARATION_POSITIONS.after
		);
	}

	return description;
}

export default LunaticComponent;
