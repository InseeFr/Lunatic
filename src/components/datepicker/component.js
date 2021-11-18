import React from 'react';
import PropTypes from 'prop-types';
import componentWrapper from '../component-wrapper';
import { InputDeclarationsWrapper } from '../declarations/wrappers';
import { areEqual } from '../../utils/lib';
import { getTypeControls } from '../component-wrapper/controls/validators';
import './datepicker.scss';

const Datepicker = (props) => {
	const { max } = props;
	return (
		<InputDeclarationsWrapper
			type="date"
			roleType="datepicker"
			{...props}
			validators={[getTypeControls]}
			max={max || '1979-12-31'}
		/>
	);
};

Datepicker.defaultProps = {
	validators: [],
};

Datepicker.propTypes = {
	validators: PropTypes.arrayOf(PropTypes.func),
};

export default componentWrapper(React.memo(Datepicker, areEqual));
