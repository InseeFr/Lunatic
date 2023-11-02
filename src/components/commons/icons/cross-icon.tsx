import { LunaticIcon } from './lunatic-icon';
import { type IconProps } from './icon-props';

export function CrossIcon({ className, width = 32, height = 32 }: IconProps) {
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
				<path d="M 7.097006,7.0709627 C 6.4710386,7.6950801 6.0348033,8.5167883 6,9.3333333 l 6.666666,6.6666677 -6.6666655,6.666666 C 6.0406655,24.255963 7.7002437,25.930395 9.3333333,26 L 15.999999,19.333334 22.666665,26 C 24.255962,25.95934 25.930393,24.299755 26,22.666667 L 19.333332,16.000001 26,9.3333334 C 25.959335,7.7440359 24.299754,6.069605 22.666665,6 L 15.999999,12.666666 9.3333333,6 C 8.5386853,6.020332 7.7229758,6.4468492 7.097006,7.0709627 Z"></path>
			</svg>
		</LunaticIcon>
	);
}
