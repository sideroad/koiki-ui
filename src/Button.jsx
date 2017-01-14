import React, { Component, PropTypes } from 'react';
import fa from './less/fa/less/font-awesome.less';

// eslint-disable-next-line react/prefer-stateless-function
class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      escaped: false
    };
  }

  render() {
    return (
      <div
        className={`${this.props.styles.container} ${this.state.clicked ? this.props.styles.clicked :
                                                     this.state.escaped ? this.props.styles.escaped : ''}`}
      >
        <button
          className={`${this.props.styles.button} ${this.props.disabled ? this.props.styles.disabled : ''}`}
          onClick={() => {
            if (!this.props.disabled) {
              this.setState({
                clicked: this.state.clicked !== true,
                escaped: this.state.clicked === true
              });
              this.props.onClick();
            }
          }}
        >
          <i className={`${fa.fa} ${fa[this.props.icon]}`} aria-hidden="true" />{this.props.text}
        </button>
      </div>
    );
  }
}

Button.propTypes = {
  disabled: PropTypes.bool,
  icon: PropTypes.string,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  styles: PropTypes.object
};

Button.defaultProps = {
  styles: require('./less/button.less'),
  disabled: false,
  icon: 'fa-search',
  onClick: () => {}
};

export default Button;
