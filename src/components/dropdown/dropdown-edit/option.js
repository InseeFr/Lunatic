import React from 'react';
import classnames from 'classnames';
import { lettersMatching, preparePrefix } from './prefix-tools';

export default ({ label, active, prefix, selected }) => {
	const letters = lettersMatching(label, prefix);
	const what = label
		.split('')
		.reduce(
			({ letters, stack }, c) => {
				const m = preparePrefix(c);
				const [first, ...rest] = letters;
				if (m === first) {
					return {
						letters: rest,
						stack: [...stack, { char: c, className: 'lunatic-prefix' }],
					};
				}

				return {
					letters,
					stack: [...stack, { char: c, className: 'lunatic-normal' }],
				};
			},
			{ letters, stack: [] }
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
		.stack.reverse()
		.map(({ part, className }, i) => (
			<span className={className} key={i}>
				{part}
			</span>
		));
	return (
		<span
			className={classnames('lunatic-dropdown-option', {
				'lunatic-dropdown-option-active': active,
				'lunatic-dropdown-option-selected': selected,
			})}
		>
			{what}
		</span>
	);
};
