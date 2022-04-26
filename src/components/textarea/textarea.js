<<<<<<< HEAD
import React from 'react';
// import componentWrapper from '../component-wrapper';
// import { InputDeclarationsWrapper } from '../declarations/wrappers';
// import { areEqual } from '../../utils/lib';
// import './textarea.scss';

// const Textarea = (props) => (
// 	<InputDeclarationsWrapper type={null} roleType="textarea" {...props} />
// );

// export default componentWrapper(React.memo(Textarea, areEqual));

function Textarea() {
	return <div>Textarea</div>;
}

export default Textarea;
=======
import React, { useCallback } from 'react';
import { createCustomizableLunaticField } from '../commons';
import classnames from 'classnames';
import './textarea.scss';

function Textarea({
	id,
	rows,
	maxLength,
	cols,
	onChange,
	value,
	className,
	placeholder,
}) {
	const handleChange = useCallback(
		function (e) {
			onChange(e.target.value);
		},
		[onChange]
	);

	return (
		<textarea
			id={id}
			className={classnames('lunatic-textarea', className)}
			rows={rows}
			maxLength={maxLength}
			cols={cols}
			onChange={handleChange}
			value={value}
			placeholder={placeholder}
		/>
	);
}

export default createCustomizableLunaticField(Textarea);
>>>>>>> optimisation
