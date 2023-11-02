import {
	DeclarationsAfterText,
	DeclarationsBeforeText,
	DeclarationsDetachable,
} from '../declarations';
import NothingToDisplay from '../commons/components/nothing-to-display';
import type { LunaticComponentProps } from '../type';
import { times } from '../../utils/array';
import { Fragment } from 'react';
import { LunaticComponents } from '../lunatic-components';

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
			<DeclarationsBeforeText declarations={declarations} id={id} />
			<DeclarationsAfterText declarations={declarations} id={id} />
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
			<DeclarationsDetachable declarations={declarations} id={id} />
		</>
	);
};
