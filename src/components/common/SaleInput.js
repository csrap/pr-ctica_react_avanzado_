import className from 'classnames';

import T from 'prop-types';
import './SaleInput.css';

const SaleInput = ({ label, ...props }) => {
  return (
    <div >
      <label className="SaleInputLabel">
        <span>{label}</span>
        <select {...props} multiple={false}>
          <option value="sale">---------------- SALE ----------------------</option>
          <option value="true">true</option>
          <option value="false">false</option>
        </select>
      </label>
    </div>
  );
};


SaleInput.propTypes = {
  className: T.bool

};

export default SaleInput;