import { ComponentProps, FunctionComponent, PropsWithChildren } from 'react';
import ReactMarkdown from 'react-markdown';
import Link from './link';
import { voidFunction } from '../../../../utils/function';
import emoji from "remark-emoji"

const renderers = (otherProps: {
	logFunction: typeof DEFAULT_LOG_FUNCTION;
}): Record<string, FunctionComponent<any>> => {
	return {
		p: (props: PropsWithChildren) => <p>{props.children}</p>,
		a: (props: ComponentProps<typeof Link>) =>
			Link({ ...otherProps, ...props }),
	};
};

const DEFAULT_LOG_FUNCTION = voidFunction;

type Props = { expression: string; logFunction?: typeof DEFAULT_LOG_FUNCTION };

const MdLabel = ({ expression, logFunction = DEFAULT_LOG_FUNCTION }: Props) => (
	<ReactMarkdown
		children={expression}
		components={renderers({ logFunction })}
		remarkPlugins={[emoji]}
	/>
);

export default MdLabel;
