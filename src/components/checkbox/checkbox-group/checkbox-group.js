import React, { useCallback } from 'react';
import { createCustomizableLunaticField } from '../../commons';
import { CheckboxOption } from '../commons';
import Fieldset from '../../commons/components/fieldset';
import { Errors } from '../../commons';
import './checkbox.scss';
import PropTypes from 'prop-types';

function CheckBoxOptionWrapper({
	checkboxId,
	labelId,
	checked,
	onKeyDown,
	onClick,
	label,
}) {
	const onClickOption = useCallback(
		function () {
			if (typeof onClick === 'function') {
				onClick(checked === undefined ? false : checked);
			}
		},
		[onClick, checked]
	);

	return (
		<CheckboxOption
			id={checkboxId}
			labelledBy={labelId}
			checked={checked}
			onClick={onClickOption}
			onKeyDown={onKeyDown}
			label={label}
		/>
	);
}

function CheckboxGroupContainer({ children }) {
	return <div className="lunatic-checkbox-group-option">{children}</div>;
}

function CheckboxGroupContent({ options, id, onChange }) {
	return options.map(function (option) {
		const { label, checked, name, onClick } = option;

		const checkboxId = `lunatic-checkbox-${id}-${name}`;
		const labelId = `lunatic-checkbox-label-${id}-${name}`;

		return (
			<CheckboxGroupContainer key={checkboxId}>
				<CheckBoxOptionWrapper
					checkboxId={checkboxId}
					labelId={labelId}
					checked={checked}
					onKeyDown={onChange}
					onClick={onClick}
					label={label}
				/>
			</CheckboxGroupContainer>
		);
	});
}

function CheckboxGroup({
	options,
	id,
	onChange,
	label,
	custom,
	description,
	errors,
}) {
	return (
		<Fieldset legend={label} custom={custom} description={description}>
			<CheckboxGroupContent id={id} onChange={onChange} options={options} />
			<Errors errors={errors} activeId={id} />
		</Fieldset>
	);
}

CheckboxGroup.propTypes = {
	options: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
				.isRequired,
			onClick: PropTypes.func.isRequired,
		})
	),
};

CheckboxGroup.defaultProps = { options: [] };

export default createCustomizableLunaticField(CheckboxGroup, 'CheckboxGroup');
