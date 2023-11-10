
import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, CardMedia, Grid, Button, Box, useMediaQuery } from '@mui/material';
import { KeyboardArrowDownRounded, KeyboardArrowUpRounded } from '@mui/icons-material';
//import axios from 'axios';

const MovieAPI = () => {
    const [movieData, setMovieData] = useState(null);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await fetch('https://hoblist.com/api/movieList', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',   
                    },
                    body: JSON.stringify({
                        category: 'movies',
                        language: 'kannada',
                        genre: 'all',
                        sort: 'voting',
                    }),
                });
                const data = await response.json();

                /*const response = await axios.post('https://hoblist.com/api/movieList', {
                    category: 'movies',
                    language: 'kannada',
                    genre: 'all',
                    sort: 'voting',
                });
                const data = await response.data;*/
                console.log("data--", data)
                const sortedMovies = data.result.sort((a, b) => b.voting - a.voting);
                setMovieData(sortedMovies);
            }

            catch (error) {
                console.error('Error fetching movie data:', error);
            }
        };

        fetchData();
    }, []);

    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));


    return (
        <Box>

            <h1 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Movie List</h1>

            <Grid container spacing={2}>
                {movieData &&
                    movieData.map((movie) => (
                        <Grid item key={movie._id} xs={12} sm={12} md={12}>
                            <Card sx={{ display: 'flex', flexDirection: isSmallScreen ? 'column' : 'row', height: '100%', maxWidth: '700px' }}>

                                <Grid container alignItems="center" justifyContent="center">
                                    <Grid item>
                                        <KeyboardArrowUpRounded fontSize="large" />
                                        <Typography variant="h6" style={{ marginLeft: '10px' }}>{movie.voting}</Typography>
                                        <KeyboardArrowDownRounded fontSize="large" />
                                        <Typography variant="h6">Votes</Typography>
                                    </Grid>
                                </Grid>

                                <CardMedia
                                    component="img"
                                    alt={movie.title}
                                    image={movie.poster}
                                    style={{ width: '300px', height: '300px' }}

                                />

                                <CardContent>
                                    <h1>{movie.title}</h1>
                                    <Typography color="textSecondary" gutterBottom>
                                        Genre: {movie.genre}
                                    </Typography>
                                    <Typography color="textSecondary" gutterBottom>
                                        Director: {movie.director}
                                    </Typography>
                                    <Typography color="textSecondary">
                                        Stars: {movie.stars}
                                    </Typography>
                                    <Typography color="textSecondary" gutterBottom>
                                        Mins | {movie.language}
                                    </Typography>

                                    <Typography color="primary" gutterBottom>
                                        {movie.pageViews} views | Voted by {movie.voting} people
                                    </Typography>

                                </CardContent>

                            </Card>
                            <Button fullWidth variant="contained" style={{ marginTop: 'auto', maxWidth: '700px' }}>Watch Trailer</Button>
                        </Grid>
                    ))}
            </Grid>
        </Box>
    );
};

export default MovieAPI;

