import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { AiFillDislike, AiFillLike, AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';
import { FaCommentDots, FaRegCommentDots } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Carousel } from 'react-responsive-carousel';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { dislikePostRoute, likePostRoute } from '../../utils/APIRoutes';
import CommentSection from '../Posts/CommentSection';

const HomeOnePost = ({ post }) => {
    const access_token = useSelector((state) => state.auth['access_token']);
    const ToastOptions = { theme: 'dark', pauseOnHover: false, draggable: true, position: 'bottom-right', autoClose: 2500 };
    const [showCommentSection, setShowCommentSection] = useState(false);
    const [commentChecker, setCommentChecker] = useState(false);
    const [likeCount, setLikeCount] = useState({ value: post.likes.length });
    const auth = useSelector((state) => state.auth.user._id);
    useEffect(() => {
        if (post.likes.includes(auth)) setLikeChecker(true);
        if (post.dislikes.includes(auth)) setDislikeChecker(true);
    }, []);
    const [commentCount] = useState({ value: post.comments.length });
    const [dislikeCount, setDislikeCount] = useState({ value: post.dislikes.length });
    const [likeChecker, setLikeChecker] = useState(false);
    const [dislikeChecker, setDislikeChecker] = useState(false);
    const theme = useSelector(state => state.filter.value);
    const handleLike = async () => {
        await axios.post(`${likePostRoute}/${post._id}`, {}, {
            withCredentials: true,
            headers: { Authorization: access_token }
        })
            .then((result) => {
                setLikeCount({ ...likeCount, value: result.data.length });
                setDislikeCount({ ...dislikeCount, value: result.data.second });
            });
    };
    const handleDislike = async () => {
        await axios.post(`${dislikePostRoute}/${post._id}`, {}, {
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
    return (
        <Container>
            <PostOwnerContainer>
                <img style={{ filter: theme.payload ? 'invert(1)' : 'invert(0)' }} src={post.user.avatar.url} alt={post.user.fullname} />
                <p>{post.user.fullname}</p>
            </PostOwnerContainer>
            <Carousel style={{ border: '1px solid #ECEBFF' }} width='75%' height='300px' useKeyboardArrows={true} showThumbs={false}>
                {
                    post.images.map((img, index) => {
                        return <img style={{ filter: theme.payload ? 'invert(1)' : 'invert(0)' }} key={index} src={img} alt={'post'} />;
                    })
                }
            </Carousel>
            <TitleContainer>
                <p>Title: {post.title}</p>
                <hr style={{ width: '75%' }} />
                <p>{post.content}</p>
                <hr style={{ width: '75%' }} />
            </TitleContainer>
            <IconsContainer>
                <div style={{ display: 'flex', gap: '7px' }}>
                    {
                        likeCount.value
                    }
                    {
                        likeChecker ? <AiFillLike /> : <AiOutlineLike onClick={() => { handleLike(); dislikeChecker && setDislikeChecker(!dislikeChecker); setLikeChecker(!likeChecker); }} />
                    }
                </div>
                <div style={{ display: 'flex', gap: '7px' }}>
                    {
                        dislikeCount.value
                    }
                    {
                        dislikeChecker ? <AiFillDislike /> : <AiOutlineDislike onClick={() => { handleDislike(); likeChecker && setLikeChecker(!likeChecker); setDislikeChecker(!dislikeChecker); }} />
                    }
                </div>
                <div style={{ display: 'flex', gap: '7px' }}>
                    {
                        commentCount.value
                    }
                    {
                        commentChecker ? <FaCommentDots onClick={() => { setCommentChecker(false); setShowCommentSection(false); }} /> : <FaRegCommentDots onClick={() => { setCommentChecker(true); setShowCommentSection(true); }} />
                    }
                </div>
            </IconsContainer>
            <div style={{ position: 'relative' }}>
                {
                    !showCommentSection ? <></> : <CommentSection postId={post._id} comments={post.comments} setShowCommentSection={setShowCommentSection} />
                }
            </div>
        </Container>
    );
};

const Container = styled.div``;

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

const TitleContainer = styled.div`
    hr {
        margin-left: 0;
    }
`;

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

export default HomeOnePost;