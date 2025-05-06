import {
	Orchestrator,
	OrchestratorMeta,
	type OrchestratorStory,
} from './utils/Orchestrator';

import { Meta } from '@storybook/react';
import { type ComponentProps, type FormEventHandler, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { LunaticSource } from '../type.source';

const meta: Meta<typeof Orchestrator> = {
	title: 'Paste',
	...OrchestratorMeta,
};

export default meta;

export const Default: OrchestratorStory = {
	args: {},
	render(args) {
		return <PasteOrchestrator {...args} />;
	},
};

function PasteOrchestrator(
	props: Readonly<ComponentProps<typeof Orchestrator>>
) {
	const [source, setSource, sourceAsString] =
		useLocalStorage<LunaticSource | null>('story-source');
	const extraTabs = useMemo(() => {
		return [
			{
				label: 'Source',
				children: (
					<FormForSource source={sourceAsString} onChange={setSource} />
				),
			},
		];
	}, [sourceAsString, setSource]);
	if (!source) {
		return extraTabs[0].children;
	}
	return (
		<div key={sourceAsString}>
			<Orchestrator {...props} source={source} extraTabs={extraTabs} />
		</div>
	);
}

function FormForSource(
	props: Readonly<{
		source: string;
		onChange: (source: string) => void;
	}>
) {
	const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
		const data = new FormData(e.currentTarget);
		if (data.has('source')) {
			props.onChange(data.get('source') as string);
		}
	};
	return (
		<form onSubmit={onSubmit}>
			<fieldset className="fieldset">
				<legend className="fieldset-legend">Paste the source.json</legend>
				<textarea
					required
					name="source"
					defaultValue={props.source}
					className="textarea w-full h-24"
					placeholder="source.json content"
				/>
				<div className="label">
					The content of this textarea will be saved in your local storage to
					persist between refreshes
				</div>
			</fieldset>
			<button className="btn btn-primary mt-2" type="submit">
				Load
			</button>
		</form>
	);
}
