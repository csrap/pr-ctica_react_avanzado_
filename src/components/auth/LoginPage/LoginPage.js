import { connect } from 'react-redux';
import React, { useState } from 'react';
import FormField from '../../common/FormField';
import Button from '../../common/Button';
import T from 'prop-types';
import './LoginPage.css';
import Layout from '../../Layout/Layout';
import { Checkbox } from "semantic-ui-react";

import { authLogin, uiResetError, authLoginSave } from '../../store/actions';
import { getUi } from '../../store/selector';

function LoginPage({ onLogin, onLoginSave, history, location }) {
  const [value, setValue] = useState({ email: '', password: '', remember: false, });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberLogin, setRememberLogin] = useState(false);


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

    let formRigth = {};

    if (formRigth) {
      setIsLoading(true);



      try {
        if (rememberLogin) {
          await onLoginSave(value).then(() => {
            console.log("remember login succeed");
          });

        } else {
          await onLogin(value).then(() => {
            console.log("login succeed");
          });
          setIsLoading(false);

          const { from } = location.state || { from: { pathname: '/adverts' } };
          // se deja el history para redireccionar
          history.push(from);
        }
      }
      catch (error) {
        setError(error);
        setIsLoading(false);
      }
    }
  };


  const onChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeCheckbox = (ev, value) => {
    setRememberLogin(value.checked);
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


const mapStateToProps = state => {
  return getUi(state);
};

const mapDispatchToProps = {
  onLogin: authLogin,
  onLoginSave: authLoginSave,
  onResetError: uiResetError,
};

const ConnectedLoginPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginPage);




export default ConnectedLoginPage;
