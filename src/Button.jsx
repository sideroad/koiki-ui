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
        className={`${this.props.styles.button.container}
                    ${this.state.clicked ? this.props.styles.button.clicked :
                      this.state.escaped ? this.props.styles.button.escaped : ''}
                    ${this.props.className}
                    ${this.props.styles.button[progress]}
        `}
      >
        <button
          className={`${this.props.styles.button.button} ${this.props.disabled ? this.props.styles.button.disabled : ''}`}
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
              ${this.props.styles.fa.fa}
              ${this.props.styles.fa[this.props.icon]}
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
  disabled: PropTypes.bool,
  icon: PropTypes.string,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  progress: PropTypes.oneOf(['none', 'loading', 'success', 'error']),
  styles: PropTypes.object
};

Button.defaultProps = {
  className: '',
  styles: {
    fa: require('../less/fa/less/font-awesome.less'),
    button: require('../less/button.less'),
  },
  disabled: false,
  icon: 'fa-search',
  progress: 'none',
  onClick: () => {}
};

export default Button;
