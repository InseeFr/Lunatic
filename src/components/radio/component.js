import React from 'react';
import { ListDeclarationsWrapper } from '../declarations/wrappers';
import { areEqual } from '../../utils/lib';
import './radio.scss';

const Radio = (props) => <ListDeclarationsWrapper type="radio" {...props} />;

export default React.memo(Radio, areEqual);
