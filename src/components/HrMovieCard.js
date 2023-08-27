import React from 'react';
import { styled } from 'styled-components';
import { IMAGE_BASE_URL } from '../Constant/Api_key';
import { Link } from 'react-router-dom';

const HrMovieCard = ({movie}) => {
  return (
    <Link to={`/detail/${movie.id}`}>
    <SliderTrack>
      <Wrap key={movie.id}>
        <a>
        <img src={`${IMAGE_BASE_URL}${movie.poster_path}`} />
        </a>
        <h2>{movie.title}</h2>
      </Wrap>
    </SliderTrack>
  </Link>
 )
}

const SliderTrack = styled.div`
 transition: transform 0.3s ease-in-out;
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
padding: 4px;
border-radius:20px;
width:300px;

img {
  width: 100%;
 //  height: 300px;
  object-fit: cover;
  border-radius:20px;
}

&:hover {
  padding: 0;
  border: 4px solid rgba(249, 249, 249, 0.8);
  transform: scaleX(-1)
  transition-duration: 300ms;
}
}

h2{
  font-size:20px;
  margin-left:20px;
}
`

export default HrMovieCard