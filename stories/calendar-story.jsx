import React from 'react';
import { storiesOf, action, setAddon } from '@kadira/storybook';
import infoAddon from '@kadira/react-storybook-addon-info';
import mockedInfoAddon from './react-storybook-addon-info-mock';
import Calendar from '../src/Calendar';

if (process.env.NODE_ENV !== 'test') {
  setAddon(infoAddon);
} else {
  setAddon(mockedInfoAddon);
}

const selected = ['2017-01-01', '2017-01-02', '2017-01-03'];
const selectedWithStyle = [
  { date: '2017-01-01', style: { opacity: 0.2 } },
  { date: '2017-01-02', style: { opacity: 0.5 } },
  { date: '2017-01-03', style: { opacity: 1 } },
];

const actionLogger = action();

storiesOf('Calendar', module)
  .addWithInfo('with basic usage', () => (
    <div className="calendar-wrap">
      <Calendar
        today={'2017-01-15'}
      />
    </div>
  ))
  .addWithInfo('with selected', () => (
    <div className="calendar-wrap">
      <Calendar
        today={'2017-01-15'}
        selected={selected}
      />
    </div>
  ))
  .addWithInfo('with selected and style', () => (
    <div className="calendar-wrap">
      <Calendar
        today={'2017-01-15'}
        selected={selectedWithStyle}
      />
    </div>
  ))
  .addWithInfo('with min and max', () => (
    <div className="calendar-wrap">
      <Calendar
        today={'2017-01-15'}
        min={'2017-01-05'}
        max={'2017-03-10'}
      />
    </div>
  ))
  .addWithInfo('with event handler', () => (
    <div className="calendar-wrap">
      <Calendar
        today={'2017-01-15'}
        onSelect={
          date => actionLogger('onSelect', date)
        }
      />
    </div>
  ));
