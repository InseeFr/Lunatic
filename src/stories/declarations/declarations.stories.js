import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import { Declarations } from 'components';
import readme from './README.md';
import { titleDecorator } from 'utils/lib';
import * as C from '../../constants';
import { featuresOptions } from '../utils/options';
import { object, select } from '@storybook/addon-knobs/react';
import { createExecuteExpression } from '../../utils/to-expose/hooks/use-lunatic/commons';

const stories = storiesOf('Declarations', module)
	.addDecorator(withReadme(readme))
	.addDecorator((Component) => {
		const WrappedComponent = titleDecorator(Component);
		return <WrappedComponent title="<Declarations />" />;
	});

function execute(exp) {
	return exp;
}

stories.addWithJSX('Default', function () {
	return (
		<div className="lunatic-component">
			<Declarations
				id="default"
				type={C.BEFORE_QUESTION_TEXT}
				declarations={declarations}
				executeExpression={execute}
			/>
		</div>
	);
});

const [executeExpression] = createExecuteExpression({}, ['VTL']);

stories.addWithJSX('Props', () => (
	<div className="lunatic-component">
		<Declarations
			id="default"
			type={C.BEFORE_QUESTION_TEXT}
			declarations={declarationsVtl}
			executeExpression={executeExpression}
		/>
	</div>
));

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
		id: '5',
		label: "I'm the label of the message filter declaration",
		position: C.BEFORE_QUESTION_TEXT,
		declarationType: C.MESSAGE_FILTER,
	},
	{
		id: '6',
		label: "I'm the label of the statement declaration",
		position: C.BEFORE_QUESTION_TEXT,
		declarationType: C.STATEMENT,
	},
];

const declarationsVtl = [
	{
		id: '1',
		label: '"I\'m the label of the instruction declaration"',
		position: C.BEFORE_QUESTION_TEXT,
		declarationType: C.INSTRUCTION,
	},
	{
		id: '2',
		label: '"I\'m the label of the comment declaration"',
		position: C.BEFORE_QUESTION_TEXT,
		declarationType: C.COMMENT,
	},
	{
		id: '3',
		label: '"I\'m the label of the help declaration"',
		position: C.BEFORE_QUESTION_TEXT,
		declarationType: C.HELP,
	},
	{
		id: '4',
		label: '"I\'m the label of the warning declaration"',
		position: C.BEFORE_QUESTION_TEXT,
		declarationType: C.WARNING,
	},
	{
		id: '5',
		label: '"I\'m the label of the message filter declaration"',
		position: C.BEFORE_QUESTION_TEXT,
		declarationType: C.MESSAGE_FILTER,
	},
	{
		id: '6',
		label: '"I\'m the label of the statement declaration"',
		position: C.BEFORE_QUESTION_TEXT,
		declarationType: C.STATEMENT,
	},
];
