import type { useLunatic } from '../../use-lunatic/use-lunatic';
import { objectKeys } from '../../utils/object';
import type { PropsWithChildren } from 'react';

type Props = PropsWithChildren<
	Pick<
		ReturnType<typeof useLunatic>,
		| 'goPreviousPage'
		| 'goNextPage'
		| 'goToPage'
		| 'isLastPage'
		| 'isFirstPage'
		| 'pageTag'
		| 'pager'
	>
> & {
	hasPageResponse: unknown;
	onLogData: () => void;
	onLogComponents: () => void;
};

export function OrchestratorSidebar({
	goPreviousPage,
	goNextPage,
	goToPage,
	isLastPage,
	isFirstPage,
	pageTag,
	pager,
	children,
	hasPageResponse,
	onLogData,
	onLogComponents,
}: Props) {
	return (
		<aside className="space-y-4 card card-border border-base-300 p-2">
			<div className="space-y-4">
				{/* Next / Prev button */}
				<div>
					<div className="flex mb-2">
						<button
							className="btn btn-block shrink btn-primary"
							onClick={goPreviousPage}
							disabled={isFirstPage}
						>
							Previous
						</button>
						<button
							className="btn btn-block shrink btn-primary"
							onClick={goNextPage}
							disabled={isLastPage}
						>
							Next
						</button>
					</div>
					<div className="textarea-sm text-base-content/70 text-center">
						You can use PgDown / PgUp shortcut
					</div>
				</div>

				{/* Reach a specific page */}
				<form
					className="flex"
					onSubmit={(e) => {
						e.preventDefault();
						goToPage({
							page: e.currentTarget.querySelector('input')!.valueAsNumber,
						});
					}}
				>
					<label className="input">
						<span className="label">Page</span>
						<input type="number" placeholder="1" />
					</label>
					<button type="submit" className="btn btn-neutral">
						Reach
					</button>
				</form>

				{/* Pager informations */}
				<div>
					<h3 className="text-lg font-bold mb-4">Pager</h3>
					<ul className="flex flex-col">
						<li className="flex gap-2">
							<span>PageTag</span>
							<span className="dot-leader">{JSON.stringify(pageTag)}</span>
						</li>
						{objectKeys(pager).map((key) => (
							<li className="flex gap-2" key={key}>
								<span>{key}</span>{' '}
								<span className="dot-leader">{JSON.stringify(pager[key])}</span>
							</li>
						))}
					</ul>
				</div>
			</div>
			<div className="flex gap-2 w-full">
				<button className="btn btn-warning grow" onClick={onLogComponents}>
					Log components
				</button>
				<button className="btn btn-warning grow" onClick={onLogData}>
					Log data
				</button>
			</div>
			<div>
				<h3 className="text-lg font-bold mb-2">Misc</h3>
				<ul className="flex flex-col">
					<li className="flex gap-2">
						<span>pageHasResponse:</span>{' '}
						<span className="dot-leader">
							{JSON.stringify(hasPageResponse)}
						</span>
					</li>
				</ul>
			</div>
			{children}
		</aside>
	);
}
