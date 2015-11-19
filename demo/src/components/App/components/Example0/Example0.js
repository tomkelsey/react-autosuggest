import theme from 'theme.less';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { updateInputValue, suggestionSelected } from 'Example0/redux';
import Autosuggest from 'AutosuggestContainer';

function mapStateToProps(state) {
  const { value, suggestions } = state[0];

  return {
    value,
    suggestions
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onChange: (value, method) => {
      dispatch(updateInputValue(value, method));
    },
    onSuggestionSelected: (event, { suggestion, method }) => {
      console.log('Example 0: Suggestion selected:', suggestion, `method = ${method}`);
      dispatch(suggestionSelected(getSuggestionValue(suggestion)));
    }
  };
}

function shouldRenderSuggestions(value) {
  return true;
}

function getSuggestionValue(suggestion) {
  return suggestion.text;
}

function renderSuggestion(suggestion, value, valueBeforeUpDown) {
  return (
    <span>{suggestion.text}</span>
  );
}

class Example extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    suggestions: PropTypes.array.isRequired,

    onChange: PropTypes.func.isRequired,
    onSuggestionSelected: PropTypes.func.isRequired
  };

  render() {
    const { value, suggestions, onChange, onSuggestionSelected } = this.props;
    const inputProps = {
      placeholder: 'Pick a fruit',
      value,
      onChange: (event, { newValue, method }) => {
        console.log(`Example 0: Changed value = ${newValue}, method = ${method}`);
        onChange(newValue, method);
      },
      onBlur: () => console.log('Example 0: Blurred'),
      onFocus: () => console.log('Example 0: Focused')
    };

    return (
      <div>
        <Autosuggest shouldRenderSuggestions={shouldRenderSuggestions}
                     suggestions={suggestions}
                     getSuggestionValue={getSuggestionValue}
                     renderSuggestion={renderSuggestion}
                     inputProps={inputProps}
                     onSuggestionSelected={onSuggestionSelected}
                     theme={theme} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Example);
