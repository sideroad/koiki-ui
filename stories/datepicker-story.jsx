import React from 'react';
import { storiesOf, setAddon } from '@kadira/storybook';
import infoAddon from '@kadira/react-storybook-addon-info';
import mockedInfoAddon from './react-storybook-addon-info-mock';
import Datepicker from '../src/Datepicker';

if (process.env.NODE_ENV !== 'test') {
  setAddon(infoAddon);
} else {
  setAddon(mockedInfoAddon);
}

storiesOf('Datepicker', module)
  .addWithInfo('with basic usage', () => (
    <div className="button-wrap">
      <Datepicker
        placeholder="Please select dates"
        selected={['2017-01-01']}
      />
    </div>
  ));
