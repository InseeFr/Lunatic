import React from 'react';
import PropTypes from 'prop-types';
import missingWrapper from '../missing-wrapper';
import { InputDeclarationsWrapper } from '../declarations/wrappers';
import { areEqual } from '../../utils/lib';
import './input.scss';

const InputNumber = ({ numberAsTextfield, ...props }) => {
	const { min, max, validators } = props;
	return (
		<InputDeclarationsWrapper
			type={numberAsTextfield ? 'text' : 'number'}
			roleType="input"
			{...props}
			validators={[minMaxValidator({ min, max }), ...validators]}
			isInputNumber
			numberAsTextfield
		/>
	);
};

const minMaxValidator =
	({ min, max }) =>
	(value) => {
		if (!value) {
			return undefined;
		}
		const valueNumber = Number(value);
		if (!min && isDef(max) && valueNumber > max)
			return <span>{`La valeur doit être inférieure à ${max}`}</span>;
		else if (isDef(min) && !max && valueNumber < min)
			return <span>{`La valeur doit être supérieure à ${min}`}</span>;
		else if (
			isDef(min) &&
			isDef(max) &&
			(valueNumber < min || valueNumber > max)
		)
			return (
				<span>{`La valeur doit être comprise entre ${min} et ${max}`}</span>
			);
		return undefined;
	};

const isDef = (number) => number || number === 0;

InputNumber.defaultProps = {
	validators: [],
};

InputNumber.propTypes = {
	validators: PropTypes.arrayOf(PropTypes.func),
};

export default missingWrapper(React.memo(InputNumber, areEqual));
