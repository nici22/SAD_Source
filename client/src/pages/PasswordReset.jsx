import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { sendResetPasswordRoute } from '../utils/APIRoutes';
import { toast } from 'react-toastify';

const PasswordReset = () => {
    const navigate = useNavigate();
    const [validUrl, setValidUrl] = useState(false);
    const [password, setPassword] = useState('');
    const params = useParams();
    useEffect(() => {
        const verifyURL = async () => {
            await axios.get(`${sendResetPasswordRoute}/${params.id}/${params.token}`)
                .then((res) => {
                    console.log(res.data);
                    setValidUrl(true);
                })
                .catch((err) => {
                    setValidUrl(false);
                });
        };
        verifyURL();
    }, [params]);
    const handleChange = (e) => {
        setPassword(e.target.value);
    };
    const ToastOptions = { theme: 'dark', pauseOnHover: false, draggable: true, position: 'bottom-right', autoClose: 2500 };
    const handleValidation = () => {
        if (password.length < 6) {
            toast.error('Minimum password length is 6', ToastOptions);
            return false;
        }
        return true;
    };
    const handleClick = async (e) => {
        e.preventDefault();
        if (handleValidation()) {
            const toast_id = toast.loading("Please wait...", ToastOptions);
            await axios.post(`${sendResetPasswordRoute}/${params.id}/${params.token}`, {
                password
            })
                .then((res) => {
                    console.log(res.data);
                    toast.update(toast_id, { render: "Password is changed successfully, you will be redirected to login page", type: "info", autoClose: 2500, isLoading: false });
                    setTimeout(() => {
                        navigate('/login');
                    }, 4000);
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    };
    return (
        <>
            {validUrl ?
                <Container>
                    <EmailContainer as={motion.form} onSubmit={handleClick}
                        initial={{ top: '-100%' }}
                        transition={{ duration: 1.5, delay: 0.1 }}
                        animate={{ top: '35%' }}>
                        <p>New Password</p>
                        <motion.input type='password' placeholder="Password" name="password" autoComplete='off' onChange={handleChange}
                            whileFocus={{ borderBottom: "1px solid #8BB8E5", scale: 0.9, originX: '0px' }} />
                        <motion.button type='submit'
                            initial={{ backgroundColor: '#CEB950', border: 'none' }}
                            whileHover={{ scale: 0.9, backgroundColor: '#42C8E3' }}
                            whileTap={{ scale: 0.76 }}><strong>Submit</strong></motion.button>
                    </EmailContainer>
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

const EmailContainer = styled(motion.form)`
    position: absolute;
    background-color: white;
    input {
        height: 30px;
        font-size: 90%;
        border: none;
        outline: none;
        border-bottom: 1px solid #BEA4A4;
    }
    display: flex;
    flex-direction: column;
    gap: 10px;
    * {
        margin: 10px;
    }
    width: 20%;
    button {
        cursor: pointer;
        border-radius: 10px;
        height: 30px;
    }
    p {
        font-size: 120%;
    }
    border-radius: 10px;
`;

export default PasswordReset;