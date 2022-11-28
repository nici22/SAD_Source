import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { followRoute, getUserByIdRoute, isFollowingRoute } from '../../utils/APIRoutes';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const FollowerCard = ({ user_id, sender }) => {
    const access_token = useSelector((state) => state.auth['access_token']);
    const ToastOptions = { theme: 'dark', pauseOnHover: false, draggable: true, position: 'bottom-right', autoClose: 2500 };
    const [isFollowing, setIsFollowing] = useState(false);
    useEffect(() => {
        const fetchFunction = async () => {
            await axios.post(isFollowingRoute, {
                sender,
                receiver: user_id,
            }, {
                withCredentials: true,
                headers: { Authorization: access_token },
            }).then((result) => {
                setIsFollowing(result.data);
            });
        };
        fetchFunction();
    }, [access_token, user_id, sender]);
    const [userState, setUserState] = useState({ _id: '#', avatar: 'https://www.citypng.com/public/uploads/preview/loading-load-icon-transparent-png-11639609114lctjenyas8.png', fullname: '......', username: '......' });
    useEffect(() => {
        const fetchUser = async () => {
            await axios.get(`${getUserByIdRoute}/${user_id}`, {
                withCredentials: true,
                headers: { Authorization: access_token },
            }).then((res) => {
                setUserState(res.data.user);
            });
        };
        fetchUser();
    }, [access_token, user_id]);
    const handleClick = async () => {
        const toast_id = toast.loading("Please wait...", ToastOptions);
        await axios.post(followRoute, {
            sender,
            receiver: user_id,
        }, {
            withCredentials: true,
            headers: { Authorization: access_token },
        }).then((result) => {
            setIsFollowing(!isFollowing);
            var txt;
            if (isFollowing === true) {
                txt = 'Not Following';
            };
            if (isFollowing === false) {
                txt = 'Following';
            };
            toast.update(toast_id, { render: `${txt} ${userState.username}`, type: "success", isLoading: false, autoClose: 1200 });
        }).catch((err) => {
            toast.update(toast_id, { render: err.response.data.msg, type: "error", isLoading: false, autoClose: 2500 });
        console.error(err);
        })
    };
return (
    <Container>
        <img src={userState.avatar.url} alt={userState.fullname} />
        <div>
            <span>{userState.username}</span>
            <span style={{ fontSize: '0.8em' }}>{userState.fullname}</span>
            <FollowButton as={motion.button} onClick={handleClick}
                whileHover={{ backgroundColor: '#6178FF', scale: 0.9, color: '#fff' }}>
                {
                    isFollowing ? "Unfollow" : "Follow"
                }
            </FollowButton>
        </div>
    </Container>
);
};

const Container = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    color: green;
    background-color: #fff;
    border-radius: 5px;
    img {
        width: 50px;
        height: 50px;
        border-radius: 25px;
    }
    div {
        display: flex;
        flex-direction: column;
    }
`;

const FollowButton = styled(motion.button)`
    position: absolute;
    top: 8px;
    right: 8px;
    color: #6178FF;
    background-color: #fff;
    border: 1px solid #6178FF;
    border-radius: 10px;
    height: 35px;
    cursor: pointer;
`;

export default FollowerCard;