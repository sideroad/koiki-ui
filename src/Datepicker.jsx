import React, { Component, PropTypes } from 'react';
import TetherComponent from 'react-tether';
import _ from 'lodash';
import moment from 'moment';
import Calendar from './Calendar';

// eslint-disable-next-line react/prefer-stateless-function
class Datepicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: false,
      selected: props.selected
    };
  }

  render() {
    return (
      <TetherComponent
        attachment="top left"
        targetAttachment="bottom left"
        className={`
          ${this.props.className}
        `}
      >
        <div
          className={this.props.styles.container}
        >
          <button
            className={this.props.styles.button}
            onClick={() => {
              this.setState({
                opened: !this.state.opened
              });
              this.props.onClick();
            }}
          >
            <i
              className={`
                ${this.props.fa.fa}
                ${this.props.fa[this.props.icon]}
              `}
              aria-hidden="true"
            />
            <span
              className={this.state.selected.length ? this.props.styles.date
                                                    : this.props.styles.placeholder}
            >
              {
                this.state.selected
                  .sort()
                  .map(date => moment(date).format(this.props.format))
                  .join(', ') || this.props.placeholder
              }
            </span>
          </button>
        </div>
        {
          this.state.opened ?
            <Calendar
              className={this.props.styles.calendar}
              selected={this.state.selected}
              onSelect={
                (date) => {
                  if (this.state.selected.indexOf(date) === -1) {
                    this.setState({
                      selected: this.state.selected.concat([date])
                    });
                  } else {
                    this.setState({
                      selected: _.pull(this.state.selected, date)
                    });
                  }
                }
              }
            />
          : null
        }
      </TetherComponent>
    );
  }
}

Datepicker.propTypes = {
  className: PropTypes.string,
  fa: PropTypes.object,
  date: PropTypes.string,
  format: PropTypes.string,
  placeholder: PropTypes.string,
  icon: PropTypes.string,
  onClick: PropTypes.func,
  styles: PropTypes.object,
  selected: PropTypes.array
};

Datepicker.defaultProps = {
  className: '',
  date: '',
  format: 'MMM D',
  selected: [],
  placeholder: '',
  fa: require('../less/fa/less/font-awesome.less'),
  styles: require('../less/datepicker.less'),
  icon: 'fa-calendar',
  onClick: () => {}
};

export default Datepicker;
