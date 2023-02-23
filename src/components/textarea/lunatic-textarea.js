import D from '../../i18n';
import LunaticComponent from '../commons/components/lunatic-component-without-label';
import PropTypes from 'prop-types';
import React from 'react';
import Textarea from './html/textarea';
import useOnHandleChange from '../commons/use-on-handle-change';

const LunaticTextarea = (props) => {
	const {
		id,
		rows,
		maxLength,
		cols,
		value,
		placeHolder,
		handleChange,
		response,
		label,
		description,
		errors,
		preferences,
		declarations,
		missing,
		missingResponse,
		management,
		autofocus,
	} = props;

	const onChange = useOnHandleChange({ handleChange, response, value });

	return (
		<LunaticComponent
			id={id}
			preferences={preferences}
			declarations={declarations}
			value={value}
			missing={missing}
			missingResponse={missingResponse}
			management={management}
			description={description}
			handleChange={handleChange}
		>
			<Textarea
				id={id}
				rows={rows}
				maxLength={maxLength}
				cols={cols}
				onChange={onChange}
				value={value}
				placeholder={placeHolder}
				label={label}
				errors={errors}
				autofocus={autofocus}
			/>
		</LunaticComponent>
	);
};

LunaticTextarea.defaultProps = {
	rows: 1,
	maxLength: 100,
	cols: 32,
	placeholder: D.TEXTAREA_PLACEHOLDER,
};

LunaticTextarea.propTypes = {
	rows: PropTypes.number,
	maxLength: PropTypes.number,
	cols: PropTypes.number,
	placeholder: PropTypes.string,
};

export default LunaticTextarea;
