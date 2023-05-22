import React, {
	useState,
	useEffect,
	useCallback,
	MouseEvent as ReactMouseEvent,
	PropsWithChildren,
} from 'react';
import { useDocumentAddEventListener } from '../../../commons';
import './dragger.scss';
import { voidFunction } from '../../../../utils/function';

type Props = PropsWithChildren<{
	el?: {
		style: { top?: string; left?: string };
		getBoundingClientRect: () => { top: number; left: number };
	};
	onDrag?: (drag: boolean, position?: [x: number, y: number]) => void;
}>;

function Dragger({ el, children, onDrag = voidFunction }: Props) {
	const [drag, setDrag] = useState(false);
	const [delta, setDelta] = useState<[number, number] | [undefined, undefined]>(
		[undefined, undefined]
	);
	const [anchor, setAnchor] = useState<
		[number, number] | [undefined, undefined]
	>([undefined, undefined]);

	function onMouseDown(e: ReactMouseEvent) {
		const { clientX, clientY } = e;
		setDrag(true);
		setAnchor([clientX, clientY]);
		onDrag(true, [clientX, clientY]);
	}

	function onMouseUp() {
		setDrag(false);
		onDrag(false);
	}

	const onMouseMove = useCallback(
		function (e: MouseEvent) {
			const { clientX, clientY } = e;
			if (drag) {
				const [ax, ay] = anchor;
				const dx = clientX - (ax ?? 0);
				const dy = clientY - (ay ?? 0);
				setAnchor([clientX, clientY]);
				setDelta([dx, dy]);
				onDrag(true, [dx, dy]);
			}
		},
		[drag, anchor, onDrag]
	);

	useEffect(
		function () {
			const [dx, dy] = delta;
			if (el && dx !== undefined && dy !== undefined) {
				const { top, left } = el.getBoundingClientRect();
				el.style.top = `${top + dy}px`;
				el.style.left = `${left + dx}px`;
			}
		},
		[el, delta]
	);

	useDocumentAddEventListener('mousemove', onMouseMove);
	useDocumentAddEventListener('mouseup', onMouseUp);

	return (
		<div
			className="lunatic-dragger"
			data-testid="lunatic-dragger"
			onMouseDown={onMouseDown}
		>
			{children}
		</div>
	);
}

export default Dragger;
