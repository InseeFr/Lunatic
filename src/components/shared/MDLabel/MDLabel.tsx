import { Fragment, type PropsWithChildren } from 'react';
import Markdown, { type Components } from 'react-markdown';
import { MarkdownLink } from './MarkdownLink';
import remarkBreaks from 'remark-breaks';
import emoji from 'remark-emoji';

type Props = { expression: string };

export function MDLabel({ expression }: Props) {
	const hasParagraphs = /\n\n/.test(expression);
	const components = {
		p: hasParagraphs ? 'p' : Fragment,
		br: 'br',
		a: MarkdownA,
	} as Partial<Components>;
	return (
		<Markdown
			components={components}
			remarkPlugins={[[emoji, { accessible: true }], remarkBreaks]}
		>
			{expression}
		</Markdown>
	);
}
const MarkdownA = ({
	title,
	href,
	children,
}: PropsWithChildren<{ title?: string; href: string }>) => {
	const tooltip = title ? <MDLabel expression={title} /> : null;
	return (
		<MarkdownLink href={href} tooltip={tooltip}>
			{children}
		</MarkdownLink>
	);
};
