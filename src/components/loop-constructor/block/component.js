import React from 'react';
import missingWrapper from '../../missing-wrapper';
import LoopConstructorWrapper from '../wrapper';
import * as U from '../../../utils/lib';
import './block.scss';

const BlockForLoop = (props) => <LoopConstructorWrapper {...props} />;

export default missingWrapper(React.memo(BlockForLoop), U.areEqual);
