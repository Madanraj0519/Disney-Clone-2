import React, { useEffect } from 'react'
import { styled } from 'styled-components';
import GenereByList from './GenereByList';

import ImageSlider from "./ImageSlider";
import Viewers from './Viewers';


const Home = () => {

  return (
    <Container>
      <ImageSlider />
      <Viewers />
      <GenereByList />
    </Container>
  )
}

const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);

  &:after {
    background: url("/disney-images/images/home-background.png") center center / cover
      no-repeat fixed;
    content: "";
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;

export default Home