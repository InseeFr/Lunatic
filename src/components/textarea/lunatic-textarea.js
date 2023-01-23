import React from 'react';
import PropTypes from 'prop-types';
import LunaticComponent from '../commons/components/lunatic-component-without-label';
import useOnHandleChange from '../commons/use-on-handle-change';
import Textarea from './html/textarea';

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
			/>
		</LunaticComponent>
	);
};

LunaticTextarea.defaultProps = {
	rows: 1,
	maxLength: 100,
	cols: 32,
	placeholder: 'Please enter your text here',
};

LunaticTextarea.propTypes = {
	rows: PropTypes.number,
	maxLength: PropTypes.number,
	cols: PropTypes.number,
	placeholder: PropTypes.string,
};

export default LunaticTextarea;
