import { type ReactNode } from 'react';
import { RoundaboutItButton } from './RoundaboutItButton';
import { customizedComponent } from '../shared/HOC/customizedComponent';
import {
	RoundaboutContainer,
	RoundaboutItContainer,
	RoundaboutItTitle,
	RoundaboutLabel,
	RoundaboutPending,
} from './extra';

type PropsIteration = {
	label?: ReactNode;
	index: number;
	complete?: boolean;
	partial?: boolean;
	unnecessary?: boolean;
	locked?: boolean;
	goToIteration: (v: number) => void;
};

function RoundaboutIteration({
	label,
	index,
	complete,
	partial,
	unnecessary,
	goToIteration,
	locked,
}: PropsIteration) {
	return (
		<RoundaboutItContainer>
			<RoundaboutItTitle label={label} />
			<RoundaboutItButton
				partial={partial}
				complete={complete}
				unnecessary={unnecessary}
				goToIteration={goToIteration}
				iteration={index}
				locked={locked}
			/>
		</RoundaboutItContainer>
	);
}

type Props = {
	label?: ReactNode;
	iterations?: unknown;
	expressions: {
		label?: Array<ReactNode | undefined>;
		complete?: Array<boolean | undefined>;
		partial?: Array<boolean | undefined>;
		unnecessary?: Array<boolean | undefined>;
	};
	locked?: boolean;
	goToIteration: (v: number) => void;
};

export const CustomRoundabout = customizedComponent<Props>(
	'Roundabout',
	({ iterations, expressions, goToIteration, label, locked = true }) => {
		const emptyArray = new Array(iterations) as undefined[];
		const {
			complete = emptyArray,
			partial = emptyArray,
			label: iterationLabels = emptyArray,
			unnecessary = emptyArray,
		} = expressions;

		if (iterationLabels !== undefined && partial !== undefined) {
			const subElements = new Array(iterations).fill(null).map(function (_, i) {
				return (
					<RoundaboutIteration
						key={i}
						index={i}
						label={iterationLabels[i]}
						complete={complete[i]}
						partial={partial[i]}
						unnecessary={unnecessary[i]}
						goToIteration={goToIteration}
						locked={locked}
					/>
				);
			});
			return (
				<RoundaboutContainer>
					<RoundaboutLabel value={label} />
					{subElements}
				</RoundaboutContainer>
			);
		}
		return <RoundaboutPending />;
	}
);
