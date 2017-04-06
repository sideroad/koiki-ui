import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import __ from 'lodash';
import Swipeable from 'react-swipeable';

// eslint-disable-next-line react/prefer-stateless-function
class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: moment.utc(this.props.date, 'YYYY-MM-DD'),
      className: '',
      swiping: false
    };
  }

  nextMonth(swiping) {
    const that = this;
    this.setState({
      date: moment.utc(this.state.date).add(1, 'months'),
      className: 'nextMonth',
      swiping
    });
    setTimeout(() => that.setState({ className: '', swiping: false }), 300);
  }

  prevMonth(swiping) {
    const that = this;
    this.setState({
      date: moment.utc(this.state.date).subtract(1, 'months'),
      className: 'prevMonth',
      swiping
    });
    setTimeout(() => that.setState({ className: '', swiping: false }), 300);
  }

  swiped() {
    this.setState({
      swiping: false
    });
  }

  swipingNext() {
    if (!this.state.swiping) {
      this.nextMonth(true);
    }
  }

  swipingPrev() {
    if (!this.state.swiping) {
      this.prevMonth(true);
    }
  }

  select(evt, _date) {
    evt.preventDefault();
    evt.target.blur();
    if (_date.isAfter(this.state.date, 'month')) {
      this.nextMonth(evt);
    }
    if (_date.isBefore(this.state.date, 'month')) {
      this.prevMonth(evt);
    }
    this.props.onSelect(_date.format('YYYY-MM-DD'));
  }

  render() {
    const start = moment.utc(this.state.date).startOf('month').startOf('week');
    const end = moment.utc(this.state.date).endOf('month').endOf('week');
    const linesOfWeek = (end.diff(start, 'days') + 1) / 7;
    const isEnablePrevMonth = !this.props.min ? true :
                               start.isSameOrAfter(this.props.min);
    const isEnableNextMonth = !this.props.max ? true :
                               end.isSameOrBefore(this.props.max);

    return (
      <Swipeable
        className={`${this.props.styles.calendar.calendar} ${this.props.className}`}
        onSwipingRight={this.swipingPrev}
        onSwipedRight={this.swiped}
        onSwipingLeft={this.swipingNext}
        onSwipedLeft={this.swiped}
      >
        <div
          ref={(elem) => { this.calendarDOM = elem; }}
        >
          <div className={`${this.props.styles.calendar.control}`}>
            <div className={this.props.styles.calendar.prev}>
              {
                isEnablePrevMonth ?
                  <a
                    className={this.props.styles.calendar.link}
                    onClick={(evt) => {
                      evt.preventDefault();
                      this.prevMonth();
                    }}
                    href=""
                  >
                    <div className={this.props.styles.calendar.linkcircle} />
                    <span><i className={`${this.props.styles.fa.fa} ${this.props.styles.fa['fa-chevron-left']}`} aria-hidden="true" /></span>
                  </a>
                : null
              }
            </div>
            <div className={`${this.props.styles.calendar.month} ${this.props.styles.calendar[this.state.className]}`}>
              {`${this.state.date.format('MMMM')} ${this.state.date.format('YYYY')}`}
            </div>
            <div className={this.props.styles.calendar.next}>
              {
                isEnableNextMonth ?
                  <a
                    className={this.props.styles.calendar.link}
                    onClick={(evt) => {
                      evt.preventDefault();
                      this.nextMonth();
                    }}
                    href=""
                  >
                    <div className={this.props.styles.calendar.linkcircle} />
                    <span><i className={`${this.props.styles.fa.fa} ${this.props.styles.fa['fa-chevron-right']}`} aria-hidden="true" /></span>
                  </a>
                : null
              }
            </div>
          </div>
          <table className={`${this.props.styles.calendar.table} ${this.props.styles.calendar[this.state.className]}`}>
            <thead>
              <tr>
                {__.times(7, index =>
                  <th key={index} className={this.props.styles.calendar.weekday}>
                    {moment().weekday(index).format('ddd')}
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {
                __.times(linesOfWeek, week =>
                  <tr key={week}>
                    {__.times(7, (weekday) => {
                      const dateOfWeekday = moment.utc(start).add((week * 7) + weekday, 'days');
                      const timeOfWeekday = dateOfWeekday.toDate().getTime();
                      const dateClassName = [
                        (__.some(this.props.selected, item =>
                          dateOfWeekday.isSame(moment.utc(__.isString(item) ? item : item.date).startOf('date'))) ? this.props.styles.calendar.selected : ''
                        ),
                        (dateOfWeekday.isSame(moment.utc(this.props.today, 'YYYY-MM-DD').startOf('date')) ? this.props.styles.calendar.today :
                         __.some(this.props.holidays, item =>
                          dateOfWeekday.isSame(moment.utc(item).startOf('date'))) ? this.props.styles.calendar.holiday :
                        !dateOfWeekday.isSame(this.state.date, 'month') ? this.props.styles.calendar.outside : ''),
                        (this.props.styles.calendar[dateOfWeekday.format('ddd').toLowerCase()])
                      ].join(' ');
                      const selected = __.find(this.props.selected, item =>
                        !__.isString(item) && dateOfWeekday.isSame(moment.utc(item.date).startOf('date'))
                      ) || {};
                      return (
                        <td key={timeOfWeekday} className={this.props.styles.calendar.col}>
                          <div
                            className={dateClassName}
                          >
                            <div className={this.props.styles.calendar.date}>
                              {
                                (this.props.min &&
                                 moment.utc(this.props.min, 'YYYY-MM-DD').toDate().getTime() > timeOfWeekday) ||
                                (this.props.max &&
                                 moment.utc(this.props.max, 'YYYY-MM-DD').toDate().getTime() < timeOfWeekday) ?
                                   <div className={this.props.styles.calendar.disabled} >
                                     <span>{dateOfWeekday.date()}</span>
                                   </div>
                                 :
                                   <a
                                     className={this.props.styles.calendar.link}
                                     href=""
                                     onClick={evt => this.select(evt, dateOfWeekday)}
                                   >
                                     <div
                                       className={this.props.styles.calendar.linkcircle}
                                       style={
                                          selected.style || {}
                                       }
                                     />
                                     <span>{dateOfWeekday.date()}</span>
                                   </a>
                              }
                            </div>
                          </div>
                        </td>);
                    })}
                  </tr>
                )
              }
            </tbody>
          </table>
        </div>
      </Swipeable>
    );
  }
}

Calendar.propTypes = {
  className: PropTypes.string,
  date: PropTypes.string,
  today: PropTypes.string,
  min: PropTypes.string,
  max: PropTypes.string,
  holidays: PropTypes.array,
  selected: PropTypes.array,
  onSelect: PropTypes.func,
  styles: PropTypes.object,
};

Calendar.defaultProps = {
  className: '',
  date: moment.utc().startOf('date').format('YYYY-MM-DD'),
  today: moment.utc().format('YYYY-MM-DD'),
  min: undefined,
  max: undefined,
  holidays: [],
  selected: [],
  onSelect: () => {},
  styles: {
    fa: require('../less/fa/less/font-awesome.less'),
    calendar: require('../less/calendar.less'),
  },
};

export default Calendar;
