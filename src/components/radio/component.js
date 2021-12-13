import React from 'react';
import componentWrapper from '../component-wrapper';
import { ListDeclarationsWrapper } from '../declarations/wrappers';
import { areEqual } from '../../utils/lib';
import './radio.scss';

const Radio = (props) => <ListDeclarationsWrapper type="radio" {...props} />;

export default componentWrapper(React.memo(Radio, areEqual));
