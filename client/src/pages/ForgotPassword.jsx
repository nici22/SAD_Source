import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { sendResetPasswordRoute } from '../utils/APIRoutes';
import axios from 'axios';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const handleChange = (e) => {
        setEmail(e.target.value);
    };
    const ToastOptions = { theme: 'dark', pauseOnHover: false, draggable: true, position: 'bottom-right', autoClose: 2500 };
    const handleValidation = () => {
        if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(email)) {
            toast.error('Invalid Email', ToastOptions);
            return false;
        }
        return true;
    };
    const handleClick = async (e) => {
        e.preventDefault();
        if (handleValidation()) {
            const toast_id = toast.loading("Please wait...", ToastOptions);
            await axios.post(sendResetPasswordRoute, { email })
                .then(() => {
                    toast.update(toast_id, { render: "Email has sent successfully, please check your email", type: "success", autoClose: 6500, isLoading: false });
                })
                .catch((err) => {
                    toast.update(toast_id, { render: "Email not found", type: "info", autoClose: 2500, isLoading: false });
                });
        }
    };
    return (
        <Container>
            <EmailContainer as={motion.form} onSubmit={handleClick}
                initial={{ top: '-100%' }}
                transition={{ duration: 1.5, delay: 0.1 }}
                animate={{ top: '35%' }}>
                <p>Forgot Password</p>
                <motion.input type='text' placeholder="Email Address" name="email" autoComplete='off' onChange={handleChange}
                    whileFocus={{ borderBottom: "1px solid #8BB8E5", scale: 0.9, originX: '0px' }} />
                <motion.button type='submit'
                    initial={{ backgroundColor: '#CEB950', border: 'none' }}
                    whileHover={{ scale: 0.9, backgroundColor: '#42C8E3' }}
                    whileTap={{ scale: 0.76 }}><strong>Submit</strong></motion.button>
            </EmailContainer>
        </Container>
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
        height: 30px;
        border-radius: 10px;
        cursor: pointer;
    }
    p {
        font-size: 120%;
    }
    border-radius: 10px;
`;


export default ForgotPassword;