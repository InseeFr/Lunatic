import PropTypes from 'prop-types';
import useOnHandleChange from '../commons/use-on-handle-change';
import Textarea from './html/textarea';
import { LunaticComponentProps } from '../type';
import { wrapWithDeclarations } from '../commons/hoc/wrap-with-declarations';

const WrappedTextarea = wrapWithDeclarations(Textarea);

const LunaticTextarea = (props: LunaticComponentProps<'Textarea'>) => {
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
		<WrappedTextarea
			declarations={declarations}
			missingResponse={missingResponse}
			description={description}
			handleChange={handleChange}
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
