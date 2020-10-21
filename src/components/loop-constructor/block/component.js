import React from 'react';
import LoopConstructorWrapper from '../wrapper';
import * as U from '../../../utils/lib';

const BlockForLoop = (props) => <LoopConstructorWrapper {...props} />;

export default React.memo(BlockForLoop, U.areEqual);
