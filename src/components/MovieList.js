import React, { useEffect, useState } from 'react';
import HrMovieCard from './HrMovieCard';
import MovieCard from './MovieCard';
// import { fetchGenreMovieById } from '../features/Movie/GenreSlice';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from 'styled-components';
import Slider from 'react-slick';
import axios from 'axios';
import {API_KEY, BASE_URL} from "../Constant/Api_key";


const MovieList = ({genreId, index_}) => {

  console.log(genreId);

    const dispatch = useDispatch();
    const [movieState, setMovieState] = useState([]);

    const settings = {
      dots: false,
      className: "center",
      centerPadding: "60px",
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: false
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    }; 

    useEffect(() => {
        // dispatch(fetchGenreMovieById(genreId.id));
        getbyGenre(genreId.id);
    },[genreId, dispatch]);

    const getbyGenre = (genre) => {
      axios.get(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genre}`)
      .then(res =>{
        setMovieState(res.data.results)
      })
    }
      
  return (
    <>
    <Carousel {...settings}>
      {
        movieState.map((movie) => (
          <>
           {
            index_%3 === 0 ? <HrMovieCard movie={movie} /> :  <MovieCard movie={movie} />
           }
          </>
        ))
      }
    </Carousel>
  </>
  )
}


const Carousel = styled(Slider)`

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


export default MovieList