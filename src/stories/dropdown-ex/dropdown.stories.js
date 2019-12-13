import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import Orchestrator from '../utils/orchestrator';
import readme from './README.md';
import { titleDecorator } from 'utils/lib';
import data from './data';
import { labelPositionOptions, featuresOptions } from '../utils/options';
import { text, boolean, select, object } from '@storybook/addon-knobs/react';
import './dropdown.scss';
import '../../components/dropdown-ex/themes/lunatic-dropdown-basic.scss';
import '../../components/dropdown-ex/themes/lunatic-dropdown-pump-my-theme.scss';

const stories = storiesOf('Dropdown-ex', module)
	.addDecorator(withReadme(readme))
	.addDecorator(Component => {
		const WrappedComponent = titleDecorator(Component);
		return <WrappedComponent title="<DropdownEx />" />;
	});

stories.addWithJSX('Default', () => {
	const [selection, setSelection] = useState(undefined);
	return (
		<>
			<h2>
				{selection
					? `${selection.label} ${selection.value}`
					: `Selection : nothing yet !`}
			</h2>
			<div className="drowpdown-simple">
				<p>css default</p>
				<Orchestrator
					id="default"
					source={data}
					writable={boolean('Writable', true)}
					disabled={boolean('Disabled', false)}
					value="4"
					zIndex={2}
					handleChange={sel => setSelection(sel)}
				/>
			</div>
			<div className="drowpdown-simple">
				<p>css theme lunatic-dropdown-basic</p>
				<Orchestrator
					id="default"
					className="lunatic-dropdown-basic"
					source={data}
					writable={boolean('Writable', true)}
					disabled={boolean('Disabled', false)}
					zIndex={1}
					handleChange={sel => setSelection(sel)}
				/>
			</div>
			<div className="drowpdown-simple">
				<p>css theme lunatic-dropdown-pump-my-theme</p>
				<Orchestrator
					id="default"
					className="lunatic-dropdown-pump-my-theme"
					source={data}
					writable={boolean('Writable', true)}
					disabled={boolean('Disabled', false)}
					zIndex={0}
					handleChange={sel => setSelection(sel)}
				/>
			</div>
		</>
	);
});

stories.addWithJSX('Props', () => (
	<Orchestrator
		id="props"
		source={data}
		label={text('Label', '"I\'m the label of the dropdown"')}
		placeholder={text('Placeholder', 'Placeholder')}
		features={select('Features', featuresOptions, [])}
		bindings={object('Bindings', { test: 'test' })}
		readOnly={boolean('Read only', false)}
		writable={boolean('Writable', false)}
		labelPosition={select('Label position', labelPositionOptions, 'DEFAULT')}
		preferences={['COLLECTED', 'FORCED']}
		tooltip={boolean('Tooltip', false)}
	/>
));
