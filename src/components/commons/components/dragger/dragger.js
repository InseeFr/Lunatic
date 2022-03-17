import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import useDocumentAddEventListener from '../../../../utils/to-expose/hooks/use-document-add-event-listener';
import './dragger.scss';

function Dragger({ el, children, onDrag }) {
	const [drag, setDrag] = useState(false);
	const [delta, setDelta] = useState([undefined, undefined]);
	const [anchor, setAnchor] = useState([undefined, undefined]);

	function onMouseDown(e) {
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
		function (e) {
			const { clientX, clientY } = e;
			if (drag) {
				const [ax, ay] = anchor;
				const dx = clientX - ax;
				const dy = clientY - ay;
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
		<div className="lunatic-dragger" onMouseDown={onMouseDown}>
			{children}
		</div>
	);
}

Dragger.propTypes = { el: PropTypes.object, onDrag: PropTypes.func };

Dragger.defaultProps = { el: undefined, onDrag: () => null };

export default Dragger;
