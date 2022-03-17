import React from 'react';
import PropTypes from 'prop-types';
import './breadcrumb.scss';

const Breadcrumb = ({ elements, style }) => null;

Breadcrumb.propTypes = {
	elements: PropTypes.arrayOf(PropTypes.string).isRequired,
	style: PropTypes.object,
};

export default Breadcrumb;
