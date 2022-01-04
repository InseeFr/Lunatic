import React from 'react';
import { storiesOf } from '@storybook/react';
import CrossIcon from '../../utils/icons/cross.icon';
import ClosedIcon from '../../utils/icons/closed.icon';
import OpenedIcon from '../../utils/icons/opened.icon';
import LoadIcon from '../../utils/icons/load.icon';
import NetworkIcon from '../../utils/icons/network.icon';
import OnDragIcon from '../../utils/icons/on-drag.icon';
import RadioChecked from '../../utils/icons/radio-checked.icon';
import RadioUnchecked from '../../utils/icons/radio-unchecked.icon';
import CheckboxChecked from '../../utils/icons/checkbox-checked.icon';
import CheckboxUnchecked from '../../utils/icons/checkbox-unchecked.icon';

storiesOf('Icons', module)
	.add('cross', () => <CrossIcon />)
	.add('opened', () => <OpenedIcon />)
	.add('closed', () => <ClosedIcon />)
	.add('load', () => <LoadIcon />)
	.add('network', () => <NetworkIcon />)
	.add('on-drag', () => <OnDragIcon />)
	.add('radio-unchecked', () => <RadioChecked />)
	.add('radio-checked', () => <RadioUnchecked />)
	.add('checkbox-checked', () => <CheckboxChecked />)
	.add('checkbox-unchecked', () => <CheckboxUnchecked />);
