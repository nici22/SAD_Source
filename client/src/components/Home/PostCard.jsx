import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaRegComment } from 'react-icons/fa';
import { AiOutlineLike } from 'react-icons/ai';

const PostCard = ({ user, avatar, image, link, comments, likes }) => {
    const [showIcons, setShowIcons] = useState(false);
    const handleMouseEnter = () => {
        setShowIcons(true);
    };
    const handleMouseLeave = () => {
        setShowIcons(false);
    };
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/posts/${link}`);
    };
    const theme = useSelector((state) => state.filter.value);
    return (
        <Container onClick={handleClick} as={motion.div} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <motion.img alt={link} src={image} style={{ filter: theme.payload ? 'invert(1) brightness(100%)' : 'invert(0) brightness(100%)' }} />
            {showIcons &&
                <motion.div style={{ position: 'absolute', display: 'flex', width: '100%', height: '100%' }}
                    initial={{ backdropFilter: 'brightness(100%)' }}
                    animate={{ backdropFilter: 'brightness(30%)', transition: { duration: '0.3' } }}>
                    <AiOutlineLike style={{ top: '50%', left: '45%' }} />
                    <FaRegComment style={{ top: '50%', left: '55%' }} />
                </motion.div>}
        </Container>
    );
};

const Container = styled(motion.div)`
    cursor: pointer;
    position: relative;
    img {
        object-fit: cover;
    }
    svg {
        position: absolute;
        color: #fff;
    }
`;

export default PostCard;