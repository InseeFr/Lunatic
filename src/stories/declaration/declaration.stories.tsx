import {
	type Orchestrator,
	OrchestratorMeta,
	type OrchestratorStory,
} from '../utils/Orchestrator';
import source from './source.json';
import sourceMarkdown from './sourceMarkdown.json';
import { Meta } from '@storybook/react';

const meta: Meta<typeof Orchestrator> = {
	title: 'Components/Declaration',
	...OrchestratorMeta,
};

export default meta;

export const Default: OrchestratorStory = {
	args: {
		source,
	},
};

export const Markdown: OrchestratorStory = {
	args: {
		source: sourceMarkdown,
	},
};
