import { connect } from 'react-redux';
import { useState } from 'react';
import FormField from '../../common/FormField';
import Button from '../../common/Button';
import T from 'prop-types';
import './LoginPage.css';
// import { login, loginSave } from '../service';
// import { AuthContextConsumer } from '../context';
import Layout from '../../Layout/Layout';
import { Checkbox } from "semantic-ui-react";

import { authLogin, uiResetError, checkLogin } from '../../store/actions';
import { getUi } from '../../store/selector';

function LoginPage({ onLogin, history, location }) {
  const [value, setValue] = useState({ email: '', password: '', remember: false, });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [checked, setChecked] = useState(false);

  //resetear el error con el onclick
  const resetError = () => setError(null);

  const handleChange = (event) => {
    setValue((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {


      // if (checked) {
      //   await loginSave(value);
      // } else {
      //   await login(value);
      // }
      setIsLoading(false);
      // para agregar el loading o spinner;

      await onLogin(value).then(() => {
        console.log("login succeed");
      });
      const { from } = location.state || { from: { pathname: '/adverts' } };
      // se deja el history para redireccionar
      history.push(from);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };
  const onChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeCheckbox = (ev, value) => {
    setChecked(value.checked);
  };



  return (
    <Layout>
      <div className="loginPage">
        <h1 className="loginPage-tittle"> Log in Ads</h1>
        <form className="loginForm" onSubmit={handleSubmit} onChange={onChange}>
          <FormField
            type="text"
            name="email"
            label="phone, email or username"
            className="loginForm-field"
            value={value.email}
            onChange={handleChange}
            autofocus
          />
          <FormField
            type="password"
            name="password"
            label="password"
            className="loginForm-field"
            value={value.password}
            onChange={handleChange}
          />
          <Checkbox
            toggle
            name="remember"
            className="formcheck-input"
            label="Remember me"
            onChange={(ev, value) => onChangeCheckbox(ev, value)}

          />
          <Button
            type="submit"
            className="loginForm-submit"
            variant="primary"
            disabled={isLoading || !value.email || !value.password}
          >
            Login
        </Button>

        </form>
        {error && (
          <div onClick={resetError} className="loginPage-error">
            {' '}
            {error.message}{' '}
          </div>
        )}
      </div>
    </Layout>
  );
}

LoginPage.propTypes = {
  onLogin: T.func.isRequired,
};

// const ConnectedLoginPage = (props) => (
//   // <AuthContextConsumer>
//   (auth) => <LoginPage onLogin={auth.handleLogin} {...props} />
//   // </AuthContextConsumer>
// );

const mapStateToProps = state => {
  return getUi(state);
};

const mapDispatchToProps = {
  onLogin: authLogin,
  onResetError: uiResetError,
};

const ConnectedLoginPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginPage);




export default ConnectedLoginPage;
