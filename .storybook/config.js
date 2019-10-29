import React from 'react';
import {
	configure,
	addDecorator,
	setAddon,
	addParameters,
} from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';
import { checkA11y } from '@storybook/addon-a11y';
import JSXAddon from 'storybook-addon-jsx';

const globalContainer = { margin: '5%' };
addDecorator(story => <div style={globalContainer}>{story()}</div>);
addDecorator(withKnobs({ escapeHTML: false }));
addDecorator(checkA11y);
setAddon(JSXAddon);

addParameters({
	options: {
		name: 'Lunatic',
		addonPanelInRight: true,
	},
});

const requireAll = requireContext => requireContext.keys().map(requireContext);
const loadStories = () =>
	requireAll(require.context('stories', true, /stories\.js?$/));

configure(loadStories, module);
