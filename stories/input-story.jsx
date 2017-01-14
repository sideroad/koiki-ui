import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Input from '../src/Input';
import customized from './less/input.less';

const actionLogger = action();

storiesOf('Input', module)
  .add('with basic usage', () => (
    <div className="input-wrap">
      <Input />
    </div>
  ))
  .add('with placeholder', () => (
    <div className="input-wrap">
      <Input
        placeholder="Find something"
      />
    </div>
  ))
  .add('with customize icon', () => (
    <div className="input-wrap">
      <Input
        icon="fa-paint-brush"
      />
    </div>
  ))
  .add('with default value', () => (
    <div className="input-wrap">
      <Input
        value="FooBar"
      />
    </div>
  ))
  .add('with event handler', () => (
    <div className="input-wrap">
      <Input
        onBlur={evt => actionLogger('blur', evt.target.value)}
        onChange={evt => actionLogger('change', evt.target.value)}
      />
    </div>
  ))
  .add('with customize styles', () => (
    <div className="input-wrap">
      <Input
        styles={customized}
      />
    </div>
  ));
