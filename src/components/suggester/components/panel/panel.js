import React from 'react';
import PanelContainer from './panel-container';
import OptionContainer from './option-container';

function getContent({
	options,
	OptionRender,
	selectedIndex,
	expended,
	value,
	search,
	onClickOption,
}) {
	if (expended) {
		return options.map(function (option, index) {
			const { id } = option;
			const selected = selectedIndex === index;
			return (
				<OptionContainer
					key={id}
					index={index}
					selected={id === value}
					onClickOption={onClickOption}
				>
					<OptionRender option={option} selected={selected} search={search} />
				</OptionContainer>
			);
		});
	}
	return undefined;
}

function Panel({
	optionRenderer: OptionRender,
	value,
	options,
	focused,
	selectedIndex,
	expended,
	id,
	search,
	onClickOption,
}) {
	const content = getContent({
		options,
		OptionRender,
		selectedIndex,
		expended,
		value,
		search,
		onClickOption,
	});

	return (
		<PanelContainer expended={expended} focused={focused} id={`${id}-list`}>
			{content}
		</PanelContainer>
	);
}

export default Panel;
