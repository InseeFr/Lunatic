import React from 'react';
import PropTypes from 'prop-types';
import componentWrapper from '../component-wrapper';
import { InputDeclarationsWrapper } from '../declarations/wrappers';
import { areEqual } from '../../utils/lib';
import { getTypeControls } from '../component-wrapper/controls/validators';
import './input.scss';

const InputNumber = ({ numberAsTextfield, ...props }) => (
	<InputDeclarationsWrapper
		type={numberAsTextfield ? 'text' : 'number'}
		roleType="input"
		{...props}
		isInputNumber
		numberAsTextfield
		validators={[getTypeControls]}
	/>
);

InputNumber.defaultProps = {
	validators: [],
};

InputNumber.propTypes = {
	validators: PropTypes.arrayOf(PropTypes.func),
};

export default componentWrapper(React.memo(InputNumber, areEqual));
