import { createCustomizableLunaticField } from '../commons';
import { DeclarationsAfterText, DeclarationsBeforeText } from '../declarations';
import { LunaticComponents } from '../lunatic-components';
import type { LunaticComponentProps } from '../type';

/**
 * Question that must represent the Don dilman's definition of it.
 */
export const Question = createCustomizableLunaticField(
  (props: LunaticComponentProps<'Question'>) => {
    const { id, description, declarations, label, components } = props;
    return (
      <>
        <DeclarationsBeforeText declarations={declarations} id={id} />
        <fieldset>
          <legend id={`question-legend-${id}`}>
            <h3>{label}</h3>
            <p
              className="description-lunatic"
              id={`question-description-${id}`}
            >
              {description}
            </p>
          </legend>

          <DeclarationsAfterText declarations={declarations} id={id} />
          <LunaticComponents
            components={components}
            wrapper={({ children }) => (
              <div className="question-components">{children}</div>
            )}
          />
        </fieldset>
      </>
    );
  },
  'Question'
);
