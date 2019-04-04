import React from 'react';
import PropTypes from 'prop-types';
import { buildStyleObject } from '../../utils/string-utils';
import './breadcrumb.scss';

const Breadcrumb = ({ elements, style }) => (
	<div
		aria-label={`breadcrumb`}
		className="breadcrumb-lunatic"
		style={buildStyleObject(style)}
	>
		{elements.map((e, i) => (
			<React.Fragment key={`breadcrumb-${e.toLowerCase()}`}>
				{e && (
					<span className={i !== 0 ? 'breadcrumb-element-lunatic' : undefined}>
						{e}
					</span>
				)}
			</React.Fragment>
		))}
	</div>
);

Breadcrumb.propTypes = {
	elements: PropTypes.arrayOf(PropTypes.string).isRequired,
	style: PropTypes.object,
};

export default Breadcrumb;
