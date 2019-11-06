import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import JSONEditor from './jsoneditor/component';

const Editor = ({ json, handler, setError, context }) => {
  const [hasToUp, setHasToUp] = useState(false);

  useEffect(() => {
    setHasToUp(true);
  }, [context]);

  const onChange = type => up => {
    if (type === 'json') return handler(up);
    try {
      handler(JSON.parse(up));
      setError('');
    } catch (e) {
      setError(e.message);
    }
  };
  return (
    <JSONEditor
      json={json}
      onChangeJSON={j => onChange('json')(j)}
      onChangeText={t => onChange('text')(t)}
      hasToUp={hasToUp}
      setHasToUp={setHasToUp}
    />
  );
};

export default Editor;

Editor.propTypes = {
  json: PropTypes.shape({
    label: PropTypes.string,
    components: PropTypes.array,
    variables: PropTypes.array,
  }).isRequired,
  handler: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  context: PropTypes.string.isRequired,
};
