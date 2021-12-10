import React from 'react';
import componentWrapper from '../component-wrapper';
import { ListDeclarationsWrapper } from '../declarations/wrappers';
import { areEqual } from '../../utils/lib';
import './checkbox.scss';

const CheckboxOne = (props) =>
	null();
	// <ListDeclarationsWrapper type="checkbox" {...props} hasSpecificHandler />

export default componentWrapper(React.memo(CheckboxOne, areEqual));
