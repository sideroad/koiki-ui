import React, { PropTypes } from 'react';


const IconButton = ({ item, onClick, type, styles }) =>
  <button
    className={styles.iconButton.item}
    key={item.id}
    onClick={
      () => onClick(item)
    }
    tabIndex="-1"
  >
    {
      item.image ?
        <img className={styles.iconButton.icon} alt={item.name} src={item.image} />
      : null
    }
    <div className={styles.iconButton.text} >{item.name}</div>
    <div className={styles.iconButton[type]} >
      <i className={`${styles.fa.fa} ${type === 'add' ? styles.fa['fa-plus'] : styles.fa['fa-trash']}`} />
    </div>
  </button>;

IconButton.propTypes = {
  item: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['add', 'delete']).isRequired,
  styles: PropTypes.object
};

IconButton.defaultProps = {
  styles: {
    fa: require('../less/fa/less/font-awesome.less'),
    iconButton: require('../less/icon-button.less'),
  },
  onClick: () => {}
};

export default IconButton;
