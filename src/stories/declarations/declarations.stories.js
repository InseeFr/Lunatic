import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import { Declarations } from 'components';
import readme from './README.md';
import { titleDecorator } from 'utils/lib';
import * as C from 'C.DETACHABLE/constants';

const declarations = [
	{
		id: '1',
		label: "I'm the label of the instruction declaration",
		position: C.BEFORE_QUESTION_TEXT,
		declarationType: C.INSTRUCTION,
	},
	{
		id: '2',
		label: "I'm the label of the comment declaration",
		position: C.BEFORE_QUESTION_TEXT,
		declarationType: C.COMMENT,
	},
	{
		id: '3',
		label: "I'm the label of the help declaration",
		position: C.BEFORE_QUESTION_TEXT,
		declarationType: C.HELP,
	},
	{
		id: '4',
		label: "I'm the label of the warning declaration",
		position: C.BEFORE_QUESTION_TEXT,
		declarationType: C.WARNING,
	},
	{
		id: '4',
		label: "I'm the label of the message filter declaration",
		position: C.BEFORE_QUESTION_TEXT,
		declarationType: C.MESSAGE_FILTER,
	},
];

const stories = storiesOf('Declarations', module)
	.addDecorator(withReadme(readme))
	.addDecorator(Component => {
		const WrappedComponent = titleDecorator(Component);
		return <WrappedComponent title="<Declarations />" />;
	});

stories.addWithJSX('Default', () => (
	<Declarations
		id="default"
		type={U.BEFORE_QUESTION_TEXT}
		declarations={declarations}
	/>
));
