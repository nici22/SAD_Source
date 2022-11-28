import { motion } from 'framer-motion';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const UserCard = ({ avatar, username, fullname, _id }) => {
    const navigate = useNavigate();
    const handleClick = () => {
        console.log(avatar);
        navigate(`/profile/${_id}`);
    };
    return (
        <Container onClick={handleClick} as={motion.div}
            whileHover={{ backgroundColor: '#138FFF'}}>
            <img src={avatar.url} alt={fullname} />
            <p>{username}</p>
        </Container>
    );
};

const Container = styled(motion.div)`
    display: flex;
    cursor: pointer;
    justify-content: start;
    align-content: center;
    justify-items: start;
    align-items: center;
    margin: 0;
    margin-bottom: 2px;
    margin-top: 2px;
    border-radius: 20px;
    height: 70px;
    background-color: #F7F7F7;
    img {
        border-radius: 35px;
        width: 70px;
    }
    p {
        overflow: hidden;
    }
`;

export default UserCard;