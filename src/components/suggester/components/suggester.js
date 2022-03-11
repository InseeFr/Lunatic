import React, { useCallback, useContext, useRef, useMemo } from 'react';
import classnames from 'classnames';
import SuggesterContent from './suggester-content';
import Selection from './selection';
import Panel from './panel';
import Delete from './selection/delete';
import { createCustomizableLunaticField } from '../../commons';
import './suggester.scss';

function Suggester({
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
	const inputEl = useRef();

	const onFocusEx = useCallback(
		function () {
			if (!disabled) {
				if (inputEl.current !== document.activeElement) {
				}
				inputEl.current.focus();
				onFocus();
			}
		},
		[disabled, onFocus]
	);

	const onBlurEx = useCallback(
		function () {
			if (focused) {
				onBlur();
			}
		},
		[focused, onBlur]
	);

	if (messageError) {
		return (
			<div className="lunatic-suggester-message-error">{messageError}</div>
		);
	}
	return (
		<div className={classnames('lunatic-suggester-container', className)}>
			<SuggesterContent
				id={id}
				focused={focused}
				onFocus={onFocusEx}
				onBlur={onBlurEx}
				onKeyDown={onKeyDown}
			>
				<Selection
					labelRenderer={labelRenderer}
					placeholderList={placeholderList}
					labelledBy={labelledBy}
					ref={inputEl}
					search={search}
					expended={expended}
					id={id}
					disabled={disabled}
					focused={focused}
					displayLabel={displayLabel}
					selectedIndex={selectedIndex}
					options={options}
					onChange={onChange}
				/>
				<Panel
					optionRenderer={optionRenderer}
					value={value}
					options={options}
					focused={focused}
					selectedIndex={selectedIndex}
					expended={expended}
					id={id}
					search={search}
					onClickOption={onClickOption}
				/>
			</SuggesterContent>
			<Delete
				className={classnames({ focused })}
				search={search}
				onClick={onDelete}
			/>
		</div>
	);
}

export default createCustomizableLunaticField(React.memo(Suggester));
