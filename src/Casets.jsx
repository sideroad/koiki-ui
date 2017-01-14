import React, { PropTypes } from 'react';
import VisibilitySensor from 'react-visibility-sensor';

const Casets = ({
  hover,
  theme,
  clickable,
  position,
  items,
  onClick,
  onReachToBottom,
  nowrap,
  hasSpace,
  styles
}) =>
  <ul
    className={`${styles.casets}
                ${styles[hover]}
                ${styles[theme]}
                ${styles[position]}
                ${hasSpace ? styles.hasSpace : ''}`}
  >
    {
      items.map(item =>
        <li
          key={item.id}
          className={styles.item}
        >
          <button
            className={`${styles.link}
                        ${item.selected ? styles.selected : ''}
                        ${!clickable ? styles.unclickable : ''}`}
            onClick={() => {
              if (onClick) {
                onClick(item, !item.selected);
              }
            }}
          >
            <div
              className={styles.back}
              style={{ backgroundImage: `url(${item.image})` }}
            />
            <div
              className={`${styles.outline} ${item.name ? '' : styles.none}`}
            />
            {
              item.name ?
                <div
                  className={styles.text}
                  style={{
                    whiteSpace: nowrap ? 'nowrap' : ''
                  }}
                >{item.name}</div> : ''
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

Casets.propTypes = {
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

Casets.defaultProps = {
  items: [],
  clickable: true,
  hover: 'unveil',
  theme: 'pop',
  position: 'middle',
  nowrap: true,
  hasSpace: false,
  onClick: () => {},
  onReachToBottom: () => {},
  styles: require('./less/casets.less')
};

export default Casets;
