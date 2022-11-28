import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginRoute } from '../../utils/APIRoutes';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setAuth } from '../../redux/authSlice';

const FormContainer = () => {
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({ email: '', password: '' });
    const dispatch = useDispatch();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (handleValidation()) {
            const toast_id = toast.loading("Please wait...", ToastOptions);
            const { email, password } = formValues;
            return await axios.post(loginRoute, {
                email,
                password,
            }, {
                withCredentials: true,
                headers: { "Access-Control-Allow-Credentials": true }
            }).then((result) => {
                toast.update(toast_id, { render: "Everything is okay", type: "success", isLoading: false });
                dispatch(setAuth(result.data));
                navigate('/home');
            }).catch((err) => {
                if (err.response.status === 400) {
                    toast.update(toast_id, { render: err.response.data.msg, type: "error", isLoading: false, autoClose: 2500 });
                }
                else {
                    toast.update(toast_id, { render: 'Internal Error, please contact with huseynagazade969@gmail.com', type: "error", isLoading: false, autoClose: 2500 });
                }
                console.error(err);
            });
        };
    };
    const ToastOptions = { theme: 'dark', pauseOnHover: false, draggable: true, position: 'bottom-right', autoClose: 2500 };
    const handleValidation = () => {
        const { email, password } = formValues;
        let flag = true;
        if (!email) {
            toast.error("Email address is required", ToastOptions);
            flag = false;
        }
        if (!password) {
            toast.error("Password is required", ToastOptions);
            flag = false;
        }
        return flag;
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };
    return (
        <Container as={motion.div}
            initial={{ x: '-50%' }}
            animate={{ x: 0, transition: { delay: 0.5, duration: 1 } }}>
            <p style={{ textAlign: 'center', fontSize: '120%' }}>Socialize</p>
            <Form onSubmit={handleSubmit}>
                <motion.input type='text' placeholder="Username or Email Address" name="email" autoComplete='off' onChange={handleChange}
                    whileFocus={{ borderBottom: "1px solid #8BB8E5", scale: 0.9, originX: '0px' }} />
                <motion.input type='password' placeholder="Password" name="password" onChange={handleChange} autoComplete='off'
                    whileFocus={{ borderBottom: "1px solid #8BB8E5", scale: 0.9, originX: '0px' }} />
                <motion.button type='submit'
                    initial={{ backgroundColor: '#CEB950' }}
                    whileHover={{ scale: 0.9, backgroundColor: '#42C8E3' }}
                    whileTap={{ scale: 0.76 }}><strong>Sign In</strong></motion.button>
                <p style={{ width: '70%', textAlign: 'center' }}><Link style={{ color: '#605F5C' }} to='/forgot-password'>Forgot Password?</Link></p>
            </Form>
            <hr style={{ width: '70%', background: '#eee' }}></hr>
            <p style={{ textAlign: 'center', marginTop: 0, color: '#605F5C' }}>Are you a new member? <Link style={{ color: '#605F5C' }} to="/register">Sign up</Link></p>
        </Container>
    );
};

const Container = styled(motion.div)`
    grid-area: form;
    background: #fff;
`;

const Form = styled.form`
    justify-items: center;
    display: grid;
    gap: 10px;
    height: 65%;
    grid-auto-rows: 12%;
    select {
        font-size: 100%;
        color: #808080;
        width: 70%;
        border: none;
        background-color: #fff;
        border-bottom: 1px solid #BEA4A4;
        outline: none;
        cursor: pointer;
        option {
            cursor: pointer;
            border: none;
            outline: none;
        }
    }
    input {
        width: 70%;
        font-size: 90%;
        border: none;
        border-bottom: 1px solid #BEA4A4;
        outline: none;
    }
    button {
        border-radius: 20px;
        width: 30%;
        color: #fff;
        border: none;
        cursor: pointer;
    }
`;

export default FormContainer;