import React from 'react';
import PropTypes from 'prop-types';
import componentWrapper from '../component-wrapper';
import { InputDeclarationsWrapper } from '../declarations/wrappers';
import { areEqual } from '../../utils/lib';
import { getTypeControls } from '../component-wrapper/controls/validators';
import './input.scss';

const InputNumber = ({ numberAsTextfield, decimals, ...props }) => (
	<InputDeclarationsWrapper
		type={numberAsTextfield ? 'tel' : 'number'}
		roleType="input"
		{...props}
		decimals={decimals || 0}
		isInputNumber
		numberAsTextfield
		validators={[getTypeControls]}
		inputMode={decimals ? 'decimals' : 'numeric'}
	/>
);

InputNumber.defaultProps = {
	validators: [],
};

InputNumber.propTypes = {
	validators: PropTypes.arrayOf(PropTypes.func),
};

export default componentWrapper(React.memo(InputNumber, areEqual));
