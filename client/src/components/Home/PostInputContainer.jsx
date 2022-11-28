import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import CreatePost from './CreatePost';

const PostInputContainer = () => {
    const user = useSelector((state) => state.auth.user);
    const theme = useSelector((state) => state.filter.value);
    const [showCreatePost, setShowCreatePost] = useState(false);
    const handleClick = () => {
        setShowCreatePost(true);
    };
    return (
        <Container>
            <img style={{ filter: theme.payload ? 'invert(1)' : 'invert(0)' }} src={user.avatar.url} alt="your profile" />
            <motion.button onClick={handleClick} whileTap={{ scale: 0.7 }} whileHover={{ scale: 0.9, color: '#fff', backgroundColor: '#00B9FF' }} type='submit'>What Are You Thinking Today?</motion.button>
            {
                !showCreatePost ? <></> : <CreatePost setShowCreatePost={setShowCreatePost} user={user} />
            }
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    border-radius: 10px;
    flex-direction: row;
    padding: 15px;
    background-color: #F9F4F4;
    >img {
        width: 10%;
        border-radius: 30px;
    }
    gap: 10px;
    button {
        width: 70%;
        border: 1px solid #00B9FF;
        background-color: #fff;
        color: #00B9FF;
        border-radius: 15px;
        cursor: pointer;
    }
`;

export default PostInputContainer;