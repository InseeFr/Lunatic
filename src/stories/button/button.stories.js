import React from 'react';
import { Button } from '../../components';

const stories = {
	title: 'Button',
	component: Button,
};

export default stories;

const Template = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = { label: 'Button' };

export const disabled = Template.bind({});
disabled.args = { label: 'disabled button', disabled: true };
