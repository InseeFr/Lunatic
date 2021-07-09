import React from 'react';

export default ({ width = 20, height = 20, color = '#aaa' }) => (
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
		<path
			fill={color}
			d="M 23.138672,6 15.998047,13.14453 8.8554688,6.00391 6,8.86133 13.142578,16 6.0039062,23.14453 8.8613281,26 16,18.85742 23.144531,25.9961 26,23.14063 18.855469,16 25.996094,8.85547 Z"
		></path>
	</svg>
);
