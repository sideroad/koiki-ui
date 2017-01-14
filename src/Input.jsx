import React, { Component, PropTypes } from 'react';
import fa from './less/fa/less/font-awesome.less';

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
      value: props.value || this.state.value
    });
  }

  render() {
    return (
      <div
        className={`${this.props.styles.container}
                    ${this.state.clicked ? this.props.styles.clicked :
                      this.state.escaped ? this.props.styles.escaped : ''}`}
      >
        <input
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
        />
        <i className={`${fa.fa} ${fa[this.props.icon]} ${this.props.styles.prefix}`} aria-hidden="true" />
      </div>
    );
  }
}

Input.propTypes = {
  styles: PropTypes.object,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  icon: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func
};

Input.defaultProps = {
  styles: require('./less/input.less'),
  placeholder: '',
  value: '',
  icon: 'fa-search',
  onBlur: () => {},
  onChange: () => {}
};

export default Input;
