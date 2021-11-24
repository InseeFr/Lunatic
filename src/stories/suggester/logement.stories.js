import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import Orchestrator from '../utils/orchestrator';
import readme from './README.md';
import { titleDecorator } from 'utils/lib';
import data from './logement/form.json';

const stories = storiesOf('Logement-full-questionnaire', module)
	.addDecorator(withReadme(readme))
	.addDecorator((Component) => {
		const WrappedComponent = titleDecorator(Component);
		return <WrappedComponent title="Logement" />;
	});

stories.addWithJSX('Default', () => (
	<Orchestrator pagination={true} id="default" source={data} />
));
