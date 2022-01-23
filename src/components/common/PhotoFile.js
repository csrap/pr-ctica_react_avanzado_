import classNames from 'classnames';
// import { useState, useEffect, useRef } from 'react';
import T from 'prop-types';
import './PhotoFile.css';

function PhotoFile({ className, label, ...props }) {
  return (
    <div
      className={classNames(
        'PhotoFile',
      )}
    >
      <label className="PhotoFileLabel">
        <span>{label}</span>
        <input
          className="PhotoFile-input"
          {...props}
        ></input>
      </label>
    </div>
  );
}

PhotoFile.propTypes = {
  className: T.string
};

export default PhotoFile;
