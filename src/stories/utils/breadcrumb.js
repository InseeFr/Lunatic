import './breadcrumb.scss';

const Crumb = ({ key, breadcrumEntry, goToPage }) => {
	return (
		<div key={key}>
			<li
				style={{ listStyle: 'none' }}
				onClick={() => goToPage({ page: breadcrumEntry.page })}
			>
				<div className="row">
					{breadcrumEntry.page}
					{breadcrumEntry.label}
				</div>
			</li>
			{breadcrumEntry.children.length > 0 && (
				<Breadcrumb breadcrumb={breadcrumEntry.children} goToPage={goToPage} />
			)}
		</div>
	);
};

export const Breadcrumb = ({ breadcrumb: stateBreadcrumb, goToPage }) => {
	return (
		<ol>
			{stateBreadcrumb.map((entry) => (
				<Crumb
					key={`crumb-${entry.lunaticId}`}
					breadcrumEntry={entry}
					goToPage={goToPage}
				/>
			))}
		</ol>
	);
};
