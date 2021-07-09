import React from 'react';
import { storiesOf } from '@storybook/react';
import CrossIcon from '../../utils/icons/cross.icon';
import ClosedIcon from '../../utils/icons/closed.icon';
import OpenedIcon from '../../utils/icons/opened.icon';

storiesOf('Icons', module)
	.add('cross', () => <CrossIcon />)
	.add('opened', () => <OpenedIcon />)
	.add('closed', () => <ClosedIcon />);
