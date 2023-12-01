import {
  type LunaticData,
  type LunaticSource,
  useLunatic,
  LunaticComponents,
  Modal,
} from '@inseefr/lunatic';
import { useState } from 'react';

type Props = {
  source: LunaticSource;
  data: LunaticData;
  options?: {initialPage?: string},
};

export function FormRendererWithNavigation({ source, data, options }: Props) {
  const {
    getComponents,
    isLastPage,
    isFirstPage,
    goPreviousPage,
    goNextPage,
    Provider,
    compileControls,
  } = useLunatic(source, data, {
    initialPage: '1',
    autoSuggesterLoading: true,
    workersBasePath: '/Lunatic/workers',
    ...options
  });

  // Les contrôles doivent être vérifiés manuellement
  const [errors, setErrors] = useState<ReturnType<typeof compileControls>>();
  const handleNext = () => {
    const currentPageErrors = compileControls();
    if (currentPageErrors.currentErrors) {
      setErrors(currentPageErrors);
    } else {
      goNextPage();
    }
  };
  const forceNext = () => {
    setErrors(undefined);
    goNextPage();
  };
  const closeModal = () => {
    setErrors(undefined);
  };

  return (
    <div>
      <Provider>
        <LunaticComponents
          components={getComponents()}
          componentProps={() => ({
            errors: errors?.currentErrors,
          })}
        />
      </Provider>
      <div style={{ marginTop: '.7rem', display: 'flex', gap: '.2rem' }}>
        <button className="button button--primary" disabled={isFirstPage} onClick={goPreviousPage}>
          Précédent
        </button>
        <button className="button button--primary" disabled={isLastPage} onClick={handleNext}>
          Suivant
        </button>
      </div>
      {errors && (
        <Modal
          errors={errors.currentErrors}
          goNext={forceNext}
          onClose={closeModal}
          isCritical={errors.isCritical}
        />
      )}
    </div>
  );
}
