import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import Orchestrator from '../utils/orchestrator';
import readme from './README.md';
import { titleDecorator } from 'utils/lib';
import * as R from './with-roster';
import * as B from './with-loop';
import { positioningOptions } from '../utils/options';
import { select, boolean } from '@storybook/addon-knobs/react';

const storiesR = storiesOf('Loop/With roster', module)
	.addDecorator(withReadme(readme))
	.addDecorator((Component) => {
		const WrappedComponent = titleDecorator(Component);
		return <WrappedComponent title="Loop" />;
	});

storiesR.addWithJSX('Default Loop', () => (
	<Orchestrator
		id="default-loop"
		source={R.dataLoopWithRoster}
		missing={boolean('Missing', false)}
		positioning={select('Items positioning', positioningOptions, 'DEFAULT')}
		features={['VTL']}
	/>
));

storiesR.addWithJSX('External update', () => {
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

				<Orchestrator
					id="default"
					source={up ? R.dataForcedWithRoster : R.dataLoopWithRoster}
					features={['VTL']}
				/>
			</>
		);
	};
	return <Fake />;
});

storiesR.addWithJSX('Deeper Loop', () => (
	<Orchestrator
		id="double-loop"
		source={R.dataLoopDeeperWithRoster}
		positioning={select('Items positioning', positioningOptions, 'DEFAULT')}
		features={['VTL']}
	/>
));

const storiesB = storiesOf('Loop/With loop', module)
	.addDecorator(withReadme(readme))
	.addDecorator((Component) => {
		const WrappedComponent = titleDecorator(Component);
		return <WrappedComponent title="Loop" />;
	});

storiesB.addWithJSX('Default Loop', () => (
	<Orchestrator
		id="default-loop"
		source={B.dataLoopWithLoop}
		missing={boolean('Missing', false)}
		positioning={select('Items positioning', positioningOptions, 'DEFAULT')}
		features={['VTL']}
	/>
));

storiesB.addWithJSX('Deeper Loop', () => (
	<Orchestrator
		id="double-loop"
		source={B.dataLoopDeeperWithLoop}
		positioning={select('Items positioning', positioningOptions, 'DEFAULT')}
		features={['VTL']}
	/>
));
