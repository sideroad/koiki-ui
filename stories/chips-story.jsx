import React from 'react';
import { storiesOf, action, setAddon } from '@kadira/storybook';
import infoAddon from '@kadira/react-storybook-addon-info';
import mockedInfoAddon from './react-storybook-addon-info-mock';
import Chips from '../src/Chips';

if (process.env.NODE_ENV !== 'test') {
  setAddon(infoAddon);
} else {
  setAddon(mockedInfoAddon);
}
const actionLogger = action();
const suggests = [];
const suggestsNoImage = [];
const chips = [];

const handleChange = (evt) => {
  actionLogger('handleChange');
  if (evt.target.value) {
    if (!suggests.length) {
      suggests.push({ id: 'sideroad', name: 'sideroad', image: 'https://avatars2.githubusercontent.com/u/411486?v=3&s=460' });
      suggests.push({ id: 'koikijs', name: 'koikijs', image: 'https://avatars2.githubusercontent.com/u/16383828?v=3&s=460' });
    }
  } else {
    suggests.shift();
    suggests.shift();
  }
};

const handleChangeNoImage = (evt) => {
  actionLogger('handleChange');
  if (evt.target.value) {
    if (!suggestsNoImage.length) {
      suggestsNoImage.push({ id: 'sideroad', name: 'sideroad' });
      suggestsNoImage.push({ id: 'koikijs', name: 'koikijs' });
    }
  } else {
    suggestsNoImage.shift();
    suggestsNoImage.shift();
  }
};

const handleSelect = (selected) => {
  actionLogger('handleSelect');
  chips.push(selected);
};

const handleDelete = () => {
  actionLogger('handleDelete');
  chips.pop();
};

storiesOf('Chips', module)
  .addWithInfo('with basic usage', () => (
    <div className="input-wrap">
      <Chips
        onChange={handleChange}
        onSelect={handleSelect}
        onDelete={handleDelete}
        suggests={suggests}
        chips={chips}
      />
    </div>
  ))
  .addWithInfo('with no image suggest', () => (
    <div className="input-wrap">
      <Chips
        onChange={handleChangeNoImage}
        onSelect={handleSelect}
        onDelete={handleDelete}
        suggests={suggestsNoImage}
        chips={chips}
      />
    </div>
  ));
