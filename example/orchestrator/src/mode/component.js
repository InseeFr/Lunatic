import React from 'react';
import { Dropdown } from '@inseefr/lunatic';
import './mode.scss';

const Mode = ({ value, setValue, options }) => (
	<div className="mode-container">
		<div className="mode">
			<Dropdown
				id="mode"
				label="Mode"
				value={value}
				options={options}
				handleChange={(e) => setValue(Object.values(e)[0])}
				writable
			/>
		</div>
	</div>
);

export default Mode;
