import React from 'react';
import { configure, addDecorator, setAddon } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';
import { withKnobs } from '@storybook/addon-knobs/react';
import { checkA11y } from 'storybook-addon-a11y';
import JSXAddon from 'storybook-addon-jsx';

setOptions({
	name: 'Lunatic - Storybook',
	addonPanelInRight: true,
	url: 'http://localhost:9999',
});

const globalContainer = { margin: '5%' };
addDecorator(story => <div style={globalContainer}>{story()}</div>);
addDecorator(withKnobs);
addDecorator(checkA11y);
setAddon(JSXAddon);

const requireAll = requireContext => requireContext.keys().map(requireContext);
const loadStories = () =>
	requireAll(require.context('stories', true, /stories\.js?$/));

configure(loadStories, module);
