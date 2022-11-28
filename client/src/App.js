import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Register from './pages/Register';
import 'react-toastify/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Login from './pages/Login';
import Home from './pages/Home';
import styled from 'styled-components';
import HeaderContainer from './components/Home/HeaderContainer';
import Chat from './pages/Chat';
import Discover from './pages/Discover';
import Notify from './pages/Notify';
import Profile from './pages/Profile';
import VerifyEmail from './pages/VerifyEmail';
import ForgotPassword from './pages/ForgotPassword';
import PasswordReset from './pages/PasswordReset';
import NotFound from './pages/NotFound';
import Posts from './pages/Posts';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultPages />}>
          <Route element={<Register />} onLogin path='/register' />
          <Route element={<Login />} path='/login' />
          <Route element={<VerifyEmail />} path='/users/:id/verify/:token' />
          <Route element={<ForgotPassword />} path='/forgot-password' />
          <Route element={<PasswordReset />} path='/password-reset/:id/:token' />
        </Route>
        <Route element={<NavPages />}>
          <Route element={<Home />} path='/home' />
          <Route element={<Chat />} path='/chat' />
          <Route element={<Discover />} path='/discover' />
          <Route element={<Notify />} path='/notify' />
          <Route element={<Profile />} path='/profile/:_id' />
          <Route element={<Posts />} path='/posts/:post_id' />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

const DefaultPages = () => {
  return (
    <>
      <ToastContainer />
      <Outlet />
    </>
  );
};

const NavPages = () => {
  return (
    <>
      <PageContainer>
        <Header>
          <HeaderContainer />
        </Header>
        <Main>
          <Outlet />
        </Main>
      </PageContainer>
      <ToastContainer />
    </>
  );
};

const PageContainer = styled.div`
  display: grid;
  grid-template-areas:
    ". header ."
    ". main .";
  grid-template-rows: 60px calc(100% - 70px);
  grid-template-columns: 1fr 3fr 1fr;
  width: 100%;
  height: 100%;
  background-color: #fff;
  gap: 10px;
`;

const Header = styled.header`
  background-color: #F9F4F4;
  margin-top: 10px;
  grid-area: header;
  border-radius: 20px;
`;

const Main = styled.main`
  grid-area: main;
`;

export default App;