import classNames from 'classnames';

import T from 'prop-types';
import './SaleInput.css';

const SaleInput = ({ className, label, ...props }) => {
  return (
    <div className={classNames('SaleInput', className)}>
      <label className="SaleInputLabel">
        <span>{label}</span>
        <select {...props} >
          <option value="">--------------- TAGS--------------------------------</option>
          <option value="lifestyle">lifestyle</option>
          <option value="mobile">mobile</option>
          <option value="motor">motor</option>
          <option value="work">work</option>
        </select>
      </label>
    </div>
  );
};

SaleInput.propTypes = {
  className: T.array
};

export default SaleInput;