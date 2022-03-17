import React from 'react';
import { storiesOf } from '@storybook/react';
import { ICONS } from 'components';

storiesOf('Icons', module)
	.add('cross', () => <ICONS.CrossIcon />)
	.add('opened', () => <ICONS.OpenedIcon />)
	.add('closed', () => <ICONS.ClosedIcon />)
	.add('load', () => <ICONS.LoadIcon />)
	.add('network', () => <ICONS.NetworkIcon />)
	.add('on-drag', () => <ICONS.OnDragIcon />)
	.add('radio-unchecked', () => <ICONS.RadioChecked />)
	.add('radio-checked', () => <ICONS.RadioUnchecked />)
	.add('checkbox-checked', () => <ICONS.CheckboxChecked />)
	.add('checkbox-unchecked', () => <ICONS.CheckboxUnchecked />);
