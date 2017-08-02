import React from 'react';
import { storiesOf, action, setAddon } from '@kadira/storybook';
import infoAddon from '@kadira/react-storybook-addon-info';
import mockedInfoAddon from './react-storybook-addon-info-mock';
import Checkbox from '../src/Checkbox';

if (process.env.NODE_ENV !== 'test') {
  setAddon(infoAddon);
} else {
  setAddon(mockedInfoAddon);
}

const actionLogger = action();

storiesOf('Checkbox', module)
  .addWithInfo('with basic usage', () => (
    <div className="checkbox-wrap">
      <Checkbox
        onClick={() => actionLogger('click')}
      />
      <Checkbox
        checked
        onClick={() => actionLogger('click')}
      />
    </div>
  ));
