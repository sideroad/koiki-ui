import React, { Component, PropTypes } from 'react';
import fa from './less/fa/less/font-awesome.less';

// eslint-disable-next-line react/prefer-stateless-function
class InputtableButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      escaped: false,
      focused: props.focused
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
      value: props.value || this.state.value
    });
  }

  render() {
    const blur = (evt) => {
      this.setState({
        clicked: false,
        escaped: true
      });
      this.props.onBlur(evt);
    };
    return (
      <div
        className={`${this.props.styles.container}
                    ${this.state.clicked ? this.props.styles.clicked :
                                           this.state.escaped ? this.props.styles.escaped :
                                           this.state.focused ? this.props.styles.focused : ''}`}
      >
        <button
          className={this.props.styles.button}
          onClick={(evt) => {
            this.setState({
              clicked: true,
              escaped: false
            });
            this.inputDOM.focus();
            this.props.onClick(evt);
          }}
        >
          <i className={`${fa.fa} ${fa[this.props.icon]}`} aria-hidden="true" />{this.props.text}
        </button>
        <input
          ref={(elem) => { this.inputDOM = elem; }}
          className={this.props.styles.input}
          placeholder={this.props.placeholder}
          onKeyDown={(evt) => {
            switch (evt.key) {
              case 'Escape':
                blur(evt);
                break;
              default:
            }
          }}
          onChange={evt => this.props.onChange(evt)}
          onBlur={evt => blur(evt)}
        />
        <i className={`${fa.fa} ${fa[this.props.icon]} ${this.props.styles.prefix}`} aria-hidden="true" />
      </div>
    );
  }
}

InputtableButton.propTypes = {
  styles: PropTypes.object,
  icon: PropTypes.string,
  text: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  focused: PropTypes.bool
};

InputtableButton.defaultProps = {
  icon: 'fa-search',
  placeholder: '',
  onClick: () => {},
  onChange: () => {},
  onBlur: () => {},
  focused: false,
  styles: require('./less/inputtable-button.less')
};

export default InputtableButton;
