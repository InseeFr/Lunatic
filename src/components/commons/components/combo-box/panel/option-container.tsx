import { useRef, useEffect, useCallback } from 'react';
import type { PropsWithChildren, MouseEvent } from 'react';
import classnames from 'classnames';

function getMin(rect: DOMRect) {
	const { top } = rect;
	return top;
}

function getMax(rect: DOMRect) {
	const { top, height } = rect;
	return top + height;
}

function isVisible(optionRect: DOMRect, parentRect: DOMRect) {
	const min = Math.min(getMin(optionRect), getMin(parentRect));
	const max = Math.max(getMax(optionRect), getMax(parentRect));
	return max - min < optionRect.height + parentRect.height;
}

type Props = PropsWithChildren<{
	index: string;
	selected?: boolean;
	onSelect: (index: string) => void;
}>;

export function OptionContainer({
	children,
	index,
	selected,
	onSelect,
}: Props) {
	const ref = useRef<HTMLLIElement>(null);

	const onClick = useCallback(
		(e: MouseEvent) => {
			e.stopPropagation();
			e.preventDefault();
			onSelect(index);
		},
		[onSelect, index]
	);

	useEffect(() => {
		const { current } = ref;
		if (current && selected && current.parentNode) {
			const oRect = current.getBoundingClientRect();
			const pRect = (current.parentNode as HTMLElement).getBoundingClientRect();

			if (!isVisible(oRect, pRect)) {
				current.scrollIntoView();
			}
		}
	}, [ref, selected]);

	return (
		<li
			className={classnames('lunatic-combo-box-option-container', { selected })}
			role="option"
			aria-selected={selected}
			onClick={onClick}
			ref={ref}
		>
			{children}
		</li>
	);
}
