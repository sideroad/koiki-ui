import React, { PropTypes } from 'react';


const IconButton = ({ item, onClick, type, styles, fa }) =>
  <button
    className={styles.iconButton.item}
    key={item.id}
    onClick={
      () => onClick(item)
    }
  >
    {
      item.image ?
        <img className={styles.iconButton.icon} alt={item.name} src={item.image} />
      : null
    }
    <div className={styles.iconButton.text} >{item.name}</div>
    <div className={styles.iconButton[type]} >
      <i className={`${fa.fa} ${type === 'add' ? fa['fa-plus'] : fa['fa-trash']}`} />
    </div>
  </button>;

IconButton.propTypes = {
  fa: PropTypes.object,
  item: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['add', 'delete']).isRequired,
  styles: PropTypes.object
};

IconButton.defaultProps = {
  fa: require('../less/fa/less/font-awesome.less'),
  styles: {
    iconButton: require('../less/icon-button.less'),
  },
  onClick: () => {}
};

export default IconButton;
