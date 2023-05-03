import classnames from 'classnames';
import { createCustomizableLunaticField } from '../../commons';

function ComponentSetComponentContainer(props) {
	const { children, className } = props;
	return (
		<div className={classnames('lunatic-component-set-component', className)}>
			{children}
		</div>
	);
}

export default createCustomizableLunaticField(
	ComponentSetComponentContainer,
	'ComponentSetComponentContainer'
);
