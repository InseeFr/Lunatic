import classnames from 'classnames';
import Description from '../../../commons/components/description';
import { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
	id?: string;
	className?: string;
	description?: string;
}>;

function Legend({ children, id, className, description }: Props) {
	if (!children) {
		return null;
	}
	return (
		<>
			<legend id={id} className={classnames('lunatic-legend', className)}>
				{children}
			</legend>
			<Description value={description} />
		</>
	);
}

export default Legend;
