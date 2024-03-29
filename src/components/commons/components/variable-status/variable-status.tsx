import PropTypes from 'prop-types';
import React, { type PropsWithChildren, useState } from 'react';
import { Tooltip } from 'react-tooltip';
import { editedImg, forcedImg } from './img';
import './variable-status.scss';

const img = { editedImg, forcedImg } as Record<string, string>;

type Props = PropsWithChildren<{
	id?: string;
}>;

const VariableStatus = ({ id = '', children }: Props) => {
	const [tooltipElements] = useState(() => ({
		imgName: 'editedImg',
		content: [{ key: 'TODO', value: ' coming soon' }],
	}));

	// useEffect(() => {
	// 	setTooltipElements({ imgName: 'edited', content: 'toto' });
	// }, [response]);

	const { content, imgName } = tooltipElements;

	if (!content) return null;

	const text = content
		.map(({ key, value }) => `${key} : ${value}<br />`)
		.join('');

	return (
		<div
			className="lunatic-component-container-test"
			data-testid="variable-status"
		>
			<div className="lunatic-component-body">{children}</div>
			<div className="tooltip-lunatic" data-testid="tooltip-lunatic">
				<span
					data-for={`${id}-management-tooltip`}
					data-tip={text}
					data-multiline
				>
					<img id={id} alt="img-tooltip" src={img[imgName] ?? ''} />
				</span>
				<Tooltip
					id={`${id}-management-tooltip`}
					className="tooltip-text"
					place="left"
				/>
			</div>
		</div>
	);
};

VariableStatus.defaultProps = {
	response: {},
};

VariableStatus.propTypes = {
	id: PropTypes.string,
};

export default VariableStatus;
