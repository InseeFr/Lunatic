import Declarations, {
	DECLARATION_POSITIONS,
	type	DeclarationsProps,
} from './declarations';

function DeclarationsAfterText(props: Omit<DeclarationsProps, 'type'>) {
	return <Declarations type={DECLARATION_POSITIONS.after} {...props} />;
}

export default DeclarationsAfterText;
