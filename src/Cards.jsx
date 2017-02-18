import React, { PropTypes } from 'react';
import VisibilitySensor from 'react-visibility-sensor';

const Cards = ({
  hover,
  theme,
  clickable,
  position,
  items,
  onClick,
  onReachToBottom,
  nowrap,
  hasSpace,
  styles,
  className
}) =>
  <ul
    className={`${styles.cards.cards}
                ${styles.cards[hover]}
                ${styles.cards[theme]}
                ${styles.cards[position]}
                ${hasSpace ? styles.cards.hasSpace : ''}
                ${className}`}
  >
    {
      items.map(item =>
        <li
          key={item.id}
          className={styles.cards.item}
        >
          <button
            className={`${styles.cards.link}
                        ${item.selected ? styles.cards.selected : ''}
                        ${!clickable ? styles.cards.unclickable : ''}`}
            onClick={() => {
              if (onClick) {
                onClick(item, !item.selected);
              }
            }}
          >
            <div
              className={styles.cards.back}
              style={{ backgroundImage: `url(${item.image})` }}
            />
            <div
              className={`${styles.cards.outline} ${item.title ? '' : styles.cards.none}`}
            />
            {
              item.title ?
                <div
                  className={styles.cards.text}
                  style={{
                    whiteSpace: nowrap ? 'nowrap' : ''
                  }}
                >{item.title}</div> : ''
            }
          </button>
        </li>
      )
    }
    <li>
      <VisibilitySensor
        onChange={
          (isVisible) => {
            if (isVisible) {
              onReachToBottom();
            }
          }
        }
      />
    </li>
  </ul>;

Cards.propTypes = {
  className: PropTypes.string,
  items: PropTypes.array,
  hover: PropTypes.oneOf(['unveil', 'cover']),
  theme: PropTypes.oneOf(['classic', 'pop']),
  position: PropTypes.oneOf(['top', 'middle', 'bottom']),
  clickable: PropTypes.bool,
  hasSpace: PropTypes.bool,
  nowrap: PropTypes.bool,
  styles: PropTypes.object,
  onClick: PropTypes.func,
  onReachToBottom: PropTypes.func,
};

Cards.defaultProps = {
  className: '',
  items: [],
  clickable: true,
  hover: 'unveil',
  theme: 'pop',
  position: 'middle',
  nowrap: true,
  hasSpace: false,
  onClick: () => {},
  onReachToBottom: () => {},
  styles: {
    cards: require('../less/cards.less')
  }
};

export default Cards;
