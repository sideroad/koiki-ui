/* eslint-disable jsx-a11y/label-has-for */
import React, { PropTypes } from 'react';

const styles = require('../less/checkbox.less');

const Checkbox = props =>
  <div
    className={styles.container}
  >
    <label className={styles.label} >
      <input
        className={styles.checkbox}
        type="checkbox"
        checked={props.checked}
        onClick={props.onClick}
        readOnly
      />
    </label>
  </div>;

Checkbox.propTypes = {
  onClick: PropTypes.func,
  checked: PropTypes.bool,
};

Checkbox.defaultProps = {
  onClick: () => {},
  checked: false
};

export default Checkbox;
