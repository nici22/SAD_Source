import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { getUserFromCommentRoute } from '../../utils/APIRoutes';

const CommentCard = ({ comment }) => {
    const access_token = useSelector((state) => state.auth['access_token']);
    const [commentData, setCommentData] = useState(null);
    useEffect(() => {
        const fetchUser = async () => {
            await axios.get(`${getUserFromCommentRoute}/${comment}`, {
                withCredentials: true,
                headers: { Authorization: access_token }
            })
                .then((result) => {
                    setCommentData(result.data.comments);
                    console.log(result.data);
                })
                .catch((err) => {
                    console.error(err);
                });
        };
        fetchUser();
    }, [access_token]);
    return (
        <Container>
            {
                commentData && (
                    <>
                        <div style={{ display: 'flex' }}>
                            <img style={{ height: '40px', gap: '10px' }} src={commentData.user.avatar?.url} alt='sdf' />
                            <span>{commentData.user.username}</span>
                        </div>
                        <span>{commentData.content}</span>
                    </>
                )
            }
        </Container>
    );
};

const Container = styled.div`
    div {
        display: flex;
        justify-content: center;
        align-items: center;
        
    }
    display: flex;
    flex-direction: column;
    width: 60px;
    height: 100px;
`;

export default CommentCard;