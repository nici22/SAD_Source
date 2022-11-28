import axios from 'axios';
import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import success from '../assets/success.png';
import { host } from '../utils/APIRoutes';

const VerifyEmail = () => {
  const [validUrl, setValidUrl] = useState(false);
  const params = useParams();
  useEffect(() => {
    const verifyURL = async () => {
      try {
        const url = `${host}/api/users/${params.id}/verify/${params.token}`;
        const { data } = await axios.get(url);
        console.log(data);
        setValidUrl(true);
      }
      catch (err) {
        console.error(err);
        setValidUrl(false);
      }
    };
    verifyURL();
  }, [params]);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/login');
  }
  return (
    <>
      {validUrl ?
        <Container>
          <SuccessContainer as={motion.div}
            initial={{ top: '-100%' }}
            transition={{ type: 'Inertia', duration: 2, delay: 0.5 }}
            animate={{ top: '100px' }}>
            <Colored>
              <img src={success} alt='Success' />
            </Colored>
            <TextContainer>
              <Text>Congratulations, your account has been successfully created!!! Please click button to login</Text>
              <motion.button type='submit' onClick={handleClick}
                initial={{ backgroundColor: '#CEB950' }}
                whileHover={{ scale: 0.9, backgroundColor: '#42C8E3' }}
                whileTap={{ scale: 0.76 }}><strong>Login</strong></motion.button>
            </TextContainer>
          </SuccessContainer>
        </Container>
        :
        <></>
      }
    </>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SuccessContainer = styled(motion.div)`
  position: absolute;
  width: 400px;
  height: 400px;
  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`;

const Colored = styled.div`
  height: 50%;
  background-color: green;
  border-radius: 10px 10px 0 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  button {
    color: #fff;
    border: none;
    cursor: pointer;
    width: 50%;
    padding: 20px;
    border-radius: 30px;
  }
`;

const Text = styled.p`
  margin: 20px;
`;

export default VerifyEmail;