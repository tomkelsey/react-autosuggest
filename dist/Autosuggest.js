'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends =
  Object.assign ||
  function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };

var _createClass = (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ('value' in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _arrays = require('shallow-equal/arrays');

var _arrays2 = _interopRequireDefault(_arrays);

var _reactAutowhatever = require('react-autowhatever');

var _reactAutowhatever2 = _interopRequireDefault(_reactAutowhatever);

var _theme = require('./theme');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }
  return call && (typeof call === 'object' || typeof call === 'function')
    ? call
    : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError(
      'Super expression must either be null or a function, not ' +
        typeof superClass
    );
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass);
}

var alwaysTrue = function alwaysTrue() {
  return true;
};
var defaultShouldRenderSuggestions = function defaultShouldRenderSuggestions(
  value
) {
  return value.trim().length > 0;
};
var defaultRenderSuggestionsContainer = function defaultRenderSuggestionsContainer(
  _ref
) {
  var containerProps = _ref.containerProps, children = _ref.children;
  return _react2.default.createElement('div', containerProps, children);
};

var Autosuggest = (function(_Component) {
  _inherits(Autosuggest, _Component);

  function Autosuggest(_ref2) {
    var alwaysRenderSuggestions = _ref2.alwaysRenderSuggestions;

    _classCallCheck(this, Autosuggest);

    var _this = _possibleConstructorReturn(
      this,
      (Autosuggest.__proto__ || Object.getPrototypeOf(Autosuggest)).call(this)
    );

    _initialiseProps.call(_this);

    _this.state = {
      isFocused: false,
      isCollapsed: !alwaysRenderSuggestions,
      highlightedSectionIndex: null,
      highlightedSuggestionIndex: null,
      valueBeforeUpDown: null
    };

    _this.justPressedUpDown = false;
    return _this;
  }

  _createClass(Autosuggest, [
    {
      key: 'componentDidMount',
      value: function componentDidMount() {
        document.addEventListener('mousedown', this.onDocumentMouseDown);

        this.input = this.autowhatever.input;
        this.suggestionsContainer = this.autowhatever.itemsContainer;
      }
    },
    {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        if (
          (0, _arrays2.default)(nextProps.suggestions, this.props.suggestions)
        ) {
          if (
            nextProps.highlightFirstSuggestion &&
            nextProps.suggestions.length > 0 &&
            this.justPressedUpDown === false
          ) {
            this.highlightFirstSuggestion();
          }
        } else {
          if (this.willRenderSuggestions(nextProps)) {
            if (nextProps.highlightFirstSuggestion) {
              this.highlightFirstSuggestion();
            }

            if (this.state.isCollapsed && !this.justSelectedSuggestion) {
              this.revealSuggestions();
            }
          } else {
            this.resetHighlightedSuggestion();
          }
        }
      }
    },
    {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        document.removeEventListener('mousedown', this.onDocumentMouseDown);
      }
    },
    {
      key: 'updateHighlightedSuggestion',
      value: function updateHighlightedSuggestion(
        sectionIndex,
        suggestionIndex,
        prevValue
      ) {
        this.setState(function(state) {
          var valueBeforeUpDown = state.valueBeforeUpDown;

          if (suggestionIndex === null) {
            valueBeforeUpDown = null;
          } else if (
            valueBeforeUpDown === null &&
            typeof prevValue !== 'undefined'
          ) {
            valueBeforeUpDown = prevValue;
          }

          return {
            highlightedSectionIndex: sectionIndex,
            highlightedSuggestionIndex: suggestionIndex,
            valueBeforeUpDown: valueBeforeUpDown
          };
        });
      }
    },
    {
      key: 'resetHighlightedSuggestion',
      value: function resetHighlightedSuggestion() {
        var shouldResetValueBeforeUpDown = arguments.length > 0 &&
          arguments[0] !== undefined
          ? arguments[0]
          : true;

        this.setState(function(state) {
          var valueBeforeUpDown = state.valueBeforeUpDown;

          return {
            highlightedSectionIndex: null,
            highlightedSuggestionIndex: null,
            valueBeforeUpDown: shouldResetValueBeforeUpDown
              ? null
              : valueBeforeUpDown
          };
        });
      }
    },
    {
      key: 'revealSuggestions',
      value: function revealSuggestions() {
        this.setState({
          isCollapsed: false
        });
      }
    },
    {
      key: 'closeSuggestions',
      value: function closeSuggestions() {
        this.setState({
          highlightedSectionIndex: null,
          highlightedSuggestionIndex: null,
          valueBeforeUpDown: null,
          isCollapsed: true
        });
      }
    },
    {
      key: 'getSuggestion',
      value: function getSuggestion(sectionIndex, suggestionIndex) {
        var _props = this.props,
          suggestions = _props.suggestions,
          multiSection = _props.multiSection,
          getSectionSuggestions = _props.getSectionSuggestions;

        if (multiSection) {
          return getSectionSuggestions(suggestions[sectionIndex])[
            suggestionIndex
          ];
        }

        return suggestions[suggestionIndex];
      }
    },
    {
      key: 'getHighlightedSuggestion',
      value: function getHighlightedSuggestion() {
        var _state = this.state,
          highlightedSectionIndex = _state.highlightedSectionIndex,
          highlightedSuggestionIndex = _state.highlightedSuggestionIndex;

        if (highlightedSuggestionIndex === null) {
          return null;
        }

        return this.getSuggestion(
          highlightedSectionIndex,
          highlightedSuggestionIndex
        );
      }
    },
    {
      key: 'getSuggestionValueByIndex',
      value: function getSuggestionValueByIndex(sectionIndex, suggestionIndex) {
        var getSuggestionValue = this.props.getSuggestionValue;

        return getSuggestionValue(
          this.getSuggestion(sectionIndex, suggestionIndex)
        );
      }
    },
    {
      key: 'getSuggestionIndices',
      value: function getSuggestionIndices(suggestionElement) {
        var sectionIndex = suggestionElement.getAttribute('data-section-index');
        var suggestionIndex = suggestionElement.getAttribute(
          'data-suggestion-index'
        );

        return {
          sectionIndex: typeof sectionIndex === 'string'
            ? parseInt(sectionIndex, 10)
            : null,
          suggestionIndex: parseInt(suggestionIndex, 10)
        };
      }
    },
    {
      key: 'findSuggestionElement',
      value: function findSuggestionElement(startNode) {
        var node = startNode;

        do {
          if (node.getAttribute('data-suggestion-index') !== null) {
            return node;
          }

          node = node.parentNode;
        } while (node !== null);

        console.error('Clicked element:', startNode); // eslint-disable-line no-console
        throw new Error("Couldn't find suggestion element");
      }
    },
    {
      key: 'maybeCallOnChange',
      value: function maybeCallOnChange(event, newValue, method) {
        var _props$inputProps = this.props.inputProps,
          value = _props$inputProps.value,
          onChange = _props$inputProps.onChange;

        if (newValue !== value) {
          onChange(event, { newValue: newValue, method: method });
        }
      }
    },
    {
      key: 'willRenderSuggestions',
      value: function willRenderSuggestions(props) {
        var suggestions = props.suggestions,
          inputProps = props.inputProps,
          shouldRenderSuggestions = props.shouldRenderSuggestions;
        var value = inputProps.value;

        return suggestions.length > 0 && shouldRenderSuggestions(value);
      }
    },
    {
      key: 'getQuery',
      value: function getQuery() {
        var inputProps = this.props.inputProps;
        var value = inputProps.value;
        var valueBeforeUpDown = this.state.valueBeforeUpDown;

        return (valueBeforeUpDown || value).trim();
      }
    },
    {
      key: 'render',
      value: function render() {
        var _this2 = this;

        var _props2 = this.props,
          suggestions = _props2.suggestions,
          renderInputComponent = _props2.renderInputComponent,
          onSuggestionsFetchRequested = _props2.onSuggestionsFetchRequested,
          renderSuggestion = _props2.renderSuggestion,
          inputProps = _props2.inputProps,
          multiSection = _props2.multiSection,
          renderSectionTitle = _props2.renderSectionTitle,
          id = _props2.id,
          getSectionSuggestions = _props2.getSectionSuggestions,
          theme = _props2.theme,
          getSuggestionValue = _props2.getSuggestionValue,
          alwaysRenderSuggestions = _props2.alwaysRenderSuggestions;
        var _state2 = this.state,
          isFocused = _state2.isFocused,
          isCollapsed = _state2.isCollapsed,
          highlightedSectionIndex = _state2.highlightedSectionIndex,
          highlightedSuggestionIndex = _state2.highlightedSuggestionIndex,
          valueBeforeUpDown = _state2.valueBeforeUpDown;

        var shouldRenderSuggestions = alwaysRenderSuggestions
          ? alwaysTrue
          : this.props.shouldRenderSuggestions;
        var value = inputProps.value,
          _onFocus = inputProps.onFocus,
          _onKeyDown = inputProps.onKeyDown;

        var willRenderSuggestions = this.willRenderSuggestions(this.props);
        var isOpen =
          alwaysRenderSuggestions ||
          (isFocused && !isCollapsed && willRenderSuggestions);
        var items = isOpen ? suggestions : [];
        var autowhateverInputProps = _extends({}, inputProps, {
          onFocus: function onFocus(event) {
            if (
              !_this2.justSelectedSuggestion &&
              !_this2.justClickedOnSuggestionsContainer
            ) {
              var shouldRender = shouldRenderSuggestions(value);

              _this2.setState({
                isFocused: true,
                isCollapsed: !shouldRender
              });

              _onFocus && _onFocus(event);

              if (shouldRender) {
                onSuggestionsFetchRequested({ value: value });
              }
            }
          },
          onBlur: function onBlur(event) {
            if (_this2.justClickedOnSuggestionsContainer) {
              _this2.input.focus();
              if (_this2.justClickedOnIgnored) {
                _this2.justClickedOnSuggestionsContainer = false;
                _this2.justClickedOnIgnored = false;
                setTimeout(function() {
                  _this2.input.blur();
                }, 500);
              }
              return;
            }

            _this2.blurEvent = event;

            if (!_this2.justSelectedSuggestion) {
              _this2.onBlur();
              _this2.onSuggestionsClearRequested();
            }
          },
          onChange: function onChange(event) {
            var value = event.target.value;

            var shouldRender = shouldRenderSuggestions(value);

            _this2.maybeCallOnChange(event, value, 'type');

            _this2.setState({
              highlightedSectionIndex: null,
              highlightedSuggestionIndex: null,
              valueBeforeUpDown: null,
              isCollapsed: !shouldRender
            });

            if (shouldRender) {
              onSuggestionsFetchRequested({ value: value });
            } else {
              _this2.onSuggestionsClearRequested();
            }
          },
          onKeyDown: function onKeyDown(event, data) {
            switch (event.key) {
              case 'ArrowDown':
              case 'ArrowUp':
                if (isCollapsed) {
                  if (shouldRenderSuggestions(value)) {
                    onSuggestionsFetchRequested({ value: value });
                    _this2.revealSuggestions();
                  }
                } else if (suggestions.length > 0) {
                  var newHighlightedSectionIndex =
                    data.newHighlightedSectionIndex,
                    newHighlightedItemIndex = data.newHighlightedItemIndex;

                  var newValue = void 0;

                  if (newHighlightedItemIndex === null) {
                    // valueBeforeUpDown can be null if, for example, user
                    // hovers on the first suggestion and then pressed Up.
                    // If that happens, use the original input value.
                    newValue = valueBeforeUpDown === null
                      ? value
                      : valueBeforeUpDown;
                  } else {
                    newValue = _this2.getSuggestionValueByIndex(
                      newHighlightedSectionIndex,
                      newHighlightedItemIndex
                    );
                  }

                  _this2.updateHighlightedSuggestion(
                    newHighlightedSectionIndex,
                    newHighlightedItemIndex,
                    value
                  );
                  _this2.maybeCallOnChange(
                    event,
                    newValue,
                    event.key === 'ArrowDown' ? 'down' : 'up'
                  );
                }

                event.preventDefault(); // Prevents the cursor from moving

                _this2.justPressedUpDown = true;

                setTimeout(function() {
                  _this2.justPressedUpDown = false;
                });

                break;

              case 'Enter': {
                var highlightedSuggestion = _this2.getHighlightedSuggestion();

                if (isOpen && !alwaysRenderSuggestions) {
                  _this2.closeSuggestions();
                }

                if (highlightedSuggestion !== null) {
                  var _newValue = getSuggestionValue(highlightedSuggestion);

                  _this2.maybeCallOnChange(event, _newValue, 'enter');

                  _this2.onSuggestionSelected(event, {
                    suggestion: highlightedSuggestion,
                    suggestionValue: _newValue,
                    suggestionIndex: highlightedSuggestionIndex,
                    sectionIndex: highlightedSectionIndex,
                    method: 'enter'
                  });

                  _this2.justSelectedSuggestion = true;

                  setTimeout(function() {
                    _this2.justSelectedSuggestion = false;
                  });
                }

                break;
              }

              case 'Escape': {
                if (isOpen) {
                  // If input.type === 'search', the browser clears the input
                  // when Escape is pressed. We want to disable this default
                  // behaviour so that, when suggestions are shown, we just hide
                  // them, without clearing the input.
                  event.preventDefault();
                }

                var willCloseSuggestions = isOpen && !alwaysRenderSuggestions;

                if (valueBeforeUpDown === null) {
                  // Didn't interact with Up/Down
                  if (!willCloseSuggestions) {
                    var _newValue2 = '';

                    _this2.maybeCallOnChange(event, _newValue2, 'escape');

                    if (shouldRenderSuggestions(_newValue2)) {
                      onSuggestionsFetchRequested({ value: _newValue2 });
                    } else {
                      _this2.onSuggestionsClearRequested();
                    }
                  }
                } else {
                  // Interacted with Up/Down
                  _this2.maybeCallOnChange(event, valueBeforeUpDown, 'escape');
                }

                if (willCloseSuggestions) {
                  _this2.onSuggestionsClearRequested();
                  _this2.closeSuggestions();
                } else {
                  _this2.resetHighlightedSuggestion();
                }

                break;
              }
            }

            _onKeyDown && _onKeyDown(event);
          }
        });
        var renderSuggestionData = {
          query: this.getQuery()
        };

        return _react2.default.createElement(_reactAutowhatever2.default, {
          multiSection: multiSection,
          items: items,
          renderInputComponent: renderInputComponent,
          renderItemsContainer: this.renderSuggestionsContainer,
          renderItem: renderSuggestion,
          renderItemData: renderSuggestionData,
          renderSectionTitle: renderSectionTitle,
          getSectionItems: getSectionSuggestions,
          highlightedSectionIndex: highlightedSectionIndex,
          highlightedItemIndex: highlightedSuggestionIndex,
          inputProps: autowhateverInputProps,
          itemProps: this.itemProps,
          theme: (0, _theme.mapToAutowhateverTheme)(theme),
          id: id,
          ref: this.storeAutowhateverRef
        });
      }
    }
  ]);

  return Autosuggest;
})(_react.Component);

