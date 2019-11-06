import React, { Component } from 'react';
import PropTypes from 'prop-types';
import JSONEditor from 'jsoneditor';
import 'jsoneditor/dist/jsoneditor.css';
import './jsoneditor.scss';

class Editor extends Component {
  componentDidMount() {
    const { json, onChangeJSON, onChangeText } = this.props;
    this.jsoneditor = new JSONEditor(this.container, {
      modes: ['tree', 'text', 'view'],
      onChangeJSON,
      onChangeText,
    });
    this.jsoneditor.set(json);
  }

  componentDidUpdate() {
    const { json, onChangeJSON, onChangeText, hasToUp, setHasToUp } = this.props;
    if (hasToUp) {
      this.jsoneditor.destroy();
      this.jsoneditor = new JSONEditor(this.container, {
        modes: ['tree', 'text', 'view'],
        onChangeJSON,
        onChangeText,
      });
      this.jsoneditor.set(json);
      setHasToUp(false);
    }
  }

  componentWillUnmount() {
    if (this.jsoneditor) {
      this.jsoneditor.destroy();
    }
  }

  render() {
    return (
      <div
        className="jsoneditor-react-container"
        ref={elem => {
          this.container = elem;
        }}
      />
    );
  }
}

export default Editor;

Editor.propTypes = {
  json: PropTypes.shape({
    label: PropTypes.string,
    components: PropTypes.array,
    variables: PropTypes.array,
  }).isRequired,
  onChangeJSON: PropTypes.func.isRequired,
  onChangeText: PropTypes.func.isRequired,
  hasToUp: PropTypes.bool.isRequired,
  setHasToUp: PropTypes.func.isRequired,
};
