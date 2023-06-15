import React, {
	ComponentProps,
	ComponentType,
	FunctionComponent,
	ReactElement,
	ReactNode,
} from 'react';
import {
	DECLARATION_POSITIONS,
	DeclarationsBeforeText,
	DeclarationsDetachable,
} from '../../declarations';
import { QuestionContext, QuestionInformation } from '../../questions';
import FieldContainer from '../components/field-container';
import Missing from '../components/missing';
import { LunaticBaseProps } from '../../type';

type ExtendedProps<
	T extends { description?: LunaticBaseProps['description'] }
> = Pick<
	LunaticBaseProps<any>,
	| 'description'
	| 'value'
	| 'declarations'
	| 'questionContext'
	| 'questionInformation'
	| 'id'
> &
	T &
	ComponentProps<typeof Missing>;

/**
 * Wrap the component with declarations
 * and inject the after declaration as a "description" prop
 */
export const wrapWithDeclarations =
	<T extends { description?: ReactNode }>(Component: ComponentType<T>) =>
	(props: ExtendedProps<T>) => {
		const {
			declarations,
			description,
			id,
			questionContext,
			questionInformation,
			handleChange,
		} = props;
		const descriptionProps = getDescription({ declarations, description });
		return (
			<>
				<DeclarationsBeforeText declarations={declarations} id={id} />
				<QuestionContext text={questionContext} />
				<FieldContainer>
					<Component {...props} description={descriptionProps} />
					<QuestionInformation text={questionInformation} />
				</FieldContainer>
				<DeclarationsDetachable declarations={declarations} id={props.id} />
				<Missing {...props} handleChange={handleChange} />
			</>
		);
	};

function getDescription({
	declarations,
	description,
}: Pick<LunaticBaseProps, 'declarations' | 'description'>) {
	if (Array.isArray(declarations)) {
		return declarations.filter(
			(declaration) => declaration.position === DECLARATION_POSITIONS.after
		);
	}

	return description;
}
