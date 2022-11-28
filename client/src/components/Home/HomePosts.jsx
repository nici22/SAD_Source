import React from 'react';
import styled from 'styled-components';
import FollowPosts from './FollowPosts';

const HomePosts = () => {
    return (
        <Container>
            <p>Main Page</p>
            <hr />
            <FollowPosts />
        </Container>
    );
};

const Container = styled.div`
`;

export default HomePosts;