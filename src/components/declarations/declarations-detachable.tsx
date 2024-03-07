import Declarations, {
	DECLARATION_POSITIONS,
	type DeclarationsProps,
} from './declarations';
import { createCustomizableLunaticField } from '../commons';

function DeclarationsDetachable(props: Omit<DeclarationsProps, 'type'>) {
	return <Declarations type={DECLARATION_POSITIONS.detachable} {...props} />;
}

export default createCustomizableLunaticField(
	DeclarationsDetachable,
	'DeclarationsDetachable'
);
