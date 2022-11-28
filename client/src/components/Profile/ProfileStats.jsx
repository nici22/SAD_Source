import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Follow from './Follow';
import UserStats from './UserStats';
import Edit from './Edit';

const ProfileStats = ({ _id, fullname, gender, username, email, followers, following, story, avatar, website, mobile, address }) => {
    const sender = useSelector((state) => state.auth.user._id);
    const location = useLocation();
    const [pathName, setPathName] = useState(null);
    useEffect(() => {
        if (location) {
            let tmp = location.pathname.slice(location.pathname.lastIndexOf("/") + 1, location.pathname.length);
            setPathName(tmp);
        }
    }, [location]);
    return (
        <Container>
            {
                pathName ? <UserStats sender={sender} username={username} fullname={fullname} followers={followers} following={following} story={story} email={email} /> : <></>
            }
            {
                pathName ? (sender === pathName ? <Edit _id={_id} address={address} website={website} mobile={mobile} gender={gender} username={username} fullname={fullname} followers={followers} following={following} story={story} email={email} avatar={avatar} /> : <Follow _id={_id} following={following} />) : <></>
            }
        </Container>
    );
};

const Container = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-template-areas:
        "user_stats follow";
`;

export default ProfileStats;