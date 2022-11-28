import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const ProfileImage = ({ avatar, username }) => {
    const theme = useSelector((state) => state.filter.value);
    console.log(avatar);
    return (
        <Container>
            <img style={{ filter: theme.payload ? 'invert(1)' : 'invert(0)', borderRadius: '50%' }} src={avatar.url} alt={username} />
        </Container>
    );
};

const Container = styled.div`
    grid-area: profile_image;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
        width: 75%;
        height: 75%;
    }
`

export default ProfileImage;