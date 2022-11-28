import { motion } from 'framer-motion';
import React, { useState } from 'react';
import styled from 'styled-components';
import EditProfile from './EditProfile';

const Edit = ({ _id, username, email, fullname, followers, following, story, avatar, gender, website, address, mobile }) => {
  const [editProfile, setEditProfile] = useState(false);
  const handleClick = () => {
    setEditProfile(true);
  };
  return (
    <Container>
      <motion.button onClick={handleClick}
        whileHover={{ backgroundColor: '#6178FF', scale: 0.9, color: '#fff' }}
        whileTap={{ scale: 0.7 }}>Edit Profile</motion.button>
      {
        editProfile && (
          <EditProfile _id={_id} website={website} address={address} mobile={mobile} setEditProfile={setEditProfile} username={username} email={email} fullname={fullname} followers={followers} following={following} story={story} gender={gender} avatar={avatar} />)
      }
    </Container>
  );
};

const Container = styled.div`
    justify-items: center;
    align-items: center;
    display: flex;
    button {
        border: 1px solid #6178FF;
        border-radius: 10px;
        background-color: transparent;
        color: #6178FF;
        cursor: pointer;
        width: 80%;
        height: 20%;
    }
`;

export default Edit;