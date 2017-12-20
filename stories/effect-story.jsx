import React from 'react';
import { storiesOf, setAddon } from '@kadira/storybook';
import infoAddon from '@kadira/react-storybook-addon-info';
import mockedInfoAddon from './react-storybook-addon-info-mock';
import Effect from '../src/Effect';

if (process.env.NODE_ENV !== 'test') {
  setAddon(infoAddon);
} else {
  setAddon(mockedInfoAddon);
}

storiesOf('Effect', module)
  .addWithInfo('with liquid effect', () => (
    <div className="effect-wrap">
      <Effect
        liquid
        strength={10}
        src="./images/blueboard.jpg"
      />
    </div>
  ))
  .addWithInfo('with ripple effect', () => (
    <div className="effect-wrap">
      <Effect
        ripple
        time={0.005}
        wavelength={25}
        speed={500}
        amplitude={20}
        interval={5000}
        src="./images/goldgrazing.jpg"
      />
    </div>
  ))
  .addWithInfo('with liquid and ripple effect', () => (
    <div className="effect-wrap">
      <Effect
        liquid
        ripple
        strength={5}
        time={0.005}
        wavelength={25}
        speed={500}
        amplitude={20}
        interval={5000}
        src="./images/goldgrazing.jpg"
      />
    </div>
  ));
