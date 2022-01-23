import classNames from 'classnames';

import T from 'prop-types';
import './PriceInput.css';

const PriceInput = ({ className, label, ...props }) => {
  return (
    <div className={classNames('PriceInput', className)}>
      <label className="PriceInputLabel">
        <span>{label}</span>
        <input
          className="PriceInputStyle"
          {...props}
        ></input>
      </label>
    </div>
  );
};

PriceInput.propTypes = {
  className: T.number,
};

export default PriceInput;