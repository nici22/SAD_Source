import React from 'react';
import styled from 'styled-components';
import FormContainer from '../components/Register/FormContainer';
import ImageContainer from '../components/Register/ImageContainer';

const Register = () => {
  return (
    <RegisterContainer>
      <ImageContainer />
      <FormContainer />
    </RegisterContainer>
  );
};

const RegisterContainer = styled.div`
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

export default Register;