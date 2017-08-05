import React from 'react';
import { storiesOf, action, setAddon } from '@kadira/storybook';
import infoAddon from '@kadira/react-storybook-addon-info';
import mockedInfoAddon from './react-storybook-addon-info-mock';
import Selectbox from '../src/Selectbox';

if (process.env.NODE_ENV !== 'test') {
  setAddon(infoAddon);
} else {
  setAddon(mockedInfoAddon);
}
const actionLogger = action();
const options = [
  { value: 'sideroad', text: 'sideroad', image: 'https://avatars2.githubusercontent.com/u/411486?v=3&s=460' },
  { value: 'koikijs', text: 'koikijs', image: 'https://avatars2.githubusercontent.com/u/16383828?v=3&s=460' }
];
const optionsNoImage = [
  { value: 'sideroad', text: 'sideroad' },
  { value: 'koikijs', text: 'koikijs' }
];

const handleSelect = (selected) => {
  actionLogger('handleSelect', selected);
};

const handleFocus = () => {
  actionLogger('handleFocus');
};

const handleBlur = () => {
  actionLogger('handleBlur');
};

storiesOf('Selectbox', module)
  .addWithInfo('with basic usage', () => (
    <div className="input-wrap">
      <Selectbox
        onSelect={handleSelect}
        onFocus={handleFocus}
        onBlur={handleBlur}
        options={options}
      />
    </div>
  ))
  .addWithInfo('with no image suggest', () => (
    <div className="input-wrap">
      <Selectbox
        onSelect={handleSelect}
        onFocus={handleFocus}
        onBlur={handleBlur}
        options={optionsNoImage}
      />
    </div>
  ));
