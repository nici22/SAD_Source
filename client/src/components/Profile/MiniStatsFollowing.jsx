import React from 'react';
import styled from 'styled-components';
import FollowingCard from './FollowingCard';
import { AiOutlineClose } from 'react-icons/ai';

const MiniStatsFollowing = ({ following, sender, setShowMiniStatsFollowing }) => {
    const handleClick = () => {
        setShowMiniStatsFollowing(false);
    }
    return (
        <Container>
            <FollowersContainer>
                <strong style={{ fontSize: '1.3em' }}>Following</strong>
                <hr />
                {
                    following.map(following => {
                        return <FollowingCard sender={sender} key={following} user_id={following} />;
                    })
                }
                <AiOutlineClose onClick={handleClick} />
            </FollowersContainer>
        </Container>
    );
};

const Container = styled.div`
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    backdrop-filter: brightness(30%);
    align-items: center;
    justify-content: center;
    display: flex;
`;

const FollowersContainer = styled.div`
    background-color: #F1F1F1;
    padding: 20px 10px;
    width: 350px;
    position: relative;
    height: 400px;
    border: 1px solid #222;
    border-radius: 5px;
    svg {
        cursor: pointer;
        position: absolute;
        top: 7px;
        right: 7px;
        width: 1.2em;
        height: 1.2em;
    }
`;

export default MiniStatsFollowing;