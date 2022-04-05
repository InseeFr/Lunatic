import React from 'react';
import Label from '../label';
import FieldContainer from '../field-container';
import VariableResponse from '../variable-status';
import {
	DeclarationsBeforeText,
	DeclarationsAfterText,
	DeclarationsDetachable,
} from '../../../declarations';
import safetyLabel from '../../safety-label';

function createLunaticComponent(HtmlComponent) {
	return function LunaticComponent(props) {
		const {
			id,
			label,
			labelId,
			custom,
			contentId,
			preferences,
			declarations,
			className,
			value,
		} = props;
		return (
			<VariableResponse>
				<DeclarationsBeforeText declarations={declarations} custom={custom} />
				<Label
					id={labelId}
					htmlFor={contentId}
					className={className}
					custom={custom}
				>
					{safetyLabel(label, id)}
				</Label>
				<DeclarationsAfterText declarations={declarations} custom={custom} />
				<FieldContainer
					value={value}
					id={id}
					custom={custom}
					preferences={preferences}
				>
					<HtmlComponent {...props} />
				</FieldContainer>
				<DeclarationsDetachable declarations={declarations} custom={custom} />
			</VariableResponse>
		);
	};
}

export default createLunaticComponent;
