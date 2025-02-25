import classNames from 'classnames';
import { getCharactersCountId } from '../utils/getCharactersCountId';

type Props = {
	id: string;
	maxLength?: number;
	value?: string | null;
};

export function CharactersCount({ id, maxLength, value }: Readonly<Props>) {
	if (!maxLength) return null;

	const currentLength = value?.length ?? 0;
	const charactersCountId = getCharactersCountId(id, maxLength);
	const hasReachedMaxLength = currentLength === maxLength;

	return (
		<span
			id={charactersCountId}
			className={classNames('characters-count', {
				'max-length-reached': hasReachedMaxLength,
			})}
		>
			{`${currentLength}/${maxLength}`}
		</span>
	);
}
