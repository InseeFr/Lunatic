import { LunaticIcon } from './lunatic-icon';
import { IconProps } from './icon-props';

export function RadioCheckedIcon({
	className,
	width = 32,
	height = 32,
}: IconProps) {
	return (
		<LunaticIcon className={className}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={width}
				height={height}
				x="0"
				y="0"
				enableBackground="new 0 0 32 32"
				version="1.1"
				viewBox="0 0 32 32"
				xmlSpace="preserve"
			>
				<path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
				<path d="M0 0h24v24H0z" fill="none" />
			</svg>
		</LunaticIcon>
	);
}

export default RadioCheckedIcon;
