import React from 'react';
import { storiesOf, action, setAddon } from '@kadira/storybook';
import infoAddon from '@kadira/react-storybook-addon-info';
import Casets from '../src/Casets';
import customized from './less/button.less';

setAddon(infoAddon);
const actionLogger = action();
const items = [
  {
    id: 'corkboard',
    name: 'Cork Board',
    image: './images/corkboard.jpg'
  },
  {
    id: 'blueboard',
    name: 'Blue Board',
    image: './images/blueboard.jpg'
  },
  {
    id: 'stripe',
    name: 'Stripe',
    image: './images/stripe.jpg'
  },
  {
    id: 'goldgrazing',
    name: 'Gold Grazing',
    image: './images/goldgrazing.jpg'
  }
];

storiesOf('Casets', module)
  .addWithInfo('with basic usage', () => (
    <div className="casets-wrap">
      <Casets
        items={items}
      />
    </div>
  ))
  .addWithInfo('with event handling', () => (
    <div className="casets-wrap">
      <Casets
        items={items}
        onClick={item => actionLogger('clicked', item)}
        onReachToBottom={() => actionLogger('reach to bottom')}
      />
    </div>
  ))
  .addWithInfo('with classic theme', () => (
    <div className="casets-wrap">
      <Casets
        items={items}
        theme="classic"
      />
    </div>
  ))
  .addWithInfo('with cover interaction', () => (
    <div className="casets-wrap">
      <Casets
        items={items}
        hover="cover"
      />
    </div>
  ))
  .addWithInfo('with top position text', () => (
    <div className="casets-wrap">
      <Casets
        items={items}
        position="top"
      />
    </div>
  ))
  .addWithInfo('with bottom position text', () => (
    <div className="casets-wrap">
      <Casets
        items={items}
        position="bottom"
      />
    </div>
  ))
  .addWithInfo('with spacing casets', () => (
    <div className="casets-wrap">
      <Casets
        items={items}
        hasSpace
      />
    </div>
  ))
  .addWithInfo('with unclickable', () => (
    <div className="casets-wrap">
      <Casets
        items={items}
        clickable={false}
      />
    </div>
  ))
  .addWithInfo('with selected caset', () => (
    <div className="casets-wrap">
      <Casets
        items={items.map((item, index) =>
          ({
            id: item.id,
            name: item.name,
            image: item.image,
            selected: index % 2
          })
        )}
      />
    </div>
  ))
  .addWithInfo('with customize styles', () => (
    <div className="casets-wrap">
      <Casets
        text="Search"
        styles={customized}
      />
    </div>
  ));
