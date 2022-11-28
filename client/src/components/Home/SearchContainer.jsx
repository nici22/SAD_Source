import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AiOutlineSearch } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { searchUserRoute } from '../../utils/APIRoutes';
import axios from 'axios';
import UserCard from './UserCard';
import styled from 'styled-components';

const SearchContainer = () => {
    const [searchUser, setSearchUser] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [foundUsers, setFoundUsers] = useState([]);
    const handleFocus = () => {
        setIsFocused(true);
    };
    const handleBlur = async () => {
        await new Promise(resolve => setTimeout(resolve, 200));
        setIsFocused(false);
    };
    const handleChange = (e) => {
        setSearchUser(e.target.value.toLowerCase().replace(/ /g, ''));
        if (!e.target.value.toLowerCase().replace(/ /g, '')) {
            setFoundUsers([]);
        }
    };
    useEffect(() => {
        if (!searchUser) {
            setSearchUser('');
        }
    }, [foundUsers, searchUser]);
    const access_token = useSelector((state) => state.auth['access_token']);
    useEffect(() => {
        if (searchUser !== '' && access_token) {
            const fetchUsers = async () => {
                await axios.get(`${searchUserRoute}?username=${searchUser}`, {
                    withCredentials: true,
                    headers: { Authorization: access_token }
                }).then((result) => {
                    setFoundUsers(result.data);
                }).catch((err) => {
                    console.error(err);
                });
            };
            fetchUsers();
        }
        if (searchUser === '') {
            setFoundUsers([]);
        }
    }, [searchUser, access_token]);
    return (
        <>
            <motion.input type='text' onFocus={handleFocus} onBlur={handleBlur} onChange={handleChange}
                whileFocus={{ backgroundColor: '#97F6FF' }} />
            <AiOutlineSearch className='logo' />
            {
                foundUsers.length !== 0 && isFocused && searchUser.length !== 0 ?
                    <UserSearchContainer as={motion.div}
                        initial={{ opacity: 0, scale: 0.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}>
                        {
                            foundUsers.map((foundUser) => {
                                return <UserCard key={foundUser._id} username={foundUser.username} fullname={foundUser.fullname} avatar={foundUser.avatar} _id={foundUser._id} />;
                            })
                        }</UserSearchContainer> : <></>
            }
        </>
    );
};

const UserSearchContainer = styled(motion.div)`
    position: absolute;
    z-index: 1;
    border: 1px solid #E8E8E8;
    border-radius: 25px;
    top: 60px;
    width: 90%;
`;

export default SearchContainer;;