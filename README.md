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

### Styling

#### Load CSS file
Copy CSS to put own publich directory from `node_modules/koiki-ui/build/styles.css`

#### Use css-loader
```
import 'koiki-ui/build/styles.css'
```

#### Customize CSS with append className
```
...
<Button
  className="foobar"
/>
```

#### Customize CSS with using css-loader
```
import fa from 'koiki-ui/less/fa/less/font-awesome.less';
import buttonStyles from 'koiki-ui/less/button.less';
import customizedStyles from 'your_own_less';
...
<Button
  styles={{
    ...buttonStyles,
    ...customizedStyles
  }}
/>
```

## Contribution

### Components
Every components have `styles` props to be able to customize style of component.
Base styles should be put under `src/less` directory and load styles as `defaultProps`

### Storybook
Component storybooks are under `stories` directory.
stories will be use as snapshot testing with using storyshots
