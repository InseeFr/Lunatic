import { slottableComponent } from '../shared/HOC/slottableComponent';

/**
 * Displays a loader while fetching data to fill the form
 */
export const FillerLoader = slottableComponent(
	'FillerLoader',
	function FillerLoader(props: { id: string }) {
		return <p>Chargement des données...</p>;
	}
);
