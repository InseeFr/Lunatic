import './radio-group.scss';

import {
	Errors,
	Fieldset,
	createCustomizableLunaticField,
	useOptionsKeydown,
} from '../../commons';

import PropTypes from 'prop-types';
import RadioGroupContent from './radio-group-content';
import React from 'react';

function RadioGroup({
	options,
	value,
	id,
	label,
	description,
	onSelect,
	checkboxStyle = false,
	errors,
	className,
	shortcut,
	autofocus,
}) {
	const onKeyDown = useOptionsKeydown(options, onSelect);

	return (
		<Fieldset className={className} legend={label} description={description}>
			<RadioGroupContent
				id={id}
				onClick={onSelect}
				value={value}
				onKeyDown={onKeyDown}
				checkboxStyle={checkboxStyle}
				label={label}
				options={options}
				shortcut={shortcut}
				autofocus={autofocus}
			/>
			<Errors errors={errors} activeId={id} />
		</Fieldset>
	);
}

RadioGroup.propTypes = {
	options: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
			description: PropTypes.oneOfType([
				PropTypes.string,
				PropTypes.element,
				PropTypes.array,
			]),
			value: PropTypes.oneOfType([
				PropTypes.string,
				PropTypes.number,
				PropTypes.bool,
			]),
		})
	),
	id: PropTypes.string.isRequired,
	onSelect: PropTypes.func.isRequired,
	label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.bool,
		PropTypes.array,
	]),
	className: PropTypes.string,
	errors: PropTypes.object,
	shortcut: PropTypes.bool,
	autofocus: PropTypes.bool,
};

RadioGroup.defaultProps = {
	errors: undefined,
	value: undefined,
	label: undefined,
	className: undefined,
	autofocus: false,
};

export default createCustomizableLunaticField(RadioGroup, 'Radio');
