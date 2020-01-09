/**
 *
 * Login
 *
 */

import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import TextInput from 'components/TextInput';
import { grid, typography } from 'styled-system';

const Wrapper = styled.div`
  display: grid;
  box-sizing: border-box;
  width: 400px;
  margin: 120px auto;
  background-color: white;
  grid-template-columns: repeat(12, 1fr);
  grid-row-gap: 32px;
  padding: 32px 0;
  border-radius: 8px;
`;

const Text = styled.div`
  ${grid}
  ${typography}
  padding: 0 0 16px 8px;
`;

const StyledTextInput = styled(TextInput)`
  ${grid};
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  background-color: white;
  ${({ invalid }) => invalid && `border: 1px solid red;`}
`;

const TextAndInput = styled.div`
  ${grid};
`;

const Button = styled.button`
  margin: 28px 0 0 0;
  ${grid}
  box-sizing: border-box;
  background-color: white;
  border-color: #ff8000;
  border-style: solid;
  border-width: 1px;
  border-radius: 5px;
  align-items: center;
  height: 40px;
  padding: 0 15px;
  justify-content: center;
  display: flex;
  font-size: 16px;
  color: #ff8000;
  cursor: pointer;
`;

const Login = props => {
  const { redirectTo } = props;
  const [loginInfo, setLoginInfo] = useState({ username: '', password: '' });
  const [validate, setValidate] = useState(false);
  const handleInput = e =>
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  const login = ({ username, password }) => () => {
    setValidate(true);

    if (loginInfo.username.length > 0 && loginInfo.password.length > 0) {
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);
      redirectTo('/books');
    }
  };
  return (
    <Wrapper>
      <Text
        gridColumn="2/12"
        fontSize={24}
        fontWeight="bold"
        textAlign="center"
      >
        Dorian Library Review
      </Text>
      <TextAndInput gridColumn="2/12">
        <Text>Username</Text>
        <StyledTextInput
          value={loginInfo.username}
          name="username"
          onChange={handleInput}
          invalid={validate && loginInfo.username.length < 1}
        />
      </TextAndInput>
      <TextAndInput gridColumn="2/12">
        <Text>Password</Text>
        <StyledTextInput
          value={loginInfo.password}
          name="password"
          type="password"
          onChange={handleInput}
          invalid={validate && loginInfo.password.length < 1}
        />
      </TextAndInput>
      <Button gridColumn="2/12" onClick={login(loginInfo)}>
        Login
      </Button>
    </Wrapper>
  );
};

Login.propTypes = {};

export default Login;
