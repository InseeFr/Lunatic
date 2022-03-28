import React from 'react';
import { ComboBox } from '../../commons';
import WritableOptionRenderer from './writable-option-renderer';
import WritableLabelRenderer from './writable-label-renderer';

function DropdownWritable({
	id,
	htmlFor,
	labelId,
	disabled,
	options,
	onSelect,
}) {
	// const onChange = useCallback(
	// 	function (...args) {
	// 		if (writable) {
	// 			console.log('onChange', args);
	// 		}
	// 	},
	// 	[writable]
	// );

	return (
		<ComboBox
			id={id}
			htmlFor={htmlFor}
			labelledBy={labelId}
			disabled={disabled}
			options={options}
			editable={false}
			onSelect={onSelect}
			optionRenderer={WritableOptionRenderer}
			labelRenderer={WritableLabelRenderer}
		/>
	);
}

export default DropdownWritable;
