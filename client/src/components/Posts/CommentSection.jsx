import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { createCommentRoute } from '../../utils/APIRoutes';
import CommentCard from './CommentCard';

const CommentSection = ({ postId, comments, setShowCommentSection }) => {
    const [content, setContent] = useState('');
    const access_token = useSelector((state) => state.auth['access_token']);
    const avatar = useSelector((state) => state.auth.user.avatar);
    const ToastOptions = { theme: 'dark', pauseOnHover: false, draggable: true, position: 'bottom-right', autoClose: 2500 };
    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post(createCommentRoute, {
            content,
            postId
        }, {
            withCredentials: true,
            headers: { Authorization: access_token }
        })
            .then((result) => {
                console.log(result.data);
                toast.info('Message sent successfully', ToastOptions);
            })
            .catch((err) => {
                console.error(err);
            });
    };
    const handleChange = (e) => {
        setContent(e.target.value);
    };
    return (
        <Container >
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                {
                    comments.map(comment => {
                        return <CommentCard key={comment} comment={comment} />;
                    })
                }
            </div>
            <CommentForm onSubmit={handleSubmit}>
                <img src={avatar.url} alt='sdf' />
                <input type='text' placeholder='Add Some Comment' onChange={handleChange} />
                <button>Add</button>
            </CommentForm>
        </Container >
    );
};

const CommentForm = styled.form`
    display: flex;
    grid-area: comments
    flex-direction: row;
    min-width: 100px;
    img {
        height: 42px;
    }
`;

const Container = styled.div`
    position: absolute;
    min-width: 100px;
    height: 100%;
    >form>input {
        font-size: 1.1em;
        outline: none;
        border: none;
        border-bottom: 1px solid black;
        padding: 10px;
    }
    >form>button {
        cursor: pointer;
        padding: 10px;
        color: white;
        background-color: #00C4FF;
        outline: none;
        border: none;
    }
    top: 0;
    left: 0;
    width: 75%;
    min-height: 40px;
    background-color: #F7F7F7;
`;

export default CommentSection;