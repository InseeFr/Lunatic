import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import getLabel from './filter-tools/get-label';
import lettersMatching from './filter-tools/letters-matching';
import preparePrefix from './filter-tools/prepare-prefix';

function hightlightSearch(label, prefix) {
	const labelText = getLabel(label);
	const initLetters = lettersMatching(labelText, prefix);
	return labelText
		.split('')
		.reduce(
			({ letters, stack }, c) => {
				const m = preparePrefix(c);
				const [first, ...rest] = letters;
				if (m === first) {
					return {
						letters: rest,
						stack: [...stack, { char: c, className: 'prefix' }],
					};
				}

				return {
					letters,
					stack: [...stack, { char: c, className: 'normal' }],
				};
			},
			{ letters: initLetters, stack: [] }
		)
		.stack.reduce(
			({ last, stack }, { char, className }) => {
				if (!last) {
					return { last: className, stack: [{ part: char, className }] };
				}
				if (last !== className) {
					return {
						last: className,
						stack: [{ part: char, className }, ...stack],
					};
				}
				const [first, ...rest] = stack;
				return {
					last: className,
					stack: [{ ...first, part: `${first.part}${char}` }, ...rest],
				};
			},
			{ last: undefined, stack: [] }
		)
		.stack.reverse();
}

function WritableOptionRenderer({ option, selected, search }) {
	const [parts, setParts] = useState([]);
	const { value, label } = option;

	useEffect(
		function () {
			setParts(hightlightSearch(label, search));
		},
		[search, label]
	);

	if (parts && parts.length) {
		return (
			<div className={classnames('lunatic-dropdown-option', { selected })}>
				<span className="id">{value}</span>
				<span>&nbsp;&#x2014;&nbsp;</span>
				<span className="label">
					{parts.map(({ part, className }, i) => (
						<span className={className} key={i}>
							{part}
						</span>
					))}
				</span>
			</div>
		);
	}
	return (
		<div className={classnames('lunatic-dropdown-option', { selected })}>
			<span className="id">{value}</span>
		</div>
	);
}

export default WritableOptionRenderer;
