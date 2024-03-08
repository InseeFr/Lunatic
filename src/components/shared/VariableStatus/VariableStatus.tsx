import { type PropsWithChildren, useState } from 'react';
import { Tooltip } from 'react-tooltip';
import editedImg from './icons/edited.png';
import forcedImg from './icons/forced.png';

const img = { editedImg, forcedImg } as Record<string, string>;

type Props = PropsWithChildren<{
	id?: string;
}>;

export const VariableStatus = ({ id = '', children }: Props) => {
	const [tooltipElements] = useState(() => ({
		imgName: 'editedImg',
		content: [{ key: 'TODO', value: ' coming soon' }],
	}));

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
