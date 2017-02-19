import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import ElementPan from 'react-element-pan';
import _ from 'lodash';

const DATE_OF_SECONDS = 86400;
const DATE_OF_MINUTES = 1440;

// eslint-disable-next-line
class Timeline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayed: 0,
      x: (props.widthOfDate / DATE_OF_MINUTES) * props.offsetMinutes
    };
  }
  render() {
    moment.locale(this.props.lang);
    const width = moment(this.props.end).diff(moment(this.props.start), 'days') * this.props.widthOfDate;
    const timeWidth = (this.props.widthOfDate / DATE_OF_MINUTES) * this.props.ticksMinutes;
    return (
      <div
        className={this.props.styles.timeline.container}
      >
        <ul
          className={this.props.styles.timeline.dates}
          style={{
            width
          }}
        >
          <li
            className={this.props.styles.timeline.currentDate}
          >
            {moment(this.props.start).add(this.state.displayed, 'days').format(this.props.dateFormat)}
          </li>
        </ul>
        <ul
          className={this.props.styles.timeline.times}
          style={{
            width,
            marginLeft: this.state.x * -1
          }}
        >
          {
            _.times(moment(this.props.end).diff(moment(this.props.start), 'days'), daysIndex =>
              _.times(DATE_OF_MINUTES / this.props.ticksMinutes, timesIndex =>
                <li
                  key={`${daysIndex}-${timesIndex}`}
                  className={this.props.styles.timeline.time}
                  style={{
                    width: timeWidth
                  }}
                >
                  {
                    moment()
                      .startOf('date')
                      .add(timesIndex * this.props.ticksMinutes, 'minutes')
                      .format(this.props.timeFormat)
                  }
                </li>
              )
            )
          }
        </ul>
        <ElementPan
          startX={this.state.x}
          className={this.props.styles.timeline.pan}
          onPan={({ x }) => {
            const displayed = Math.floor(x / this.props.widthOfDate);
            this.setState({
              displayed,
              x
            });
          }}
        >
          <ul
            className={this.props.styles.timeline.timeline}
            style={{
              width
            }}
          >
            {
              this.props.items.map(item =>
                <li
                  key={item.id}
                  className={this.props.styles.timeline.line}
                >
                  <ul>
                    {
                      item.periods.map(period =>
                        <li
                          key={period.id}
                          className={`${this.props.styles.timeline.period} ${period.className ? period.className : ''}`}
                          style={{
                            left: moment(period.start).diff(moment(this.props.start), 'seconds') * (this.props.widthOfDate / DATE_OF_SECONDS),
                            width: moment(period.end).diff(moment(period.start), 'seconds') * (this.props.widthOfDate / DATE_OF_SECONDS)
                          }}
                        >
                          <div className={this.props.styles.timeline.start} />
                          <div className={this.props.styles.timeline.end} />
                        </li>
                      )
                    }
                  </ul>
                </li>
              )
            }
          </ul>
        </ElementPan>
      </div>
    );
  }
}

Timeline.propTypes = {
  lang: PropTypes.string,
  start: PropTypes.string.isRequired,
  end: PropTypes.string.isRequired,
  items: PropTypes.array,
  widthOfDate: PropTypes.number,
  offsetMinutes: PropTypes.number,
  ticksMinutes: PropTypes.number,
  timeFormat: PropTypes.string,
  dateFormat: PropTypes.string,
  styles: PropTypes.object,
};

Timeline.defaultProps = {
  lang: moment.locale(),
  items: [],
  widthOfDate: 800,
  offsetMinutes: 0,
  ticksMinutes: 180,
  timeFormat: 'HH:mm',
  dateFormat: 'll',
  styles: {
    timeline: require('../less/timeline.less')
  }
};

export default Timeline;
