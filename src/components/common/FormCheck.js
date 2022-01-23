import classNames from 'classnames';
// import { useState, useEffect, useRef } from 'react';

import './FormField.css';

function FormCheck({ className, label, ...props }) {
  return (
    <div
      className={classNames(
        'formCheck',
      )}
    >
      <label className="form-check">
        <span>{label}</span>
        <input
          className="formcheck-input"
          {...props}
        ></input>
      </label>
    </div>
  );
}

export default FormCheck;
