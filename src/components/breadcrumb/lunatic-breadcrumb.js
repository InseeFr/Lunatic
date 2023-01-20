import React from 'react';
import './breadcrumb.scss';

const Breadcrumb = () => {
	const elements = ['Toto', 'Tutu', 'Tata'];
	// format attendu

	// breadcrumbitem = {
	// 	label: string,
	// 	disabled: boolean,
	// 	page : 19.2
	// 	children: []
	// 	}

	return (
		<nav aria-label="Breadcrumb">
			<ol aria-label={`breadcrumb`} className="breadcrumb-lunatic">
				{elements.map((e, i) => (
					<li key={`breadcrumb-${e.toLowerCase()}`}>
						{e && (
							<span
								className={i !== 0 ? 'breadcrumb-element-lunatic' : undefined}
							>
								{e}
							</span>
						)}
					</li>
				))}
			</ol>
		</nav>
	);
};

export default Breadcrumb;
