import type { ComponentProps } from 'react';
import ReactMarkdown from 'react-markdown';
import Link from './link';
import { voidFunction } from '../../../../utils/function';
import { Fragment } from 'react';

const DEFAULT_LOG_FUNCTION = voidFunction;

type Props = { expression: string; logFunction?: typeof DEFAULT_LOG_FUNCTION };

const MdLabel = ({ expression, logFunction = DEFAULT_LOG_FUNCTION }: Props) => (
	<ReactMarkdown components={renderComponentsFor(expression, { logFunction })}>
		{expression}
	</ReactMarkdown>
);

const renderComponentsFor = (
	expression: string,
	extraProps: {
		logFunction: typeof DEFAULT_LOG_FUNCTION;
	}
): ComponentProps<typeof ReactMarkdown>['components'] => {
	const components = {
		p: Fragment,
		br: 'br',
		a: (props) => (
			<Link {...({ ...extraProps, ...props } as ComponentProps<typeof Link>)} />
		),
	} satisfies ComponentProps<typeof ReactMarkdown>['components'];

	if (/\n\n/.test(expression)) {
		return {
			...components,
			p: 'p',
		};
	}

	return components;
};

export default MdLabel;
