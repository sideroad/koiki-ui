import React, { Component, PropTypes } from 'react';
import TetherComponent from 'react-tether';
import _ from 'lodash';
import Calendar from './Calendar';
import format from './dates-format';

// eslint-disable-next-line react/prefer-stateless-function
class Datepicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: false,
      selected: props.selected
    };
  }
  componentDidMount() {
    this.wrappedHandleClickOutside = evt =>
      this.handleClickOutside(evt, this.containerDOM, this.calendar);
    document.addEventListener('click', this.wrappedHandleClickOutside, true);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.wrappedHandleClickOutside, true);
  }

  handleClickOutside(evt, containerDOM, calendar) {
    if (
        (!containerDOM || !containerDOM.contains(evt.target)) &&
        (!calendar || !calendar.calendarDOM || !calendar.calendarDOM.contains(evt.target))) {
      this.setState({
        opened: false
      });
    }
  }

  render() {
    return (
      <div
        className={this.props.className}
      >
        <TetherComponent
          classes={{
            element: this.props.styles.tether
          }}
          attachment="top left"
          targetAttachment="bottom left"
        >
          <div
            ref={(elem) => { this.containerDOM = elem; }}
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
                  format({
                    dates: this.state.selected.sort(),
                    format: this.props.format,
                    delimiter: this.props.delimiter,
                    range: this.props.range
                  }) || this.props.placeholder
                }
              </span>
            </button>
          </div>
          <Calendar
            ref={(elem) => { this.calendar = elem; }}
            className={`
              ${this.props.styles.calendar}
              ${this.state.opened ? this.props.styles.opened : this.props.styles.closed}`}
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
        </TetherComponent>
      </div>
    );
  }
}

Datepicker.propTypes = {
  className: PropTypes.string,
  fa: PropTypes.object,
  date: PropTypes.string,
  format: PropTypes.string,
  delimiter: PropTypes.string,
  range: PropTypes.string,
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
  delimiter: ', ',
  range: ' - ',
  selected: [],
  placeholder: '',
  fa: require('../less/fa/less/font-awesome.less'),
  styles: require('../less/datepicker.less'),
  icon: 'fa-calendar',
  onClick: () => {}
};

export default Datepicker;
