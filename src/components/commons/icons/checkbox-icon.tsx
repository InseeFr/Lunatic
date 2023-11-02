import { LunaticIcon } from './lunatic-icon';

export function CheckboxIcon({
	size = 18,
	className,
	checked,
}: {
	checked?: boolean;
	className?: string;
	size?: number;
}) {
	return (
		<LunaticIcon className={className}>
			<svg
				width={size}
				height={size}
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 18 18"
			>
				{checked ? (
					<path
						fill="currentColor"
						d="M16 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM7 14 2 9l1.41-1.41L7 11.17l7.59-7.59L16 5l-9 9Z"
					/>
				) : (
					<path
						fill="currentColor"
						d="M16 2v14H2V2h14Zm0-2H2C.9 0 0 .9 0 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2Z"
					/>
				)}
			</svg>
		</LunaticIcon>
	);
}
