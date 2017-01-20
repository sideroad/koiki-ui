import React, { Component, PropTypes } from 'react';

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
    const progress = `progress-${this.props.progress}`;
    return (
      <div
        className={`${this.props.styles.container}
                    ${this.state.clicked ? this.props.styles.clicked :
                      this.state.escaped ? this.props.styles.escaped : ''}
                    ${this.props.className}
                    ${this.props.styles[progress]}
        `}
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
          <i
            className={`
              ${this.props.fa.fa}
              ${this.props.fa[this.props.icon]}
            `}
            aria-hidden="true"
          />
          {this.props.text}
        </button>
      </div>
    );
  }
}

Button.propTypes = {
  className: PropTypes.string,
  fa: PropTypes.object,
  disabled: PropTypes.bool,
  icon: PropTypes.string,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  progress: PropTypes.oneOf(['none', 'loading', 'success', 'error']),
  styles: PropTypes.object
};

Button.defaultProps = {
  className: '',
  fa: require('../less/fa/less/font-awesome.less'),
  styles: require('../less/button.less'),
  disabled: false,
  icon: 'fa-search',
  progress: 'none',
  onClick: () => {}
};

export default Button;
