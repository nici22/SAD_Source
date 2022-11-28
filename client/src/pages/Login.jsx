import React from 'react';
import styled from 'styled-components';
import FormContainer from '../components/Login/FormContainer';
import ImageContainer from '../components/Login/ImageContainer';

const Login = () => {
  return (
    <LoginContainer>
      <ImageContainer />
      <FormContainer />
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-areas:
    ". . . ."
    ". image form ."
    ". . . .";
  grid-template-columns: 1fr 2fr 2fr 1fr;
  grid-template-rows: 1fr 4fr 1fr;
`;

export default Login;