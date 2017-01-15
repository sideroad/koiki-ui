// eslint-disable-next-line
import React from 'react';

const defaultOptions = {
  inline: false,
  header: true,
  source: true,
  propTables: [],
};


export default {
  addWithInfo(storyName, info, storyFn, _options) {

    if (typeof storyFn !== 'function') {
      if (typeof info === 'function') {
        // eslint-disable-next-line
        _options = storyFn;
        // eslint-disable-next-line
        storyFn = info;
        // eslint-disable-next-line
        info = '';
      } else {
        throw new Error('No story defining function has been specified');
      }
    }

    const options = Object.assign({}, defaultOptions, _options);

    // props.propTables can only be either an array of components or null
    // propTables option is allowed to be set to 'false' (a boolean)
    // if the option is false, replace it with null to avoid react warnings
    if (!options.propTables) {
      options.propTables = null;
    }

    return this.add(storyName, context => storyFn(context));
  }
};

export function setDefaults(newDefaults) {
  return Object.assign(defaultOptions, newDefaults);
}
