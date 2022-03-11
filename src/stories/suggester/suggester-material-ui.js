import React, { useCallback, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';

function SuggesterMaterialUI({
	className,
	placeholderList,
	labelledBy,
	optionRenderer,
	labelRenderer,
	onSelect,
	onBlur,
	onDelete,
	onKeyDown,
	onChange,
	onClickOption,
	value,
	onFocus,
	disabled,
	id,
	messageError,
	search,
	focused,
	options,
	expended,
	selectedIndex,
	displayLabel,
}) {
	const [muiOptions, setMUIOptions] = useState([]);

	useEffect(
		function () {
			const op = options.map(function ({ label, id }) {
				return { label, id };
			});
			setMUIOptions(op);
		},
		[options]
	);

	const onChangeEx = useCallback(
		function (e) {
			onChange(e.target.value);
		},
		[onChange]
	);

	return <TextField onChange={onChangeEx} />;
}

export default SuggesterMaterialUI;
