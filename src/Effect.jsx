/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import constants from './images/constants';

const styles = require('../less/effect.less');

// eslint-disable-next-line prefer-stateless-function
class Effect extends Component {
  componentDidMount() {
    const canvasDOM = this.canvasDOM;
    // prevent error for node environment
    if (!canvasDOM) {
      return;
    }
    const parent = canvasDOM.parentNode;
    const {
      clientWidth: parentWidth,
      clientHeight: parentHeight,
    } = parent;
    canvasDOM.style.display = 'block';
    const PIXI = require('pixi.js');
    const { ShockwaveFilter } = require('@pixi/filter-shockwave');
    const liquidGenerator = ({ app, resources, width, height }) => {
      const sprite = new PIXI.Sprite(resources.liquid.texture);
      const filter = new PIXI.filters.DisplacementFilter(sprite);
      sprite.x = width / 2;
      sprite.anchor.x = 0.5;
      sprite.anchor.y = 0.5;
      app.stage.addChild(sprite);
      sprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
      sprite.scale.x = 2;
      sprite.scale.y = 2;
      if (width > height) {
        sprite.y = height;
      } else {
        sprite.y = height / 2;
      }
      return {
        sprite,
        filter,
      };
    };
    const app = new PIXI.Application({
      view: canvasDOM,
      transparent: true,
    });
    this.app = app;
    const loader = new PIXI.loaders.Loader();
    const src = this.props.src;
    loader
      .add(src, src)
      .add('liquid', constants.liquid)
      .load((loader, resources) => {
        // Setup the position of the sprite
        const { width, height } = resources[src].texture.orig;
        let containerWidth;
        let containerHeight;

        if (parentWidth === 0 || parentHeight === 0) {
          canvasDOM.width = app.width = containerWidth = width;
          canvasDOM.height = app.height = containerHeight = height;
        } else {
          canvasDOM.width = app.width = containerWidth = parentWidth;
          canvasDOM.height = app.height = containerHeight = parentHeight;
        }

        const sprite = new PIXI.Sprite(resources[src].texture);
        const ratio = height / width;
        const containerRatio = containerHeight / containerWidth;

        if (containerRatio > ratio) {
          sprite.width = containerHeight / ratio;
          sprite.height = containerHeight;
        } else {
          sprite.width = containerWidth;
          sprite.height = containerWidth / ratio;
        }
        sprite.x = containerWidth / 2;
        sprite.y = containerHeight / 2;
        if (containerWidth > containerHeight) {
          sprite.anchor.x = 0.5;
          sprite.anchor.y = 0;
        } else {
          sprite.anchor.x = 0.5;
          sprite.anchor.y = 0.5;
        }

        // Add the sprite to the scene we are building
        app.stage.addChild(sprite);

        const { strength, time } = this.props;
        app.stage.filters = [];
        if (this.props.liquid) {
          const {
            sprite: displacementSprite,
            filter: displacementFilter,
          } = liquidGenerator({
            app,
            resources,
            width: containerWidth,
            height: containerHeight,
          });
          app.stage.filters = [displacementFilter];
          app.ticker.add((delta) => {
            displacementSprite.x += strength * delta;
            displacementSprite.y += strength / 3;
          });
        }
        if (this.props.ripple) {
          const shockwave1 = new ShockwaveFilter([containerWidth / 2, containerHeight / 2], {
            amplitude: this.props.amplitude,
            wavelength: this.props.wavelength,
            speed: this.props.speed,
          });
          const shockwave2 = new ShockwaveFilter([containerWidth / 2, containerHeight / 2], {
            amplitude: this.props.amplitude,
            wavelength: this.props.wavelength,
            speed: this.props.speed / 1.15,
          });
          const shockwave3 = new ShockwaveFilter([containerWidth / 2, containerHeight / 2], {
            amplitude: this.props.amplitude,
            wavelength: this.props.wavelength,
            speed: this.props.speed / 1.4,
          });
          app.stage.filters = app.stage.filters.concat([shockwave1, shockwave2, shockwave3]);
          app.ticker.add(() => {
            shockwave1.time += time;
            shockwave2.time = shockwave1.time;
            shockwave3.time = shockwave1.time;
          });
          setInterval(() => {
            shockwave1.time = 0;
          }, this.props.interval);
        }
      });
  }
  componentWillUnmount() {
    this.app.destroy(true);
  }

  render() {
    return (
      <canvas
        width="0"
        height="0"
        className={styles.container}
        ref={(elem) => { this.canvasDOM = elem; }}
      />
    );
  }
}

Effect.propTypes = {
  liquid: PropTypes.bool,
  ripple: PropTypes.bool,
  src: PropTypes.string.isRequired,
  strength: PropTypes.number,
  interval: PropTypes.number,
  amplitude: PropTypes.number,
  wavelength: PropTypes.number,
  speed: PropTypes.number,
  time: PropTypes.number,
};

Effect.defaultProps = {
  liquid: false,
  ripple: false,
  strength: 5,
  amplitude: 50,
  interval: 5000,
  wavelength: 160,
  speed: 500,
  time: 0.001,
};

export default Effect;
