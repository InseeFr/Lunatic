import { ComponentProps, FunctionComponent, PropsWithChildren } from 'react';
import ReactMarkdown from 'react-markdown';
import Link from './link';

const renderers = (otherProps: {
	logFunction: typeof DEFAULT_LOG_FUNCTION;
}): Record<string, FunctionComponent<any>> => {
	return {
		p: (props: PropsWithChildren) => (
			<p style={{ margin: '0' }}>{props.children}</p>
		),
		a: (props: ComponentProps<typeof Link>) =>
			Link({ ...otherProps, ...props }),
	};
};

const DEFAULT_LOG_FUNCTION = () => {};

type Props = { expression: string; logFunction?: typeof DEFAULT_LOG_FUNCTION };

const MdLabel = ({ expression, logFunction = DEFAULT_LOG_FUNCTION }: Props) => (
	<ReactMarkdown
		children={expression}
		components={renderers({ logFunction })}
	/>
);

export default MdLabel;
