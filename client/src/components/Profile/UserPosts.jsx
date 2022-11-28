import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { getPostsRoute } from '../../utils/APIRoutes';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import PostCard from '../Home/PostCard';
import { useParams } from 'react-router-dom';

const UserPosts = () => {
    const [showPost, setShowPost] = useState(false);
    const [posts, setPosts] = useState([]);
    const access_token = useSelector((state) => state.auth['access_token']);
    const params = useParams();
    useEffect(() => {
        const fetchData = async () => {
            await axios.get(`${getPostsRoute}/${params._id}`, {
                withCredentials: true,
                headers: { Authorization: access_token }
            }).then((result) => {
                setPosts(result.data.posts);
                setShowPost(true);
            });
        };
        fetchData();
    }, [access_token, params]);
    return (
        <Container>
            <p>Your Posts</p>
            <hr />
            {!showPost ? <><SkeletonContainer>
                <Skeleton style={{ height: '0', paddingBottom: '125%' }} />
                <Skeleton style={{ height: '0', paddingBottom: '125%' }} />
                <Skeleton style={{ height: '0', paddingBottom: '125%' }} />
            </SkeletonContainer>
                <SkeletonContainer>
                    <Skeleton style={{ height: '0', paddingBottom: '125%' }} />
                    <Skeleton style={{ height: '0', paddingBottom: '125%' }} />
                    <Skeleton style={{ height: '0', paddingBottom: '125%' }} />
                </SkeletonContainer>
                <SkeletonContainer>
                    <Skeleton style={{ height: '0', paddingBottom: '125%' }} />
                    <Skeleton style={{ height: '0', paddingBottom: '125%' }} />
                    <Skeleton style={{ height: '0', paddingBottom: '125%' }} />
                </SkeletonContainer>
                <SkeletonContainer>
                    <Skeleton style={{ height: '0', paddingBottom: '125%' }} />
                    <Skeleton style={{ height: '0', paddingBottom: '125%' }} />
                    <Skeleton style={{ height: '0', paddingBottom: '125%' }} />
                </SkeletonContainer>
            </> : <PostsContainer>
                {
                    posts && posts.map(post => {
                        return <PostCard comments={post.comments} likes={post.likes} key={post._id} link={post._id} image={post.images[0]} />;
                    })
                }
            </PostsContainer>}
        </Container>
    );
};

const Container = styled.div`
    grid-area: user_posts;
`;

const SkeletonContainer = styled.div`
    display: grid;
    gap: 5px;
    grid-template-columns: 1fr 1fr 1fr;
`;

const PostsContainer = styled.div`
    display: grid;
    grid-template-columns: 32% 32% 32%;
    grid-auto-rows: 80%;
    gap: 2%;
    div {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    img {
        width: 100%;
        height: 100%;
    }
`;

export default UserPosts;