Autosuggest.propTypes = {
  suggestions: _propTypes2.default.array.isRequired,
  onSuggestionsFetchRequested: function onSuggestionsFetchRequested(
    props,
    propName
  ) {
    var onSuggestionsFetchRequested = props[propName];

    if (typeof onSuggestionsFetchRequested !== 'function') {
      throw new Error(
        "'onSuggestionsFetchRequested' must be implemented. See: https://github.com/moroshko/react-autosuggest#onSuggestionsFetchRequestedProp"
      );
    }
  },
  onSuggestionsClearRequested: function onSuggestionsClearRequested(
    props,
    propName
  ) {
    var onSuggestionsClearRequested = props[propName];

    if (
      props.alwaysRenderSuggestions === false &&
      typeof onSuggestionsClearRequested !== 'function'
    ) {
      throw new Error(
        "'onSuggestionsClearRequested' must be implemented. See: https://github.com/moroshko/react-autosuggest#onSuggestionsClearRequestedProp"
      );
    }
  },
  onSuggestionSelected: _propTypes2.default.func,
  renderInputComponent: _propTypes2.default.func,
  renderSuggestionsContainer: _propTypes2.default.func,
  getSuggestionValue: _propTypes2.default.func.isRequired,
  renderSuggestion: _propTypes2.default.func.isRequired,
  inputProps: function inputProps(props, propName) {
    var inputProps = props[propName];

    if (!inputProps.hasOwnProperty('value')) {
      throw new Error("'inputProps' must have 'value'.");
    }

    if (!inputProps.hasOwnProperty('onChange')) {
      throw new Error("'inputProps' must have 'onChange'.");
    }
  },
  shouldRenderSuggestions: _propTypes2.default.func,
  alwaysRenderSuggestions: _propTypes2.default.bool,
  multiSection: _propTypes2.default.bool,
  renderSectionTitle: function renderSectionTitle(props, propName) {
    var renderSectionTitle = props[propName];

    if (
      props.multiSection === true &&
      typeof renderSectionTitle !== 'function'
    ) {
      throw new Error(
        "'renderSectionTitle' must be implemented. See: https://github.com/moroshko/react-autosuggest#renderSectionTitleProp"
      );
    }
  },
  getSectionSuggestions: function getSectionSuggestions(props, propName) {
    var getSectionSuggestions = props[propName];

    if (
      props.multiSection === true &&
      typeof getSectionSuggestions !== 'function'
    ) {
      throw new Error(
        "'getSectionSuggestions' must be implemented. See: https://github.com/moroshko/react-autosuggest#getSectionSuggestionsProp"
      );
    }
  },
  focusInputOnSuggestionClick: _propTypes2.default.bool,
  highlightFirstSuggestion: _propTypes2.default.bool,
  theme: _propTypes2.default.object,
  id: _propTypes2.default.string
};
Autosuggest.defaultProps = {
  renderSuggestionsContainer: defaultRenderSuggestionsContainer,
  shouldRenderSuggestions: defaultShouldRenderSuggestions,
  alwaysRenderSuggestions: false,
  multiSection: false,
  focusInputOnSuggestionClick: true,
  highlightFirstSuggestion: false,
  theme: _theme.defaultTheme,
  id: '1'
};

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.onDocumentMouseDown = function(event) {
    _this3.justClickedOnSuggestionsContainer = false;
    _this3.justClickedOnIgnored = false;

    var node =
      (event.detail && event.detail.target) || // This is for testing only. Please show me a better way to emulate this.
      event.target;

    while (node !== null && node !== document) {
      if (node.getAttribute('data-suggestion-index') !== null) {
        // Suggestion was clicked
        return;
      }

      if (node.getAttribute('data-suggestion-ignore') !== null) {
        _this3.justClickedOnIgnored = true;
      }

      if (node === _this3.suggestionsContainer) {
        // Something else inside suggestions container was clicked
        _this3.justClickedOnSuggestionsContainer = true;
        return;
      }

      node = node.parentNode;
    }
  };

  this.storeAutowhateverRef = function(autowhatever) {
    if (autowhatever !== null) {
      _this3.autowhatever = autowhatever;
    }
  };

  this.onSuggestionMouseEnter = function(event, _ref3) {
    var sectionIndex = _ref3.sectionIndex, itemIndex = _ref3.itemIndex;

    _this3.updateHighlightedSuggestion(sectionIndex, itemIndex);
  };

  this.highlightFirstSuggestion = function() {
    _this3.updateHighlightedSuggestion(_this3.props.multiSection ? 0 : null, 0);
  };

  this.onSuggestionMouseDown = function() {
    _this3.justSelectedSuggestion = true;
  };

  this.onSuggestionsClearRequested = function() {
    var onSuggestionsClearRequested = _this3.props.onSuggestionsClearRequested;

    onSuggestionsClearRequested && onSuggestionsClearRequested();
  };

  this.onSuggestionSelected = function(event, data) {
    var _props3 = _this3.props,
      alwaysRenderSuggestions = _props3.alwaysRenderSuggestions,
      onSuggestionSelected = _props3.onSuggestionSelected,
      onSuggestionsFetchRequested = _props3.onSuggestionsFetchRequested;

    onSuggestionSelected && onSuggestionSelected(event, data);

    if (alwaysRenderSuggestions) {
      onSuggestionsFetchRequested({ value: data.suggestionValue });
    } else {
      _this3.onSuggestionsClearRequested();
    }

    _this3.resetHighlightedSuggestion();
  };

  this.onSuggestionClick = function(event) {
    var _props4 = _this3.props,
      alwaysRenderSuggestions = _props4.alwaysRenderSuggestions,
      focusInputOnSuggestionClick = _props4.focusInputOnSuggestionClick;

    var _getSuggestionIndices = _this3.getSuggestionIndices(
      _this3.findSuggestionElement(event.target)
    ),
      sectionIndex = _getSuggestionIndices.sectionIndex,
      suggestionIndex = _getSuggestionIndices.suggestionIndex;

    var clickedSuggestion = _this3.getSuggestion(sectionIndex, suggestionIndex);
    var clickedSuggestionValue = _this3.props.getSuggestionValue(
      clickedSuggestion
    );

    _this3.maybeCallOnChange(event, clickedSuggestionValue, 'click');
    _this3.onSuggestionSelected(event, {
      suggestion: clickedSuggestion,
      suggestionValue: clickedSuggestionValue,
      suggestionIndex: suggestionIndex,
      sectionIndex: sectionIndex,
      method: 'click'
    });

    if (!alwaysRenderSuggestions) {
      _this3.closeSuggestions();
    }

    if (focusInputOnSuggestionClick === true) {
      _this3.input.focus();
    } else {
      _this3.onBlur();
    }

    setTimeout(function() {
      _this3.justSelectedSuggestion = false;
    });
  };

  this.onBlur = function() {
    var _props5 = _this3.props,
      inputProps = _props5.inputProps,
      shouldRenderSuggestions = _props5.shouldRenderSuggestions;
    var value = inputProps.value, onBlur = inputProps.onBlur;

    var highlightedSuggestion = _this3.getHighlightedSuggestion();
    var shouldRender = shouldRenderSuggestions(value);

    _this3.setState({
      isFocused: false,
      highlightedSectionIndex: null,
      highlightedSuggestionIndex: null,
      valueBeforeUpDown: null,
      isCollapsed: !shouldRender
    });

    onBlur &&
      onBlur(_this3.blurEvent, {
        highlightedSuggestion: highlightedSuggestion
      });
  };

  this.resetHighlightedSuggestionOnMouseLeave = function() {
    _this3.resetHighlightedSuggestion(false); // shouldResetValueBeforeUpDown
  };

  this.itemProps = function(_ref4) {
    var sectionIndex = _ref4.sectionIndex, itemIndex = _ref4.itemIndex;

    return {
      'data-section-index': sectionIndex,
      'data-suggestion-index': itemIndex,
      onMouseEnter: _this3.onSuggestionMouseEnter,
      onMouseLeave: _this3.resetHighlightedSuggestionOnMouseLeave,
      onMouseDown: _this3.onSuggestionMouseDown,
      onTouchStart: _this3.onSuggestionMouseDown, // Because on iOS `onMouseDown` is not triggered
      onClick: _this3.onSuggestionClick
    };
  };

  this.renderSuggestionsContainer = function(_ref5) {
    var containerProps = _ref5.containerProps, children = _ref5.children;
    var renderSuggestionsContainer = _this3.props.renderSuggestionsContainer;

    return renderSuggestionsContainer({
      containerProps: containerProps,
      children: children,
      query: _this3.getQuery()
    });
  };
};

exports.default = Autosuggest;
