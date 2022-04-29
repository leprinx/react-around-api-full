import { NavLink } from 'react-router-dom';
import { useState } from 'react';

function Login({ handleLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }

  function handlePasswordChange(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    handleLogin(email, password);
  }

  return (
    <div className='auth'>
      <h2 className='auth__title'>Log In</h2>
      <form onSubmit={handleSubmit} className='auth__form'>
        <input
          placeholder='Email'
          className='auth__input'
          type='email'
          name='email'
          minLength='2'
          maxLength='200'
          value={email}
          onChange={handleEmailChange}
          required
        />
        <input
          placeholder='Password'
          className='auth__input'
          type='password'
          name='password'
          minLength='2'
          maxLength='200'
          value={password}
          onChange={handlePasswordChange}
          required
        />
        <button type='submit' className='auth__button'>
          Log in
        </button>
      </form>
      <NavLink to='/signup' className='auth__redirect'>
        Not a member yet? Sign up here!
      </NavLink>
    </div>
  );
}

export default Login;
