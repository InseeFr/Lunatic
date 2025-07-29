import { Fragment, type PropsWithChildren } from 'react';
import Markdown, { type Components } from 'react-markdown';
import { MarkdownLink } from './MarkdownLink';
import remarkBreaks from 'remark-breaks';
import emoji from 'remark-emoji';

type Props = {
	expression: string;
	MarkdownLinkOverride?: typeof MarkdownLink;
};

export function MDLabel({ expression, MarkdownLinkOverride }: Props) {
	const hasParagraphs = /\n\n/.test(expression);
	const components = {
		p: hasParagraphs ? 'p' : Fragment,
		br: 'br',
		a: (props: MarkdownAProps) => (
			<MarkdownA
				{...props}
				MarkdownLinkComponent={MarkdownLinkOverride ?? MarkdownLink}
			/>
		),
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

type MarkdownAProps = PropsWithChildren<{
	title?: string;
	href: string;
	MarkdownLinkComponent: typeof MarkdownLink;
}>;

const MarkdownA = ({
	title,
	href,
	children,
	MarkdownLinkComponent,
}: PropsWithChildren<{
	title?: string;
	href: string;
	MarkdownLinkComponent: typeof MarkdownLink;
}>) => {
	const tooltip = title ? <MDLabel expression={title} /> : null;
	return (
		<MarkdownLinkComponent href={href} tooltip={tooltip}>
			{children}
		</MarkdownLinkComponent>
	);
};
