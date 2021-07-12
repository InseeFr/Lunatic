import React from 'react';
import { storiesOf } from '@storybook/react';
import CrossIcon from '../../utils/icons/cross.icon';
import ClosedIcon from '../../utils/icons/closed.icon';
import OpenedIcon from '../../utils/icons/opened.icon';
import LoadIcon from '../../utils/icons/load.icon';
import NetworkIcon from '../../utils/icons/network.icon';

storiesOf('Icons', module)
	.add('cross', () => <CrossIcon />)
	.add('opened', () => <OpenedIcon />)
	.add('closed', () => <ClosedIcon />)
	.add('load', () => <LoadIcon />)
	.add('network', () => <NetworkIcon />);
