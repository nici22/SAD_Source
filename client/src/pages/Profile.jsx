import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import ProfileImage from '../components/Profile/ProfileImage';
import ProfileStats from '../components/Profile/ProfileStats';
import { GetUserRoute } from '../utils/APIRoutes';
import UserPosts from '../components/Profile/UserPosts';

const Profile = () => {
  const location = useLocation();
  const [pathName, setPathName] = useState(null);
  const [profileUser, setProfileUser] = useState([]);
  useEffect(() => {
    if (location) {
      let tmp = location.pathname.slice(location.pathname.lastIndexOf("/") + 1, location.pathname.length);
      setPathName(tmp);
    }
  }, [location]);
  const access_token = useSelector((state) => state.auth['access_token']);
  useEffect(() => {
    if (pathName && access_token) {
      const fetchUser = async () => {
        await axios.get(`${GetUserRoute}/${pathName}`, {
          withCredentials: true,
          headers: { Authorization: access_token },
        }).then((result) => {
          console.log(result.data.avatar);
          setProfileUser(result.data);
        }).catch((err) => {
          console.error(err);
        });
      };
      fetchUser();
    }
  }, [pathName, access_token]);
  if (profileUser.length === 0) {
    return <></>;
  }
  return (
    <Container>
      <ProfileImage avatar={profileUser.avatar} username={profileUser.username} />
      <ProfileStats mobile={profileUser.mobile} address={profileUser.address} website={profileUser.website} gender={profileUser.gender} _id={pathName} avatar={profileUser.avatar} fullname={profileUser.fullname} username={profileUser.username} email={profileUser.email} following={profileUser.following} followers={profileUser.followers} story={profileUser.story} />
      <UserPosts />
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: 200px auto;
  grid-template-rows: 200px auto;

  grid-template-areas:
    "profile_image profile_stats"
    "user_posts user_posts";
`;

export default Profile;