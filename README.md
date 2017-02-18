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
import customizedStyles from 'your_own_less';
...
<Button
  styles={{
    button: customizedStyles
  }}
/>
```

## Change Log

#### 0.0.49
Change styles structure to be one more deeper.
This change can be handle children styles

#### 0.0.50
Move fa property to under styles object

## Contribution

### Components
Every components have `styles` props to be able to customize style of component.
Base styles should be put under `src/less` directory and load styles as `defaultProps`

### Storybook
Component storybooks are under `stories` directory.
stories will be use as snapshot testing with using storyshots
