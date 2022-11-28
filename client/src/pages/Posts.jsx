import React, { useState, useEffect } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import axios from 'axios';
import { dislikePostRoute, fetchPostRoute, findFromPostRoute, likePostRoute } from '../utils/APIRoutes';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styled from 'styled-components';
import { AiFillLike, AiFillDislike, AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';
import { FaRegCommentDots, FaCommentDots } from 'react-icons/fa';
import { toast } from 'react-toastify';
import CommentSection from '../components/Posts/CommentSection';

const Posts = () => {
    const auth = useSelector((state) => state.auth.user._id);
    const [showCommentSection, setShowCommentSection] = useState(false);
    const [commentChecker, setCommentChecker] = useState(false);
    const [likeCount, setLikeCount] = useState({ value: 0 });
    const [dislikeCount, setDislikeCount] = useState({ value: 0 });
    const [likeChecker, setLikeChecker] = useState(false);
    const [dislikeChecker, setDislikeChecker] = useState(false);
    const [showSkeleton, setShowSkeleton] = useState(false);
    const [postImages, setPostImages] = useState(null);
    const access_token = useSelector((state) => state.auth['access_token']);
    const params = useParams();
    const [postOwner, setPostOwner] = useState(null);
    useEffect(() => {
        const fetchPosts = async () => {
            await axios.get(`${fetchPostRoute}/${params.post_id}`, {
                withCredentials: true,
                headers: { Authorization: access_token }
            })
                .then((result => {
                    console.log(result.data.post);
                    setPostImages(result.data.post);
                    if (result.data.post.likes.includes(auth)) setLikeChecker(true);
                    if (result.data.post.dislikes.includes(auth)) setDislikeChecker(true);
                    setLikeCount({ ...likeCount, value: result.data.post.likes.length });
                    setDislikeCount({ ...dislikeCount, value: result.data.post.dislikes.length });
                    setShowSkeleton(true);
                }));
        };
        fetchPosts();
    }, [access_token, params]);
    useEffect(() => {
        if (params.post_id) {
            const fetchData = async () => {
                await axios.get(`${findFromPostRoute}/${params.post_id}`, {
                    withCredentials: true,
                    headers: { Authorization: access_token }
                })
                    .then((result) => {
                        setPostOwner(result.data.user);
                    });
            };
            fetchData();
        }
    }, [access_token, params]);
    const ToastOptions = { theme: 'dark', pauseOnHover: false, draggable: true, position: 'bottom-right', autoClose: 2500 };
    const theme = useSelector(state => state.filter.value);
    const handleDislike = async () => {
        await axios.post(`${dislikePostRoute}/${params.post_id}`, {}, {
            withCredentials: true,
            headers: { Authorization: access_token }
        })
            .then((result) => {
                setDislikeCount({ ...dislikeCount, value: result.data.length });
                setLikeCount(({ ...likeCount, value: result.data.second }));
            })
            .catch((err) => {
                if (err.response.status === 400) {
                    toast.error(err.response.data.msg, ToastOptions);
                }
                console.error(err);
            });
    };
    const handleLike = async () => {
        await axios.post(`${likePostRoute}/${params.post_id}`, {}, {
            withCredentials: true,
            headers: { Authorization: access_token }
        })
            .then((result) => {
                setLikeCount({ ...likeCount, value: result.data.length });
                setDislikeCount({ ...dislikeCount, value: result.data.second });
            });
    };
    return (
        <>
            {!showSkeleton ? <>
                <SkeletonContainer>
                    <Skeleton style={{ width: '75%', height: '60px' }} />
                    <Skeleton style={{ width: '75%', height: '300px' }} />
                </SkeletonContainer></>
                :
                <>
                    <PostOwnerContainer>
                        {postOwner && <>
                            <img style={{ filter: theme.payload ? 'invert(1)' : 'invert(0)' }} src={postOwner.avatar.url} alt={postOwner.fullname} />
                            <p>{postOwner.fullname}</p>
                        </>}
                    </PostOwnerContainer>
                    <Carousel style={{ border: '1px solid #ECEBFF' }} width='75%' height='300px' useKeyboardArrows={true} showThumbs={false}>
                        {
                            postImages.images.map((img, index) => {
                                return <img style={{ filter: theme.payload ? 'invert(1)' : 'invert(0)' }} key={index} src={img} alt={'post'} />;
                            })
                        }
                    </Carousel>
                    <TitleContainer>
                        <p>{postImages.content}</p>
                    </TitleContainer>
                    <IconsContainer>
                        <div style={{ display: 'flex', gap: '7px' }}>
                            {
                                likeCount.value
                            }
                            {
                                likeChecker ? <AiFillLike onClick={() => { setLikeChecker(!likeChecker); }} /> : <AiOutlineLike onClick={() => { handleLike(); dislikeChecker && setDislikeChecker(!dislikeChecker); setLikeChecker(!likeChecker); }} />
                            }
                        </div>
                        <div style={{ display: 'flex', gap: '7px' }}>
                            {
                                dislikeCount.value
                            }
                            {
                                dislikeChecker ? <AiFillDislike onClick={() => { setDislikeChecker(!dislikeChecker); }} /> : <AiOutlineDislike onClick={() => { handleDislike(); likeChecker && setLikeChecker(!likeChecker); setDislikeChecker(!dislikeChecker); }} />
                            }
                        </div>
                        {
                            commentChecker ? <FaCommentDots onClick={() => { setCommentChecker(false); setShowCommentSection(false); }} /> : <FaRegCommentDots onClick={() => { setCommentChecker(true); setShowCommentSection(true); }} />
                        }
                        <div style={{ position: 'relative' }}>
                            {
                                !showCommentSection ? <></> : <CommentSection postId={postImages._id} comments={postImages.comments} setShowCommentSection={setShowCommentSection} />
                            }
                        </div>
                    </IconsContainer>
                </>
            }
        </>
    );
};

const SkeletonContainer = styled.div``;

const TitleContainer = styled.div``;

const IconsContainer = styled.div`
    position: relative;
    display: grid;
    width: 75%;
    grid-template-columns: 1fr 1fr 1fr 7fr;
    justify-items: center;
    svg {
        height: 2em;
        color: #2F97B6;
        cursor: pointer;
    }
`;

const PostOwnerContainer = styled.div`
    width: 75%;
    height: 60px;
    display: flex;
    flex-direction: row;
    border-radius: 10px 10px 0 0px;
    img {
        border-radius: 25px;
    }
    background-color: #F7F7F7;
`;

export default Posts;