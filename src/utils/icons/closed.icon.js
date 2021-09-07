import React from 'react';
import LunaticIcon from './lunatic-icon';

function ClosedIcon({ className, width = 32, height = 32 }) {
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
				<path d="M 25.628748,11.329813 C 25.38152,11.109877 25.088459,11 24.749838,11 H 7.2500941 C 6.9113359,11 6.6184798,11.109877 6.3710468,11.329813 6.1236139,11.549992 6,11.810303 6,12.111233 c 0,0.300869 0.1236139,0.56118 0.3710468,0.781177 l 8.7499062,7.777534 C 15.368659,20.88988 15.661516,21 16,21 c 0.338484,0 0.631614,-0.11012 0.878842,-0.330056 l 8.749906,-7.777595 C 25.875907,12.672413 26,12.412102 26,12.111172 c 0,-0.300869 -0.124093,-0.56118 -0.371252,-0.781359 z"></path>
			</svg>
		</LunaticIcon>
	);
}

export default ClosedIcon;
