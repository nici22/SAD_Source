import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { followRoute, isFollowingRoute } from '../../utils/APIRoutes';

const Follow = ({ _id, following }) => {
    const [isFollowing, setIsFollowing] = useState(false);
    const [waiting, setWaiting] = useState(false);
    const sender = useSelector((state) => state.auth.user._id);
    const access_token = useSelector((state) => state.auth['access_token']);
    useEffect(() => {
        const fetchIsFollowing = async () => {
            await axios.post(isFollowingRoute, {
                sender,
                receiver: _id,
            }, {
                withCredentials: true,
                headers: { Authorization: access_token },
            }).then((result) => {
                setIsFollowing(result.data)
                console.log(result.data)
            });
        };
        fetchIsFollowing();
    }, [_id, access_token, sender]);
    const handleClick = async () => {
        setWaiting(true);
        await axios.post(followRoute, {
            sender,
            receiver: _id,
        }, {
            withCredentials: true,
            headers: { Authorization: access_token },
        }).then((result) => {
            setIsFollowing(!isFollowing);
        }).catch((err) => {
            console.error(err);
        });
        setWaiting(false);
    };
    return (
        <Container>
            <motion.button onClick={handleClick}
                whileHover={{ backgroundColor: '#6178FF', scale: 0.9, color: '#fff' }}
                whileTap={{ scale: 0.7 }}>
                {waiting ? <>...</> : (isFollowing ? "Unfollow" : "Follow")}
            </motion.button>
        </Container>
    );
};

const Container = styled.div`
    justify-items: center;
    align-items: center;
    display: flex;
    button {
        border: 1px solid #6178FF;
        border-radius: 10px;
        background-color: transparent;
        color: #6178FF;
        cursor: pointer;
        width: 80%;
        height: 20%;
    }
`;

export default Follow;