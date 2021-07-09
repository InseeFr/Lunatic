import React from 'react';
import classnames from 'classnames';

function OpenedIcon({ className, width = 32, height = 32, fill = '#aaa' }) {
	return (
		<i className={classnames('opened-icon', className)} style={{ fill }}>
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
				<path d="M 11.329813,6.371252 C 11.109877,6.61848 11,6.911541 11,7.250162 v 17.499744 c 0,0.338758 0.109877,0.631614 0.329813,0.879047 C 11.549992,25.876386 11.810303,26 12.111233,26 c 0.300869,0 0.56118,-0.123614 0.781177,-0.371047 l 7.777534,-8.749906 C 20.88988,16.631341 21,16.338484 21,16 21,15.661516 20.88988,15.368386 20.669944,15.121158 L 12.892349,6.371252 C 12.672413,6.124093 12.412102,6 12.111172,6 11.810303,6 11.549992,6.124093 11.329813,6.371252 Z"></path>
			</svg>
		</i>
	);
}

export default OpenedIcon;
