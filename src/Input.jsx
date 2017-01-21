import React, { Component, PropTypes } from 'react';

// eslint-disable-next-line react/prefer-stateless-function
class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      escaped: false,
      focused: props.focused,
      value: props.value
    };
  }

  componentDidMount() {
    if (this.props.focused &&
        this.inputDOM) {
      this.inputDOM.focus();
    }
  }

  componentWillReceiveProps(props) {
    this.setState({
      value: props.value !== undefined ? props.value : this.state.value
    });
  }

  render() {
    const progress = `progress-${this.props.progress}-with-middle`;
    return (
      <div
        className={`${this.props.styles.container}
                    ${this.state.clicked ? this.props.styles.clicked :
                      this.state.escaped ? this.props.styles.escaped : ''}
                    ${this.props.className}
                    ${this.props.styles[progress]}
        `}
      >
        <input
          ref={(elem) => { this.inputDOM = elem; }}
          className={this.props.styles.input}
          placeholder={this.props.placeholder}
          value={this.state.value}
          onChange={(evt) => {
            this.setState({
              value: evt.target.value
            });
            this.props.onChange(evt);
          }}
          onBlur={evt => this.props.onBlur(evt)}
          onFocus={evt => this.props.onFocus(evt)}
        />
        <i
          className={`
            ${this.props.fa.fa}
            ${this.props.fa[this.props.icon]}
            ${this.props.styles.prefix}
          `}
          aria-hidden="true"
        />
      </div>
    );
  }
}

Input.propTypes = {
  className: PropTypes.string,
  fa: PropTypes.object,
  styles: PropTypes.object,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  icon: PropTypes.string,
  focused: PropTypes.bool,
  progress: PropTypes.oneOf(['none', 'loading', 'success', 'error']),
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
};

Input.defaultProps = {
  className: '',
  fa: require('../less/fa/less/font-awesome.less'),
  styles: require('../less/input.less'),
  placeholder: '',
  value: '',
  icon: 'fa-search',
  focused: false,
  progress: 'none',
  onBlur: () => {},
  onChange: () => {},
  onFocus: () => {}
};

export default Input;
