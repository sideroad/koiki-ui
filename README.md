# Koiki UI

Unit of Koiki React Components

## Install

```
npm i -S koiki-ui
```

## Usage

```
import { Button, Input, InputtableButton } from 'koiki-ui';

const SampleComponent = () =>
  <div>
    <Button text="Search" />
  </div>;

```

See below to know usage
https://sideroad.github.io/koiki-ui/

## Contribution

### Components
Every components should have `styles` props to be able to customize style of component.
Base styles should be put under `src/less` directory and load as `defaultProps`

### Storybook
Components storybook should put under `stories` directory.
stories will be use as snapshot testing with using storyshots
