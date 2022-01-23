import classNames from 'classnames';

import T from 'prop-types';
import './NameInput.css';

const NameInput = ({ className, label, ...props }) => {
  return (
    <div className={classNames('NameInput', className)}>
      <label className="NameInputLabel">
        <span>{label}</span>
        <input
          className="NameInputStyle"
          {...props}
        ></input>
      </label>
    </div>
  );
};

NameInput.propTypes = {
  className: T.string,
};

export default NameInput;

