import React,{useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUpcomingMovies } from '../features/Movie/MoviesSlice';
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';

const ImageSlider = () => {

  const dispatch = useDispatch();
  const {upcomingMovies, loading, error} = useSelector((state) => state.movies);
  console.log(upcomingMovies);

  useEffect(() => {
    dispatch(fetchUpcomingMovies());
  },[dispatch])

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slideToShow: 1,
    slideToScroll: 1,
    autoplay: true,
  };  

  if(loading) {
    return <div>loading</div>
  }

  if(error) {
    return <div>Error</div>
  }

  return (
    <div>
      <Carousel {...settings}>
        {
          upcomingMovies.slice(0,11).map((slider) => (
            <Wrap>
              <a key={slider.id}>
                <img src={`https://image.tmdb.org/t/p/w200${slider.poster_path}`} alt={slider.title}
                />
              </a>
            </Wrap>
          ))
        }
      </Carousel>
    </div>
  )
}

const Carousel = styled(Slider)`
   margin-top: 20px;

   & > button {
    opacity: 0;
    height: 100%;
    width: 5vw;
    z-index: 1;

    &:hover {
      opacity: 1;
      transition: opacity 0.2s ease 0s;
    }
   }

   ul li button {
    &:before {
      font-size: 10px;
      color: rgb(150, 158, 171);
    }
  }

  li.slick-active button:before {
    color: white;
  }

  .slick-list {
    overflow: initial;
  }

  .slick-prev {
    left: -75px;
  }

  .slick-next {
    right: -75px;
  }
`;

const Wrap = styled.div`
border-radius: 4px;
cursor: pointer;
position: relative;

a {
 border-radius: 4px;
 box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
   rgb(0 0 0 / 73%) 0px 16px 10px -10px;
 cursor: pointer;
 display: block;
 position: relative;
 padding: 20px;
 width: 100%;

 img {
   min-width: 100%;
   height: 400px;
   object-fit: cover;
 }

 &:hover {
   padding: 0;
   border: 4px solid rgba(249, 249, 249, 0.8);
   transform: scaleX(-1)
   transition-duration: 300ms;
 }
}

`;

export default ImageSlider;