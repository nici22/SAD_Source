import { motion } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';
import registerImage from '../../assets/register.png';

const ImageContainer = () => {
    return (
        <Container as={motion.div}
            initial={{ x: '50%' }}
            animate={{ x: 0, transition: { delay: 1, duration: 1 } }}>
            <img src={registerImage} alt='Register_image' />
        </Container>
    );
};

const Container = styled(motion.div)`
    grid-area: image;
    img {
        width: 100%;
        height: 100%;
    }
    background-color: #47C6B1;
`;

export default ImageContainer;