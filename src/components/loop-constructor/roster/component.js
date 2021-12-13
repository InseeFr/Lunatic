import React from 'react';
import componentWrapper from '../../component-wrapper';
import LoopConstructorWrapper from '../wrapper';
import * as U from '../../../utils/lib';

const RosterForLoop = (props) => <LoopConstructorWrapper {...props} />;

export default componentWrapper(React.memo(RosterForLoop), U.areEqual);
