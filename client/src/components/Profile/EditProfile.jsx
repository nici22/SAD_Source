import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import PhoneInput from 'react-phone-number-input';
import axios from 'axios';
import { getEditChecker, logoutRoute, setUserRoute } from '../../utils/APIRoutes';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const EditProfile = ({ _id, setEditProfile, fullname, mobile, website, address, avatar, story, gender }) => {
    const [values, setValues] = useState({ fullname, mobile, gender, story, address, website, avatar });
    const ToastOptions = { theme: 'dark', pauseOnHover: false, draggable: true, position: 'bottom-right', autoClose: 2500 };
    const access_token = useSelector((state) => state.auth['access_token']);
    useEffect(() => {
        const fetchEditChecker = async () => {
            await axios.get(`${getEditChecker}/${_id}`, {
                withCredentials: true,
                headers: { Authorization: access_token }
            }).then((res) => {
                console.log(res.data);
            });
        };
        fetchEditChecker();

    }, [access_token, _id]);
    const handleImage = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        console.log(file);
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            // console.log(reader.result);
            setValues({ ...values, avatar: [reader.result] });
        };
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post(`${setUserRoute}/${_id}`, {
            fullname: values.fullname,
            mobile: values.mobile,
            gender: values.gender,
            story: values.story,
            address: values.address,
            website: values.website,
            avatar: values.avatar,
        }, {
            withCredentials: true,
            headers: { Authorization: access_token },
        }).then((result) => {
            toast.info('You will be redirected to login page to see the changes', ToastOptions);
            setTimeout(() => {
                handleLogout();
            }, 4000);
        }).catch((err) => {
            if (err.response.status === 400) {
                toast.error(err.response.data.msg, ToastOptions);
            }
            else toast.error('Error while editting profile, please try again', ToastOptions);
            console.error(err);
        });
    };
    const navigate = useNavigate();
    const handleLogout = async () => {
        localStorage.removeItem("persist:root");
        await axios.post(logoutRoute, {}, { withCredentials: true });
        navigate('/login');
    };
    const theme = useSelector((state) => state.filter.value);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };
    const removeEdit = () => {
        setEditProfile(false);
    };
    return (
        <TopContainer>
            <Container as={motion.div}
                initial={{ top: '-100%' }}
                transition={{ duration: 0.85, delay: 0.1 }}
                animate={{ top: '100px' }}
                exit={{ top: '-100%' }}>
                <form onSubmit={handleSubmit}>
                    <ImageContainer>
                        <img src={values.avatar} alt='Avatar' />
                        <input type='file' onChange={handleImage} />
                    </ImageContainer>
                    <motion.input type='text' value={values.fullname} maxLength='50' placeholder="Full Name" name="fullname" autoComplete='off' onChange={handleChange}
                        whileFocus={{ borderBottom: "1px solid #8BB8E5", scale: 0.9, originX: '0px' }} />
                    <motion.input type='text' value={values.website} placeholder="Social Link" name="website" autoComplete='off' onChange={handleChange}
                        whileFocus={{ borderBottom: "1px solid #8BB8E5", scale: 0.9, originX: '0px' }} />
                    <motion.select name='gender' value={values.gender} onChange={handleChange}
                        whileFocus={{ scale: 0.9, originX: '0px' }}>
                        <option style={{ backgroundColor: theme.payload ? "#000" : "#fff" }} hidden>Choose Your Gender</option>
                        <option style={{ backgroundColor: theme.payload ? "#000" : "#fff" }} value="male">Male</option>
                        <option style={{ backgroundColor: theme.payload ? "#000" : "#fff" }} value="female">Female</option>
                        <option style={{ backgroundColor: theme.payload ? "#000" : "#fff" }} value="other">Other</option>
                    </motion.select>
                    <PhoneInput style={{ flexDirection: 'row' }} className='phoneInput'
                        value={values.mobile}
                        onChange={value => setValues({ ...values, [mobile]: value })} />
                    <motion.input type='text' placeholder="Physical Address" name="address" value={values.address} autoComplete='off' onChange={handleChange}
                        whileFocus={{ borderBottom: "1px solid #8BB8E5", scale: 0.9, originX: '0px' }} />
                    <motion.textarea type='text' placeholder="About Me" name="story" value={values.story} autoComplete='off' onChange={handleChange}
                        whileFocus={{ borderBottom: "1px solid #8BB8E5", scale: 0.9, originX: '0px' }} />
                    <motion.button type='submit'
                        initial={{ backgroundColor: '#CEB950' }}
                        whileHover={{ scale: 0.9, backgroundColor: '#42C8E3' }}
                        whileTap={{ scale: 0.76 }}><strong>Save Record</strong></motion.button>
                    <small style={{ filter: theme.payload ? 'invert(1)' : 'invert(0)' }}>
                        You can change only once in a week
                    </small>
                </form>
            </Container>
            <motion.button style={{ position: 'absolute', top: 'calc(0% + 10px)', width: '60px', height: '30px', left: 'calc(100% - 70px)', border: '1px solid #F92B2B', color: '#F92B2B', backgroundColor: '#fff' }}
                whileHover={{ scale: 1.1, backgroundColor: '#F92B2B', color: '#fff' }}
                onClick={removeEdit}><strong>Close</strong></motion.button>
        </TopContainer>
    );
};

const ImageContainer = styled(motion.div)``;

const TopContainer = styled(motion.div)`
    .phoneInput {
        display: flex;
        flex-direction: row;
        gap: 10px;
        width: 100%;
        .PhoneInputCountry {
            width: 50%;
            display: flex;
            flex-direction: row;
            select {
                width: 70%;
            }
            .PhoneInputCountryIcon {
                width: 60%;
                display: flex;
                justify-content: center;
                img {
                    width: 100%;
                }
            }
        }
    }
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    backdrop-filter: brightness(30%);
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Container = styled(motion.div)`
    position: absolute;
    top: 20%;
    #file_input {
        // position: absolute;
        top: 70px;
        display: none;
    }
    div {
        img {
            width: 100px;
        }
    }
    small {
        color: #FF0000;
        filter: invert(0);
        text-decoration: none;
    }
    align-items: center;
    border: 1px solid black;
    left: 30%;
    display: flex;
    width: 30%;
    height: 70%;
    flex-direction: column;
    background-color: white;
    img {
        width: 10%;
    }
    .src_avatar {
        border-radius 50px;
        cursor: pointer;
    }
    form {
        width: 90%;
        justify-items: center;
        display: grid;
        gap: 10px;
        height: 75%;
        grid-auto-rows: 12%;
        select {
            width: 100%;
            font-size: 100%;
            color: #808080;
            border: none;
            border-bottom: 1px solid #BEA4A4;
            outline: none;
            cursor: pointer;
            option {
                color: #A3ABF9;
                font-size: 120%;
                overflow: hidden;
                cursor: pointer;
                border: none;
                outline: none;
            }
        }
        input {
            width: 100%;
            font-size: 90%;
            border: none;
            border-bottom: 1px solid #BEA4A4;
            outline: none;
        }
        textarea {
            width: 100%;
            font-size: 110%;
            border: none;
            border-bottom: 1px solid #BEA4A4;
            outline: none;
        }
        button {
            border-radius: 20px;
            width: 50%;
            height: 100%;
            color: #fff;
            border: none;
            cursor: pointer;
        }
    }
`;

export default EditProfile;