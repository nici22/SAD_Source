import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { NavLink, useNavigate } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai';
import { BsChatQuoteFill } from 'react-icons/bs';
import { MdExplore } from 'react-icons/md';
import { IoNotificationsSharp } from 'react-icons/io5';
import { CgDarkMode } from 'react-icons/cg';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../redux/filterSlice';
import { MdOutlineLogout } from 'react-icons/md';
import SearchContainer from './SearchContainer';
import axios from 'axios';
import { logoutRoute } from '../../utils/APIRoutes';
import { AiOutlineProfile } from 'react-icons/ai';

const HeaderContainer = () => {
    const navigate = useNavigate();
    const handleLogout = async () => {
        localStorage.removeItem("persist:root");
        await axios.post(logoutRoute, {}, { withCredentials: true });
        navigate('/login');
    };
    const data = useSelector((state) => state.auth);
    useEffect(() => {
        if (data) {
            if (!data.user) {
                navigate('/login');
            }
            if (!data.user['_id']) {
                navigate('/login');
            }
        }
    }, [data, navigate]);
    const dispatch = useDispatch();
    const filterClick = () => {
        const elm = document.body;
        if (elm.classList.contains("filter")) {
            elm.classList.remove("filter");
            dispatch(setFilter(false));
        }
        else {
            elm.classList.add("filter");
            dispatch(setFilter(true));
        }
    };
    const filter = useSelector((state) => state.filter.value);
    useEffect(() => {
        if (filter.payload) {
            const elm = document.body;
            elm.classList.add("filter");
        }
    }, [filter.payload]);
    const my_id = useSelector(state => state.auth.user['_id']);
    const handleClick = () => {
        navigate(`/profile/${my_id}`);
    };
    return (
        <Container>
            <WebName>
                <motion.span style={{ fontSize: '1.3em', color: '#787ADF' }}
                    whileHover={{ color: '#00FF36' }}
                    onClick={handleClick}><AiOutlineProfile /></motion.span>
            </WebName>
            <Search>
                <SearchContainer />
            </Search>
            <NavLinks>
                <NavLink to='/home'>
                    <AiFillHome />
                </NavLink>
                <NavLink to='/chat'>
                    <BsChatQuoteFill />
                </NavLink>
                <NavLink to='/discover'>
                    <MdExplore />
                </NavLink>
                <NavLink to='/notify'>
                    <IoNotificationsSharp />
                </NavLink>
                <MdOutlineLogout style={{ cursor: 'pointer' }} onClick={handleLogout} />
                <CgDarkMode style={{ cursor: "pointer" }} onClick={filterClick} />
            </NavLinks>
        </Container>
    );
};

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-areas:
        "web_name search_users nav_links";
    grid-template-columns: 1fr 3fr 2fr;
    * {
        margin-left: 10px;
        margin-right: 10px;
    }
    align-items: center;
    .logo {
        position: absolute;
    }
    .active {
        border-bottom: 1px solid #D0AF78;
    }
`;

const Search = styled.div`
    position: relative;
    height: 100%;
    display: flex;
    align-items: center;
    input {
        margin: 0;
        width: 90%;
        height: 60%;
        padding-left: 30px;
        outline: none;
        border: none;
        border-radius: 10px;
        background-color: #fff;
    }
`;

const WebName = styled.div`
    span {
        font-size: large;
        cursor: pointer;
    }
`;

const NavLinks = styled.div`
    display: flex;
    a {
        color: #D0AF78;
        *:hover {
            color: #63CDE4;
        }
    }
`;

export default HeaderContainer;