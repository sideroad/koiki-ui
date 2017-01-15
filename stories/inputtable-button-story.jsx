import React from 'react';
import { storiesOf, action, setAddon } from '@kadira/storybook';
import infoAddon from '@kadira/react-storybook-addon-info';
import mockedInfoAddon from './react-storybook-addon-info-mock';
import InputtableButton from '../src/InputtableButton';
import customized from './less/inputtable-button.less';

if (process.env.NODE_ENV !== 'test') {
  setAddon(infoAddon);
} else {
  setAddon(mockedInfoAddon);
}

const actionLogger = action();

storiesOf('InputtableButton', module)
  .addWithInfo('with basic usage', () => (
    <div className="input-wrap">
      <InputtableButton
        text="Search"
      />
    </div>
  ))
  .addWithInfo('with placeholder', () => (
    <div className="input-wrap">
      <InputtableButton
        text="Search"
        placeholder="Find something"
      />
    </div>
  ))
  .addWithInfo('with customize icon', () => (
    <div className="input-wrap">
      <InputtableButton
        text="Search"
        icon="fa-paint-brush"
      />
    </div>
  ))
  .addWithInfo('with default value', () => (
    <div className="input-wrap">
      <InputtableButton
        text="Search"
        value="FooBar"
      />
    </div>
  ))
  .addWithInfo('with focused', () => (
    <div className="input-wrap">
      <InputtableButton
        text="Search"
        focused
      />
    </div>
  ))
  .addWithInfo('with event handler', () => (
    <div className="input-wrap">
      <InputtableButton
        text="Search"
        onBlur={evt => actionLogger('blur', evt.target.value)}
        onChange={evt => actionLogger('change', evt.target.value)}
      />
    </div>
  ))
  .addWithInfo('with customize styles', () => (
    <div className="input-wrap">
      <InputtableButton
        text="Search"
        styles={customized}
      />
    </div>
  ));
