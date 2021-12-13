import React from 'react';
import componentWrapper from '../../component-wrapper';
import LoopConstructorWrapper from '../wrapper';
import * as U from '../../../utils/lib';
import './block.scss';

const BlockForLoop = (props) => <LoopConstructorWrapper {...props} />;

export default componentWrapper(React.memo(BlockForLoop), U.areEqual);
