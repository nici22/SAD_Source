import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { getHomePostsRoute } from '../../utils/APIRoutes';
import HomeOnePost from './HomeOnePost';

const FollowPosts = () => {
    const [posts, setPosts] = useState([]);
    const [display, setDisplay] = useState(false);
    const access_token = useSelector((state) => state.auth['access_token']);
    useEffect(() => {
        const fetchPosts = async () => {
            await axios.get(getHomePostsRoute, {
                withCredentials: true,
                headers: { Authorization: access_token }
            })
                .then((result) => {
                    console.log(result.data.posts);
                    console.log(typeof(result.data.posts));
                    setDisplay(true);
                    setPosts(result.data.posts);
                })
                .catch((err) => {
                    console.error(err);
                });
        };
        fetchPosts();
    }, [access_token]);
    return (
        <Container>
            {!display ? <>
                <SkeletonContainer>
                    <Skeleton style={{ width: '75%', height: '60px' }} />
                    <Skeleton style={{ width: '75%', height: '300px' }} />
                </SkeletonContainer></>
                :
                <>
                {
                    posts.map(post => {
                        return <HomeOnePost key={post._id} post={post} />
                    })
                }
                </>
            }
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

const SkeletonContainer = styled.div`
    
`;

export default FollowPosts;