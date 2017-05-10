import React from 'react';
import { storiesOf, action, setAddon } from '@kadira/storybook';
import infoAddon from '@kadira/react-storybook-addon-info';
import mockedInfoAddon from './react-storybook-addon-info-mock';
import Button from '../src/Button';
import fa from './less/fa/less/font-awesome.less';
import customized from './less/button.less';

if (process.env.NODE_ENV !== 'test') {
  setAddon(infoAddon);
} else {
  setAddon(mockedInfoAddon);
}

const actionLogger = action();

storiesOf('Button', module)
  .addWithInfo('with basic usage', () => (
    <div className="button-wrap">
      <Button
        text="Search"
      />
    </div>
  ))
  .addWithInfo('with customize icon', () => (
    <div className="button-wrap">
      <Button
        text="Edit"
        icon="fa-paint-brush"
      />
    </div>
  ))
  .addWithInfo('with colors', () => (
    <div className="button-wrap">
      <Button
        text="Search"
        color="primary"
      />
      <Button
        text="Search"
        color="secondary"
      />
      <Button
        text="Search"
        color="third"
      />
    </div>
  ))
  .addWithInfo('with append className', () => (
    <div className="button-wrap">
      <Button
        text="Search"
        className="foobar"
      />
    </div>
  ))
  .addWithInfo('with progress loading', () => (
    <div className="button-wrap">
      <Button
        text="Search"
        progress="loading"
      />
    </div>
  ))
  .addWithInfo('with progress success', () => (
    <div className="button-wrap">
      <Button
        text="Search"
        progress="success"
      />
    </div>
  ))
  .addWithInfo('with progress error', () => (
    <div className="button-wrap">
      <Button
        text="Search"
        progress="error"
      />
    </div>
  ))
  .addWithInfo('with event handling', () => (
    <div className="button-wrap">
      <Button
        text="Search"
        onClick={() => actionLogger('clicked')}
      />
    </div>
  ))
  .addWithInfo('with disabled', () => (
    <div className="button-wrap">
      <Button
        text="Search"
        disabled
      />
    </div>
  ))
  .addWithInfo('with customize styles', () => (
    <div className="button-wrap">
      <Button
        text="Search"
        styles={{
          fa,
          button: customized
        }}
      />
    </div>
  ));
