import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const CommentSection = ({ setShowCommentSection }) => {
    return (
        <Container>
            <motion.input type='text' />
        </Container>
    );
};

const Container = styled.div`
    position: absolute;
    left: 0;
    top: 20px;
`;

export default CommentSection;