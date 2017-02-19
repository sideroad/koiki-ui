import React from 'react';
import { storiesOf, setAddon } from '@kadira/storybook';
import infoAddon from '@kadira/react-storybook-addon-info';
import mockedInfoAddon from './react-storybook-addon-info-mock';
import Timeline from '../src/Timeline';

if (process.env.NODE_ENV !== 'test') {
  setAddon(infoAddon);
} else {
  setAddon(mockedInfoAddon);
}

storiesOf('Timeline', module)
  .addWithInfo('with basic usage', () => (
    <div className="timeline-wrap">
      <Timeline
        ticksMinutes={3 * 60}
        offsetMinutes={8.5 * 60}
        start="2017-02-18T15:00:00.000Z"
        end="2017-02-25T14:59:59.999Z"
        items={[
          {
            id: '111',
            periods: [
              {
                id: '111-111',
                start: '2017-02-19T00:00:00.000Z',
                end: '2017-02-19T08:30:00.000Z',
                className: 'flight'
              }, {
                id: '111-222',
                start: '2017-02-20T00:00:00.000Z',
                end: '2017-02-20T08:30:00.000Z',
                className: ''
              }
            ]
          },
          {
            id: '222',
            periods: [
              {
                id: '222-111',
                start: '2017-02-19T01:00:00.000Z',
                end: '2017-02-19T08:30:00.000Z',
                className: ''
              }
            ]
          },
          {
            id: '333',
            periods: [
              {
                id: '333-111',
                start: '2017-02-19T00:00:00.000Z',
                end: '2017-02-19T03:00:00.000Z',
                className: ''
              }, {
                id: '333-222',
                start: '2017-02-20T00:00:00.000Z',
                end: '2017-02-20T08:30:00.000Z',
                className: ''
              }
            ]
          },
          {
            id: '444',
            periods: [
              {
                id: '444-111',
                start: '2017-02-19T00:00:00.000Z',
                end: '2017-02-19T08:30:00.000Z',
                className: ''
              }, {
                id: '444-222',
                start: '2017-02-20T00:00:00.000Z',
                end: '2017-02-20T08:30:00.000Z',
                className: ''
              }
            ]
          },
          {
            id: '555',
            periods: [
              {
                id: '555-111',
                start: '2017-02-19T00:00:00.000Z',
                end: '2017-02-19T08:30:00.000Z',
                className: ''
              }, {
                id: '555-222',
                start: '2017-02-20T00:00:00.000Z',
                end: '2017-02-20T08:30:00.000Z',
                className: ''
              }
            ]
          },
          {
            id: '666',
            periods: [
              {
                id: '666-111',
                start: '2017-02-19T00:00:00.000Z',
                end: '2017-02-19T08:30:00.000Z',
                className: ''
              }, {
                id: '666-222',
                start: '2017-02-20T00:00:00.000Z',
                end: '2017-02-20T08:30:00.000Z',
                className: ''
              }
            ]
          },
          {
            id: '777',
            periods: [
              {
                id: '777-111',
                start: '2017-02-19T00:00:00.000Z',
                end: '2017-02-19T08:30:00.000Z',
                className: ''
              }, {
                id: '777-222',
                start: '2017-02-20T00:00:00.000Z',
                end: '2017-02-20T08:30:00.000Z',
                className: ''
              }
            ]
          }
        ]}
      />
    </div>
  ));
