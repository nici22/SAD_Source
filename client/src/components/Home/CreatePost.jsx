import { motion } from 'framer-motion';
import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { BsImage, BsFillCameraFill } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { AiOutlineClose } from 'react-icons/ai';
import axios from 'axios';
import { createPostRoute } from '../../utils/APIRoutes';
import { useSelector } from 'react-redux';

const CreatePost = ({ setShowCreatePost, user }) => {
    const videoRef = useRef();
    const refCanvas = useRef();
    const [tracks, setTracks] = useState('');
    const [images, setImages] = useState([]);
    const [fileUpload, setFileUpload] = useState([]);
    const [content, setContent] = useState('');
    const [stream, setStream] = useState(false);
    const [title, setTitle] = useState('');
    const ToastOptions = { theme: 'dark', pauseOnHover: false, draggable: true, position: 'bottom-right', autoClose: 2500 };
    const handleChangeImages = async (e) => {
        const files = [...e.target.files];
        let err = '';
        let newImages = [];
        files.forEach(file => {
            if (!file) return err = 'File Does Not Exist';
            if (file.size > 1024 * 1024 * 20) return err = 'File Size Is Too Big';
            return newImages.push(file);
        });
        if (err) toast.error(err, ToastOptions);
        setImages([...images, ...newImages]);
        const file = e.target.files;
        async function fileListToBase64(fileList) {
            // create function which return resolved promise
            // with data:base64 string
            function getBase64(file) {
                const reader = new FileReader();
                return new Promise(resolve => {
                    reader.onload = ev => {
                        resolve(ev.target.result);
                    };
                    reader.readAsDataURL(file);
                });
            }
            const promises = [];

            // loop through fileList with for loop
            for (let i = 0; i < fileList.length; i++) {
                promises.push(getBase64(fileList[i]));
            }

            // array with base64 strings
            return await Promise.all(promises);
        }
        const arrayOfBase64 = await fileListToBase64(file);
        setFileUpload(arrayOfBase64);
    };
    const access_token = useSelector((state) => state.auth['access_token']);
    const theme = useSelector((state) => state.filter.value);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (handleValidation()) {
            const toast_id = toast.loading("Please wait...", ToastOptions);
            await axios.post(createPostRoute, {
                content,
                images: { 'fileUpload': fileUpload },
                title,
            }, {
                withCredentials: true,
                headers: { Authorization: access_token }
            }).then((result) => {
                toast.update(toast_id, { render: "Everything is okay", type: "success", isLoading: false, autoClose: 2500 });
                tracks && tracks.stop();
                setShowCreatePost(false);
                console.log(result.data);
            })
                .catch((err) => {
                    if (err.response.status === 400) {
                        toast.update(toast_id, { render: err.response.data.msg, type: "error", isLoading: false, autoClose: 2500 });
                    }
                    else {
                        toast.update(toast_id, { render: 'Internal Error, please contact with huseynagazade969@gmail.com', type: "error", isLoading: false, autoClose: 2500 });
                    }
                    console.error(err);
                });
        }
    };
    const handleStream = () => {
        setStream(true);
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(mediaStream => {
                    videoRef.current.srcObject = mediaStream;
                    videoRef.current.play();
                    const track = mediaStream.getTracks();
                    setTracks(track[0]);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };
    const handleValidation = () => {
        if (images.length === 0) {
            toast.error('Please Provide An Image', ToastOptions);
            return false;
        }
        if (!user.isSubscribed && images.length > 3) {
            toast.error('Normal Users Can Only Post 3 images!!!', ToastOptions);
            return false;
        }
        if (images.length > 10) {
            toast.error('No More Than 10 Images is allowed');
            return false;
        }
        if (!content) {
            toast.error('Please Provide Some Content', ToastOptions);
            return false;
        }
        if (!title) {
            toast.error('Please Provide Some Title', ToastOptions);
            return false;
        }
        return true;
    };
    const handleStop = () => {
        tracks.stop();
        setStream(false);
    };
    const handleCapture = () => {
        const width = videoRef.current.clientWidth;
        const height = videoRef.current.clientHeight;
        refCanvas.current.setAttribute("width", width);
        refCanvas.current.setAttribute("height", height);
        const ctx = refCanvas.current.getContext('2d');
        ctx.drawImage(videoRef.current, 0, 0, width, height);
        let URL = refCanvas.current.toDataURL();
        console.log(URL);
        setImages([...images, { camera: URL }]);
        setFileUpload(current => [...fileUpload, URL]);
    };
    return (
        <Container>
            <PostContainer as={motion.form} onSubmit={handleSubmit}
                initial={{ top: '-100%' }}
                transition={{ duration: 0.85, delay: 0.1 }}
                animate={{ top: '20px' }}
                exit={{ top: '-100%' }}>
                <p style={{ textAlign: 'center' }}>Create Post</p>
                <motion.input type='text' placeholder='Title of the video for search' onChange={(e) => setTitle(e.target.value)}
                    whileFocus={{ borderBottom: "1px solid #8BB8E5", scale: 0.9, originX: '0px' }} />
                <textarea placeholder={`${user.fullname}, What Are You Thinking`} onChange={(e) => setContent(e.target.value)} />
                <IconsContainer>
                    <div style={{ width: '32px', height: '32px' }} className="file_upload">
                        <input type="file" multiple name="file" id="file" accept="image/*,video/*" onChange={handleChangeImages} />
                        <label htmlFor='file'>
                            <BsImage style={{ cursor: 'pointer' }} />
                        </label>
                    </div>
                    <BsFillCameraFill style={{ cursor: 'pointer' }} onClick={handleStream} />
                </IconsContainer>
                {
                    stream && <StreamContainer>
                        <video autoPlay muted ref={videoRef} style={{ filter: theme.payload ? 'invert(1)' : 'invert(0)', width: '30%', height: '30%' }} />
                        <AiOutlineClose onClick={handleStop} style={{ cursor: 'pointer' }} />
                        <motion.button type='button' style={{ width: '20%', height: '30px' }} onClick={handleCapture}
                            whileHover={{ backgroundColor: '#00B9FF', scale: 0.9, color: '#fff' }}
                            whileTap={{ scale: 0.8 }}>Take Photo</motion.button>
                        <canvas ref={refCanvas} style={{ display: 'none' }} />
                    </StreamContainer>
                }
                {
                    images && <ImagesContainer style={{ maxHeight: '150px', overflow: 'auto', padding: '10px' }}>
                        {
                            images.map((img, index) => {
                                const deleteImage = () => {
                                    const newIMG = [...images];
                                    newIMG.splice(index, 1);
                                    setImages(newIMG);
                                };
                                return <div key={index}>
                                    <img style={{ filter: theme.payload ? 'invert(1)' : 'invert(0)' }} src={img.camera ? img.camera : URL.createObjectURL(img)} alt={img.name} />
                                    <AiOutlineClose style={{ cursor: 'pointer' }} onClick={deleteImage} />
                                </div>;
                            })
                        }
                    </ImagesContainer>
                }
                <motion.button style={{ display: 'block', alignContent: 'center', width: '100%', height: '35px' }}
                    whileHover={{ scale: 0.9, backgroundColor: '#00B9FF', color: '#fff' }}
                    whileTap={{ scale: 0.8 }}>Share</motion.button>
                <AiOutlineClose onClick={() => { tracks && tracks.stop(); setShowCreatePost(false); }} style={{ position: 'absolute', cursor: 'pointer', top: '5px', right: '5px', width: '1.5em', height: '1.5em' }} />
            </PostContainer>
        </Container>
    );
};

const Container = styled.div`
    z-index: 1;
    display: flex;
    width: 100vw;
    height: 100vh;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    backdrop-filter: brightness(30%);
`;

const ImagesContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    img {
        width: 100px;
    }
    div {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
    }
    svg {
        position: absolute;
        right: -10px;
        top: -10px;
    }
`;

const PostContainer = styled(motion.form)`
    position: relative;
    gap: 10px;
    .file_upload {
        position: relative;
    }
    input[type=file] {
        display: none;
        top: 0;
        left: 0;
        position: absolute;
        width: 32px;
        height: 32px;
    }
    >input {
        font-size: 1.2em;
        padding-left: 10px;
        border: none;
        outline: none;
        border-bottom: 1px solid #BEA4A4;
    }
    textarea {
        padding: 5px;
        font-size: 1.2em;
        width: 500px;
        height: 200px;
        border-radius: 10px;
        outline: none;
    }
    display: flex;
    >p {
        font-size: 1.5em;
    }
    flex-direction: column;
    position: absolute;
    background-color: #fff;
    padding: 20px;
    border-radius: 20px;
    width: 500px;
    min-height: 400px;
`;

const IconsContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    svg {
        height: 2em;
        color: #409328;
        width: 2em;
    }
`;

const StreamContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

export default CreatePost;