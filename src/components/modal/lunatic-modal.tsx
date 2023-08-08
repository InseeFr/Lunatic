import Modal from './html/modal';
import LunaticComponent from '../commons/components/lunatic-component-without-label';
import { LunaticComponentProps } from '../type';

function empty() {}

function LunaticModal(props: LunaticComponentProps<'Modal'>) {
	const { id, label, description, goToPage, page, goNextPage, goPreviousPage } =
		props;
	console.log(props);

	return (
		<LunaticComponent
			id={id}
			label={label}
			handleChange={empty}
			value={undefined}
			description={description}
		>
			<Modal
				id={id}
				label={label}
				page={page}
				description={description}
				goToPage={goToPage}
				goNextPage={goNextPage}
				goPreviousPage={goPreviousPage}
			/>
		</LunaticComponent>
	);
}

export default LunaticModal;
