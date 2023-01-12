import React from 'react';
import PropTypes from 'prop-types';
import RadioOption from './radio-option';
import Fieldset from '../commons/components/fieldset';
import { Errors } from '../commons';
import { useOptionsKeydown, createCustomizableLunaticField } from '../commons';

function RadioGroupContent({
	options,
	value,
	id,
	onClick,
	checkboxStyle = false,
	custom,
}) {
	const onKeyDown = useOptionsKeydown(options, onClick);
	return options.map(function (option, index) {
		const { value: valueOption, label } = option;
		const radioId = `lunatic-radio-${id}-${valueOption}`;

		return (
			<RadioOption
				key={radioId}
				id={radioId}
				index={index}
				checked={value === valueOption}
				onClick={onClick}
				value={valueOption}
				onKeyDown={onKeyDown}
				checkboxStyle={checkboxStyle}
				label={label}
				custom={custom}
			/>
		);
	});
}

function RadioGroup({
	options,
	value,
	id,
	label,
	description,
	onSelect,
	checkboxStyle = false,
	errors,
	custom,
}) {
	const onKeyDown = useOptionsKeydown(options, onSelect);

	return (
		<>
			<Fieldset legend={label} custom={custom} description={description}>
				<RadioGroupContent
					id={id}
					onClick={onSelect}
					value={value}
					onKeyDown={onKeyDown}
					checkboxStyle={checkboxStyle}
					label={label}
					options={options}
					custom={custom}
				/>
			</Fieldset>
			<Errors errors={errors} activeId={id} />
		</>
	);
}

RadioGroup.propTypes = {
	options: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
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
	errors: PropTypes.array,
};

RadioGroup.defaultProps = {
	errors: undefined,
	value: undefined,
	label: undefined,
};

export default createCustomizableLunaticField(RadioGroup, 'Radio');
