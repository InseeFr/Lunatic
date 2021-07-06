import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import Orchestrator from '../utils/orchestrator';
import readme from './README.md';
import { titleDecorator } from 'utils/lib';
import dataRoster from './data-roster';
import dataRosterForced from './data-roster-forced';
import dataLoop from './data-loop';
import dataLoopForced from './data-loop-forced';
import dataLoopStatic from './data-loop-static';
import dataLoopStaticForced from './data-loop-static-forced';
import dataInput from './data-input';
import dataInputForced from './data-input-forced';
import { positioningOptions } from '../utils/options';
import { select, boolean } from '@storybook/addon-knobs/react';

const storiesRoster = storiesOf('LoopConstructor/RosterForLoop', module)
	.addDecorator(withReadme(readme))
	.addDecorator((Component) => {
		const WrappedComponent = titleDecorator(Component);
		return <WrappedComponent title="RosterForLoop" />;
	});

storiesRoster.addWithJSX('Default', () => (
	<Orchestrator
		id="default"
		source={dataRoster}
		missing={boolean('Missing', false)}
		positioning={select('Items positioning', positioningOptions, 'DEFAULT')}
		features={['VTL']}
	/>
));

storiesRoster.addWithJSX('External update', () => {
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
					source={up ? dataRosterForced : dataRoster}
					features={['VTL']}
				/>
			</>
		);
	};
	return <Fake />;
});

const storiesBlock = storiesOf('LoopConstructor/Loop', module)
	.addDecorator(withReadme(readme))
	.addDecorator((Component) => {
		const WrappedComponent = titleDecorator(Component);
		return <WrappedComponent title="Loop" />;
	});

storiesBlock.addWithJSX('Default', () => (
	<Orchestrator
		id="default"
		source={dataLoop}
		missing={boolean('Missing', false)}
		positioning={select('Items positioning', positioningOptions, 'DEFAULT')}
		features={['VTL']}
	/>
));

storiesBlock.addWithJSX('Default - External update', () => {
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
					source={up ? dataLoopForced : dataLoop}
					features={['VTL']}
				/>
			</>
		);
	};
	return <Fake />;
});

storiesBlock.addWithJSX('Static', () => (
	<Orchestrator
		id="static"
		source={dataLoopStatic}
		positioning={select('Items positioning', positioningOptions, 'DEFAULT')}
		features={['VTL']}
	/>
));

storiesBlock.addWithJSX('Static - External update', () => {
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
					source={up ? dataLoopStaticForced : dataLoopStatic}
					features={['VTL']}
				/>
			</>
		);
	};
	return <Fake />;
});

const storiesInput = storiesOf('LoopConstructor/Input', module)
	.addDecorator(withReadme(readme))
	.addDecorator((Component) => {
		const WrappedComponent = titleDecorator(Component);
		return <WrappedComponent title="Loop" />;
	});

storiesInput.addWithJSX('Default', () => (
	<Orchestrator
		id="default"
		source={dataInput}
		missing={boolean('Missing', false)}
		positioning={select('Items positioning', positioningOptions, 'DEFAULT')}
		features={['VTL']}
	/>
));

storiesInput.addWithJSX('External update', () => {
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
					source={up ? dataInputForced : dataInput}
					features={['VTL']}
				/>
			</>
		);
	};
	return <Fake />;
});
