import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import InputtableButton from '../src/InputtableButton';
import customized from './less/inputtable-button.less';

const actionLogger = action();

storiesOf('InputtableButton', module)
  .add('with basic usage', () => (
    <div className="input-wrap">
      <InputtableButton
        text="Search"
      />
    </div>
  ))
  .add('with placeholder', () => (
    <div className="input-wrap">
      <InputtableButton
        text="Search"
        placeholder="Find something"
      />
    </div>
  ))
  .add('with customize icon', () => (
    <div className="input-wrap">
      <InputtableButton
        text="Search"
        icon="fa-paint-brush"
      />
    </div>
  ))
  .add('with default value', () => (
    <div className="input-wrap">
      <InputtableButton
        text="Search"
        value="FooBar"
      />
    </div>
  ))
  .add('with focused', () => (
    <div className="input-wrap">
      <InputtableButton
        text="Search"
        focused
      />
    </div>
  ))
  .add('with event handler', () => (
    <div className="input-wrap">
      <InputtableButton
        text="Search"
        onBlur={evt => actionLogger('blur', evt.target.value)}
        onChange={evt => actionLogger('change', evt.target.value)}
      />
    </div>
  ))
  .add('with customize styles', () => (
    <div className="input-wrap">
      <InputtableButton
        text="Search"
        styles={customized}
      />
    </div>
  ));
