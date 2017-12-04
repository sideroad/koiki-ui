import React, { Component, PropTypes } from 'react';

// eslint-disable-next-line react/prefer-stateless-function
class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      escaped: false,
      value: props.value
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      value: props.value !== undefined ? props.value : this.state.value
    });
  }

  render() {
    const progress = `progress-${this.props.progress}-with-middle`;
    return (
      <form
        className={`${this.props.styles.input.container}
                    ${this.state.clicked ? this.props.styles.input.clicked :
                      this.state.escaped ? this.props.styles.input.escaped : ''}
                    ${this.props.className}
                    ${this.props.styles.input[progress]}
        `}
        onSubmit={
          (evt) => {
            evt.preventDefault();
            this.props.onSubmit({
              target: {
                value: this.inputDOM.value,
              }
            });
          }
        }
      >
        <input
          ref={(elem) => { this.inputDOM = elem; }}
          className={`${this.props.styles.input.input} ${this.props.styles.input[this.props.align]}`}
          placeholder={this.props.placeholder}
          value={this.state.value}
          type={this.props.type}
          pattern={this.props.type === 'number' ? '\\d*' : undefined}
          autoFocus={this.props.focused}
          onChange={(evt) => {
            this.setState({
              value: evt.target.value
            });
            this.props.onChange(evt);
          }}
          onKeyDown={(evt) => {
            switch (evt.key) {
              case 'Escape':
                blur(evt);
                break;
              default:
            }
            this.props.onKeyDown(evt);
          }}
          onBlur={evt => this.props.onBlur(evt)}
          onFocus={evt => this.props.onFocus(evt)}
        />
        <i
          className={`
            ${this.props.styles.fa.fa}
            ${this.props.styles.fa[this.props.icon]}
            ${this.props.styles.input.prefix}
          `}
          onClick={
            () => {
              this.inputDOM.focus();
            }
          }
          aria-hidden="true"
        />
      </form>
    );
  }
}

Input.propTypes = {
  className: PropTypes.string,
  styles: PropTypes.object,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  icon: PropTypes.string,
  progress: PropTypes.oneOf(['none', 'loading', 'success', 'error']),
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyDown: PropTypes.func,
  onSubmit: PropTypes.func,
  type: PropTypes.string,
  focused: PropTypes.bool,
  align: PropTypes.oneOf(['left', 'center', 'right']),
};

Input.defaultProps = {
  className: '',
  styles: {
    fa: require('../less/fa/less/font-awesome.less'),
    input: require('../less/input.less'),
  },
  placeholder: '',
  value: '',
  focused: false,
  icon: 'fa-search',
  progress: 'none',
  type: 'text',
  align: 'left',
  onBlur: () => {},
  onChange: () => {},
  onFocus: () => {},
  onKeyDown: () => {},
  onSubmit: () => {},
};

export default Input;
