import { type PropsWithChildren } from 'react';
import type { LunaticBaseProps } from '../type';
import { Missing } from './Missing/Missing';
import classnames from 'classnames';
import { Declarations } from './Declarations/Declarations';
import { voidFunction } from '../../utils/function';
import type { LunaticChangesHandler } from '../../use-lunatic/type';

type Props = PropsWithChildren<{
	componentType?: string;
	paginatedLoop?: boolean;
	handleChanges?: LunaticChangesHandler;
}> &
	Pick<
		LunaticBaseProps,
		| 'declarations'
		| 'management'
		| 'id'
		| 'label'
		| 'missingResponse'
		| 'preferences'
		| 'value'
		| 'missing'
		| 'disabled'
	>;

/**
 * Wrapper around Lunatic components, handle Declarations and missing buttons
 *
 * ## The structure :
 *
 * |--------------------------|
 * |    DeclarationBefore     |
 * |__________________________|
 * |--------------------------|
 * |        Component         |
 * |__________________________|
 * |--------------------------|
 * |     Missing Buttons      |
 * |__________________________|
 */
export function ComponentWrapper(props: Props) {
	const { id, declarations, children, management, handleChanges } = props;
	return (
		<>
			<Declarations
				type="BEFORE_QUESTION_TEXT"
				declarations={declarations}
				id={id}
			/>
			<div className="field-container">
				<div
					className={classnames({
						'field-with-tooltip': management,
						field: !management,
					})}
				>
					{children}
				</div>
				{management && <div className="tooltip" />}
			</div>
			<Declarations type="DETACHABLE" declarations={declarations} id={id} />
			<Missing {...props} handleChanges={handleChanges ?? voidFunction} />
		</>
	);
}
