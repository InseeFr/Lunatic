import type { ComponentProps } from 'react';
import Markdown from 'react-markdown';
import { MDLabelLink } from './MDLabelLink';
import remarkBreaks from 'remark-breaks';
import emoji from 'remark-emoji';

type Props = { expression: string };

export const MDLabel = ({ expression }: Props) => {
	return (
		<Markdown
			components={renderComponentsFor(expression)}
			remarkPlugins={[[emoji, { accessible: true }], remarkBreaks]}
		>
			{expression}
		</Markdown>
	);
};

const renderComponentsFor = (
	expression: string
): ComponentProps<typeof Markdown>['components'] => {
	const components = {
		p: (props) => <>{props.children}</>,
		br: 'br',
		a: (props) => (
			<MDLabelLink {...({ ...props } as ComponentProps<typeof MDLabelLink>)} />
		),
	} satisfies ComponentProps<typeof Markdown>['components'];

	if (/\n\n/.test(expression)) {
		return {
			...components,
			p: 'p',
		};
	}

	return components;
};
