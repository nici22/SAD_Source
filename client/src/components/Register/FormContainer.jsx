import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { registerRoute } from '../../utils/APIRoutes';
import axios from 'axios';

const FormContainer = () => {
    const [formValues, setFormValues] = useState({ fullname: '', username: '', email: '', gender: '', password: '', confirmPassword: '' });
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (handleValidation()) {
            const toast_id = toast.loading("Please wait...", ToastOptions);
            const { fullname, username, email, gender, password } = formValues;
            await axios.post(registerRoute, {
                fullname,
                username,
                email,
                gender,
                password,
            }, {
                withCredentials: true,
                headers: { "Access-Control-Allow-Credentials": true }
            }).then((result) => {
                toast.update(toast_id, { render: "Please Confirm your email to login", type: "info", autoClose: 2500, isLoading: false });
                console.log(result)
            }).catch((err) => {
                if (err.response.status === 400) {
                    toast.update(toast_id, { render: err.response.data.msg, type: "error", isLoading: false, autoClose: 2500 });
                }
                else {
                    toast.update(toast_id, { render: 'Internal Error, please contact with huseynagazade969@gmail.com', type: "error", isLoading: false, autoClose: 2500 });
                    console.error(err);
                }
            });
        };
    };
    const ToastOptions = { theme: 'dark', pauseOnHover: false, draggable: true, position: 'bottom-right', autoClose: 2500 };
    const handleValidation = () => {
        const { fullname, username, email, gender, password, confirmPassword } = formValues;
        let flag = true;
        if (!fullname) {
            toast.error("Full name is required", ToastOptions);
            flag = false;
        }
        else if (!/^([a-zA-Z']{3,})+\s+([a-zA-Z']{3,})+$/i.test(fullname)) {
            toast.error("Invalid full name", ToastOptions);
            flag = false;
        }
        if (!username) {
            toast.error("Username is required", ToastOptions);
            flag = false;
        }
        else if (!/^[a-zA-Z]([a-zA-Z0-9]{4,})+$/.test(username)) {
            toast.error("Invalid username", ToastOptions);
            flag = false;
        }
        if (!email) {
            toast.error("Email address is required", ToastOptions);
            flag = false;
        }
        else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(email)) {
            toast.error("Invalid email address", ToastOptions);
            flag = false;
        }
        if (!gender) {
            toast.error("Gender is required", ToastOptions);
            flag = false;
        }
        if (!password) {
            toast.error("Password is required", ToastOptions);
            flag = false;
        }
        else if (password.length < 6) {
            toast.error("Minimum password length is 6", ToastOptions);
            flag = false;
        }
        else if (confirmPassword !== password) {
            toast.error("Passwords do not match", ToastOptions);
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
                <motion.input type='text' placeholder="Full Name" name="fullname" autoComplete='off' onChange={handleChange}
                    whileFocus={{ borderBottom: "1px solid #8BB8E5", scale: 0.9, originX: '0px' }} />
                <motion.input type='text' placeholder="Username" name="username" autoComplete='off' onChange={handleChange}
                    whileFocus={{ borderBottom: "1px solid #8BB8E5", scale: 0.9, originX: '0px' }} />
                <motion.input type='text' placeholder="Email Address" name="email" autoComplete='off' onChange={handleChange}
                    whileFocus={{ borderBottom: "1px solid #8BB8E5", scale: 0.9, originX: '0px' }} />
                <motion.select name='gender' onChange={handleChange}
                    whileFocus={{ scale: 0.9, originX: '0px' }}>
                    <option selected disabled hidden>Choose Your Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </motion.select>
                <motion.input type='password' placeholder="Password" name="password" onChange={handleChange}
                    whileFocus={{ borderBottom: "1px solid #8BB8E5", scale: 0.9, originX: '0px' }} />
                <motion.input type='password' placeholder="Confirm Password" name="confirmPassword" onChange={handleChange}
                    whileFocus={{ borderBottom: "1px solid #8BB8E5", scale: 0.9, originX: '0px' }} />
                <motion.button type='submit'
                    initial={{ backgroundColor: '#CEB950' }}
                    whileHover={{ scale: 0.9, backgroundColor: '#42C8E3' }}
                    whileTap={{ scale: 0.76 }}><strong>Sign Up</strong></motion.button>
            </Form>
            <hr style={{ width: '70%', background: '#eee' }}></hr>
            <p style={{ textAlign: 'center', marginTop: 0, color: '#605F5C' }}>Already have an account? <Link style={{ color: '#605F5C' }} to="/login">Sign in</Link></p>
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
    height: 75%;
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