import NothingToDisplay from '../commons/components/nothing-to-display';
import type { LunaticComponentProps } from '../type';
import { times } from '../../utils/array';
import { Fragment } from 'react';
import { LunaticComponents } from '../LunaticComponents';
import { Declarations } from '../shared/Declarations/Declarations';

export const PairwiseLinks = ({
	declarations,
	xAxisIterations,
	yAxisIterations,
	id,
	getComponents,
}: LunaticComponentProps<'PairwiseLinks'>) => {
	const nbRows = xAxisIterations * yAxisIterations;

	if (nbRows <= 1) {
		return <NothingToDisplay />;
	}

	return (
		<>
			<Declarations
				type="AFTER_QUESTION_TEXT"
				declarations={declarations}
				id={id}
			/>
			{times(xAxisIterations, (x) => (
				<Fragment key={x}>
					{times(yAxisIterations, (y) => (
						<Fragment key={`${x}-${y}`}>
							<LunaticComponents
								components={getComponents(x, y)}
								componentProps={(props) => ({
									...props,
									id: `${props.id}-${x + 1}-${y + 1} `,
								})}
							/>
						</Fragment>
					))}
				</Fragment>
			))}
		</>
	);
};
