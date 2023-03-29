import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { ReactNode } from 'react';
import { LunaticBaseProps } from '../../type';

type Props = {
	value?: LunaticBaseProps['description'];
	className?: string;
};

function OneDescription({
	value,
	className,
}: {
	value?: ReactNode;
	className?: string;
}) {
	if (
		(typeof value === 'string' && value.length > 0) ||
		React.isValidElement(value)
	) {
		return (
			<span className={classnames('label-description', className)}>
				{value}
			</span>
		);
	}

	return null;
}

function Description({ value, className }: Props) {
	if (Array.isArray(value)) {
		return (
			<>
				{value.map(({ label, declarationType }, index) => (
					<OneDescription
						key={`description-${index}`}
						value={label}
						className={classnames(className, declarationType)}
					/>
				))}
			</>
		);
	}
	return <OneDescription value={value} className={classnames(className)} />;
}

export const DescritionPropsType = PropTypes.oneOfType([
	PropTypes.string,
	PropTypes.element,
	PropTypes.array,
]);

Description.propTypes = {
	classeName: PropTypes.string,
	value: DescritionPropsType,
};

Description.defaultProps = {
	className: undefined,
	value: undefined,
};

export default Description;
