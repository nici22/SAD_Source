import React from 'react';
import styled from 'styled-components';
import PostInputContainer from './PostInputContainer';
import HomePosts from './HomePosts';

const HomePostContainer = () => {
    return (
        <Container>
            <PostInputContainer />
            <HomePosts />
        </Container>
    );
};

const Container = styled.div`
    grid-area: home_post;
    display: grid;
    grid-template-rows: 75px auto;
    overflow: auto;
    padding: 5px;
    max-height: 90%;
`;

export default HomePostContainer;