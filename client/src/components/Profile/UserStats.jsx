import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import MiniStatsFollowers from './MiniStatsFollowers';
import MiniStatsFollowing from './MiniStatsFollowing';

const UserStats = ({ sender, username, followers, following, fullname, email, story }) => {
    const [showMiniStatsFollowers, setShowMiniStatsFollowers] = useState(false);
    const [showMiniStatsFollowing, setShowMiniStatsFollowing] = useState(false);
    const openFollowers = () => {
        setShowMiniStatsFollowers(true)
    }
    const openFollowing = () => {
        setShowMiniStatsFollowing(true)
    }
    return (
        <Container>
            <h2>{username}</h2>
            <motion.span className='spn' style={{ color: '#8C9DFF' }} whileHover={{ color: '#00ff00' }} onClick={openFollowers}>{followers.length} Followers</motion.span> | <motion.span onClick={openFollowing} style={{ color: '#8C9DFF' }} whileHover={{ color: '#00ff00' }} className='spn'>{following.length} Following</motion.span>
            <p style={{ fontSize: '75%' }}> {fullname}</p>
            <p style={{ fontSize: '85%' }}><a style={{ color: '#8C9DFF' }} href={`mailto: ${email}`}>{email}</a></p>
            <p>{story}</p>
            {
                !showMiniStatsFollowers ? <></> : <MiniStatsFollowers sender={sender} setShowMiniStatsFollowers={setShowMiniStatsFollowers} followers={followers} />
            }
            {
                !showMiniStatsFollowing ? <></> : <MiniStatsFollowing sender={sender} setShowMiniStatsFollowing={setShowMiniStatsFollowing} following={following} />
            }
        </Container>
    );
};

const Container = styled.div`
    .spn:hover {
        text-decoration: underline;
        cursor: pointer;
    }
`

export default UserStats;