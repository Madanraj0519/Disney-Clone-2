import React from "react";
import genreList from "../Constant/genreList";
import MovieList from "./MovieList";


const GenereByList = () => {
    return (
        <div>
            {
                genreList.genere.map((item, index) => index<=6 && (
                    <div>
                        <h2>{item.name}</h2>
                        <MovieList genreId={item} index_={index} />
                    </div>
                ))
            }
        </div>
    )
}

export default GenereByList

