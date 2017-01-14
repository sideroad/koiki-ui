import React from 'react';
import { storiesOf, action, setAddon } from '@kadira/storybook';
import infoAddon from '@kadira/react-storybook-addon-info';
import Button from '../src/Button';
import customized from './less/button.less';

setAddon(infoAddon);
const actionLogger = action('clicked');

storiesOf('Button', module)
  .addWithInfo('with basic usage', () => (
    <div className="button-wrap">
      <Button text="Search" />
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
  .addWithInfo('with onClick handling', () => (
    <div className="button-wrap">
      <Button
        text="Search"
        onClick={
          () => {
            actionLogger();
          }
        }
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
        styles={customized}
      />
    </div>
  ));
