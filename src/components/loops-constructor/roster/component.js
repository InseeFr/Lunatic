import React from 'react';
import LoopConstructorWrapper from '../wrapper';
import * as U from '../../../utils/lib';

const RosterForLoop = (props) => <LoopConstructorWrapper {...props} />;

export default React.memo(RosterForLoop, U.areEqual);
