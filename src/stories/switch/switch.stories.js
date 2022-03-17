import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import Orchestrator from '../utils/orchestrator';
import readme from './README.md';
import { titleDecorator } from '../utils';
import data from './data';
import dataForced from './data-forced';
import { boolean, select, object } from '@storybook/addon-knobs/react';
import { positioningOptions, featuresOptions } from '../utils/options';
import SwitchMaterialUI from './SwitchMaterialUI';

const stories = storiesOf('switch', module)
	.addDecorator(withReadme(readme))
	.addDecorator((Component) => {
		const WrappedComponent = titleDecorator(Component);
		return <WrappedComponent title="<CheckboxBoolean />" />;
	});

stories.addWithJSX('Default', () => <Orchestrator source={data} />);

stories.addWithJSX('Props', () => (
	<Orchestrator
		source={data}
		positioning={select('Items positioning', positioningOptions, 'DEFAULT')}
		features={select('Features', featuresOptions, ['VTL', 'MD'])}
		missing={boolean('Missing', false)}
		bindings={object('Bindings', { test: 'test' })}
		disabled={boolean('Disabled', false)}
		focused={boolean('Focused', false)}
		management={boolean('Management', false)}
	/>
));

stories.addWithJSX('External update', () => {
	const Fake = () => {
		const [up, setUp] = useState(false);
		return (
			<>
				<button
					type="button"
					onClick={() => {
						setUp(true);
					}}
					disabled={up}
				>
					Force external update
				</button>

				<Orchestrator id="default" source={up ? dataForced : data} />
			</>
		);
	};
	return <Fake />;
});

stories.addWithJSX('Custom Switch', function () {
	const { components } = data;
	const customized = components.map(function (component) {
		const { componentType } = component;
		if (componentType === 'Switch') {
			return { ...component, custom: SwitchMaterialUI };
		}
		return component;
	});
	return (
		<Orchestrator
			source={{ ...data, components: customized }}
			positioning={select('Items positioning', positioningOptions, 'DEFAULT')}
			features={select('Features', featuresOptions, ['VTL', 'MD'])}
			missing={boolean('Missing', false)}
			bindings={object('Bindings', { test: 'test' })}
			disabled={boolean('Disabled', false)}
			focused={boolean('Focused', false)}
			management={boolean('Management', false)}
		/>
	);
});
