import React from 'react';
import { storiesOf, action, setAddon } from '@kadira/storybook';
import infoAddon from '@kadira/react-storybook-addon-info';
import Input from '../src/Input';
import customized from './less/input.less';

setAddon(infoAddon);
const actionLogger = action();

storiesOf('Input', module)
  .addWithInfo('with basic usage', () => (
    <div className="input-wrap">
      <Input />
    </div>
  ))
  .addWithInfo('with placeholder', () => (
    <div className="input-wrap">
      <Input
        placeholder="Find something"
      />
    </div>
  ))
  .addWithInfo('with customize icon', () => (
    <div className="input-wrap">
      <Input
        icon="fa-paint-brush"
      />
    </div>
  ))
  .addWithInfo('with default value', () => (
    <div className="input-wrap">
      <Input
        value="FooBar"
      />
    </div>
  ))
  .addWithInfo('with event handler', () => (
    <div className="input-wrap">
      <Input
        onBlur={evt => actionLogger('blur', evt.target.value)}
        onChange={evt => actionLogger('change', evt.target.value)}
      />
    </div>
  ))
  .addWithInfo('with customize styles', () => (
    <div className="input-wrap">
      <Input
        styles={customized}
      />
    </div>
  ));
