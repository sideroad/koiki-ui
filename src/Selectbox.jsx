import React, { PropTypes, Component } from 'react';

class Selectbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: false,
      focusedIndex: props.options.reduce((memo, option, index) =>
        (option.value === props.selected.value ? index : memo), 0),
      selected: props.selected
    };
  }
  componentDidMount() {
    this.wrappedHandleClickOutside = evt =>
      this.handleClickOutside(evt, this.selectboxDOM, this.optionsDOM);
    document.addEventListener('click', this.wrappedHandleClickOutside, true);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.wrappedHandleClickOutside, true);
  }

  handleClickOutside(evt, selectboxDOM, optionsDOM) {
    if ((!selectboxDOM || !selectboxDOM.contains(evt.target)) &&
        (!optionsDOM || !optionsDOM.contains(evt.target))
    ) {
      this.setState({
        display: false
      });
    }
  }

  render() {
    const select = (option, index) => {
      this.props.onSelect(option);
      this.setState({
        display: false,
        selected: option,
        focusedIndex: index
      });
      this.selectboxDOM.blur();
    };
    return (
      <form
        className={`${this.props.className} ${this.props.styles.selectbox.form}`}
        onSubmit={
          (evt) => {
            evt.preventDefault();
          }
        }
      >
        <button
          className={`
            ${this.props.styles.selectbox.selectbox}
            ${this.props.options.length ? this.props.styles.selectbox.hasSuggest : ''}
          `}
          ref={(elem) => { this.selectboxDOM = elem; }}
          icon={this.props.icon}
          placeholder={this.props.placeholder}
          onKeyDown={
            (evt) => {
              switch (evt.key) {
                case 'Enter': {
                  const option = this.props.options[this.state.focusedIndex];
                  if (option) {
                    select(option, this.state.focusedIndex);
                  }
                  break;
                }
                case 'ArrowDown':
                  if (this.props.options.length - 1 > this.state.focusedIndex) {
                    this.setState({
                      focusedIndex: this.state.focusedIndex + 1
                    });
                  }
                  break;
                case 'ArrowUp':
                  if (this.state.focusedIndex > 0) {
                    this.setState({
                      focusedIndex: this.state.focusedIndex - 1
                    });
                  }
                  break;
                default:
              }
            }
          }
          onClick={
            (evt) => {
              this.setState({
                display: true
              });
              this.props.onFocus(evt);
            }
          }
          onBlur={this.props.onBlur}
        >
          {
            this.state.selected.image ?
              <img
                className={this.props.styles.selectbox.icon}
                src={this.state.selected.image}
                alt={this.state.selected.text}
              />
            : null
          }
          {this.state.selected.value || ''}
          <div className={this.props.styles.selectbox.caset}>
            <i className={`${this.props.styles.fa.fa} ${this.props.styles.fa['fa-caret-down']}`} />
          </div>
        </button>
        <div className={this.props.styles.selectbox.container}>
          {
            this.state.display ?
              <ul
                ref={(elem) => { this.optionsDOM = elem; }}
                className={this.props.styles.selectbox.options}
              >
                {
                  this.props.options
                    .map((option, index) =>
                      <li
                        key={option.value}
                      >
                        <a
                          className={`
                            ${this.props.styles.selectbox.option}
                            ${index === this.state.focusedIndex ||
                              option.value === this.state.selected.value ? this.props.styles.selectbox.focused : ''}
                          `}
                          href=""
                          onClick={
                            (evt) => {
                              evt.preventDefault();
                              select(option, index);
                            }
                          }
                        >
                          {
                            option.image ?
                              <img
                                className={this.props.styles.selectbox.icon}
                                src={option.image}
                                alt={option.text}
                              />
                            : null
                          }
                          <div className={this.props.styles.selectbox.text} >{option.text}</div>
                        </a>
                      </li>
                    )
                }
              </ul> : ''
            }
        </div>
      </form>
    );
  }
}

Selectbox.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string,
  selected: PropTypes.shape({
    text: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    image: PropTypes.string
  }),
  onSelect: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    image: PropTypes.string
  })),
  placeholder: PropTypes.string,
  styles: PropTypes.object
};

Selectbox.defaultProps = {
  className: '',
  selected: {
    text: '',
    value: ''
  },
  icon: 'fa-search',
  onSelect: () => {},
  onFocus: () => {},
  onBlur: () => {},
  options: [],
  placeholder: '',
  styles: {
    fa: require('../less/fa/less/font-awesome.less'),
    selectbox: require('../less/selectbox.less'),
    input: require('../less/input.less'),
    iconButton: require('../less/icon-button.less')
  }
};

export default Selectbox;
