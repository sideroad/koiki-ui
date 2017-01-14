import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Button from '../src/Button';
import customized from './less/button.less';

const actionLogger = action('clicked');

storiesOf('Button', module)
  .add('with basic usage', () => (
    <div className="button-wrap">
      <Button text="Search" />
    </div>
  ))
  .add('with customize icon', () => (
    <div className="button-wrap">
      <Button
        text="Edit"
        icon="fa-paint-brush"
      />
    </div>
  ))
  .add('with onClick handling', () => (
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
  .add('with disabled', () => (
    <div className="button-wrap">
      <Button
        text="Search"
        disabled
      />
    </div>
  ))
  .add('with customize styles', () => (
    <div className="button-wrap">
      <Button
        text="Search"
        styles={customized}
      />
    </div>
  ));
