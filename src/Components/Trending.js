import React, { useState, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import "../App.css"
import Spinner from './Spinner';

export default function Trending() {
    const [trending, setTrending] = useState([])
    let [page, setpage] = useState(1)
    const [type, setType] = useState('all')
    const [time,setTime] = useState('day')

    const getMoreTrendingMovies = async () => {
        if (trending.length === 0) {
            setpage(1)
        }
        else {
            setpage(++page)
        }
        const response = await fetch(`https://api.themoviedb.org/3/trending/${type}/${time}?api_key=b3506838d86a0332b82e597ec8d36406&page=${page}`);
        const jsonData = await response.json();
        setTrending(trending.concat(jsonData.results))

    };
    const getTrendingMovies = async () => {
        const response = await fetch(`https://api.themoviedb.org/3/trending/${type}/${time}?api_key=b3506838d86a0332b82e597ec8d36406&page=1`);
        const jsonData = await response.json();
        setTrending(trending.concat(jsonData.results))
    };
    
    useEffect(() => {
        getTrendingMovies()
    }, [type])


    return (
        <div className='trendingMain' id='trendingMain'>
            <h1 className='text-light'>Trending</h1>
            
            <hr></hr>
            <div className='dropDowns justify-content-center d-flex'>
                <div class="dropdown show mx-4">
                    <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Type
                    </a>

                    <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        <button class="dropdown-item" value="all" >All</button>
                        <button class="dropdown-item" value="movie" >Movies</button>
                        <button class="dropdown-item" value="tv" >Series</button>
                        <button class="dropdown-item" value="person" >People</button>
                    </div>
                </div>
                <div class="dropdown show mx-4">
                    <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Time
                    </a>

                    <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        <a class="dropdown-item" href="#">Today</a>
                        <a class="dropdown-item" href="#">This Week</a>
                    </div>
                </div>
            </div>
            <InfiniteScroll
                dataLength={trending.length} //This is important field to render the next data
                next={getMoreTrendingMovies}
                hasMore={true}
                loader={<Spinner />}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
            >
                <div className='row d-flex align-items-center justify-content-between'>
                    {trending.map((element, index) => {
                        return <div className='Trendcard col-lg-3 col-xl-2 col-md-5 mx-1' key={index} style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${element.poster_path})` }}>
                        </div>
                    })}
                </div>
            </InfiniteScroll>
            {/* <div className='m-4 prevNext text-light fs-4'><a href='#trendingMain'><button className='prevNextBtn mx-4' disabled={page === 1} onClick={handlePrevClick}>&larr;</button></a>   Page {page}   <a href='#trendingMain'><button className='prevNextBtn mx-4' onClick={handleNextClick}>&rarr;</button></a></div> */}
        </div>
    )

}