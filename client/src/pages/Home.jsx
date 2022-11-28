import React from 'react';
import styled from 'styled-components';
import HomePostContainer from '../components/Home/HomePostContainer';
import SuggestionsHomeContainer from '../components/Home/SuggestionsHomeContainer';

const Home = () => {
  return (
    <Container>
      <HomePostContainer />
      <SuggestionsHomeContainer />
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 75% 25%;
  width: 100%;
  height: 100%;
  grid-template-areas:
    "home_post suggestions_home";
`;

export default Home;