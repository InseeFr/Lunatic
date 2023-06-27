import { LunaticBaseProps } from '../components/type';

export function descriptionAsString(
	description: LunaticBaseProps['description']
): string | undefined {
	if (typeof description === 'string') {
		return description;
	}
	if (Array.isArray(description)) {
		return description.filter((d) => typeof d.label === 'string').join('\n');
	}
	return;
}
