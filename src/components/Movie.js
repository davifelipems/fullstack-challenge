import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Cookies from 'universal-cookie';
import HomeIcon from '@material-ui/icons/Home';
import {Link} from "react-router-dom";


class Movie extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            items:props.items,
            error: null,
            isLoaded:false,
            resultError:null,
            title:null,
            year:null,
            rated:null,
            released:null,
            ratings:null,
            genre:null,
            writer:null,
            actors:null,
            runtime:null,
            plot:null,
            favoritesLabel:"Add to favorites",
            favoritesColor:"primary",
            favoriesIds:[]
        };
    }

    componentDidMount() {
        fetch("http://localhost:8000/itens?i="+this.state.id)
        .then(res => res.json())
        .then(
        (result) => {
            this.setState({
            isLoaded: true,
            resultError:result.Error,
            title:result.Title,
            year:result.Year,
            rated:result.Rated,
            released:result.Released,
            ratings:result.Ratings,
            imdbRating:result.imdbRating,
            genre:result.Genre,
            writer:result.Writer,
            actors:result.Actors,
            runtime:result.Runtime,
            plot:result.Plot,
            poster:result.Poster    
            });
            const cookies = new Cookies(); 
            var favorites_ids = cookies.get('favorites_ids');
            var isFavorite = false;
            Object.keys(favorites_ids).forEach(function(key) {
                if(favorites_ids[key] 
                && favorites_ids[key].id === result.imdbID){
                    isFavorite = true;
                }
            });

            if(isFavorite){
                this.setState({
                    favoriesIds: favorites_ids, 
                    favoritesColor:"secondary",
                    favoritesLabel:"Added to favorites"  
                    }); 
            }
            
        },
        (error) => {
            this.setState({
            isLoaded: true,
            error
            });
        }
        )
    }
    
    tooggleFavories(){
        const cookies = new Cookies(); 
        var favorites_ids = cookies.get('favorites_ids');
        
        if(!favorites_ids){
            favorites_ids = [];    
        }

        var isFavorite = false;
        var currentId = this.props.id;
        Object.keys(favorites_ids).forEach(function(key) {
            if(favorites_ids[key]
            && favorites_ids[key].id === currentId){
                isFavorite = true;
                delete favorites_ids[key];
            }
        });

        if(!isFavorite){
            favorites_ids.push(
                { 'id' : this.props.id}
            );
        }
        
        cookies.set('favorites_ids', JSON.stringify(favorites_ids), { path: '/' });

        if(isFavorite){
            this.setState({
                favoriesIds: favorites_ids, 
                favoritesColor:"primary",
                favoritesLabel:"Add to favorites"  
                });
        }else{
            this.setState({
                favoriesIds: favorites_ids, 
                favoritesColor:"secondary",
                favoritesLabel:"Added to favorites"  
                });
        }

    }

    render() {
        const { error,
                resultError,
                isLoaded, 
                title,
                year,
                imdbRating,
                genre,
                writer,
                actors,
                plot,
                poster,
                runtime,
                favoritesLabel,
                favoritesColor} = this.state;

    
        var divResult = <div></div>;

        if (error) {
            divResult = <div>Error: {error.message}</div>;
        }else if(resultError){
            divResult = <div>{resultError}</div>;
        }else if (!isLoaded) {
            divResult = <CircularProgress />;
        }else{
            divResult =  
                    <React.Fragment>
                        <CssBaseline />
                            <Container maxWidth="lg">
                            <Typography component="div" style={{ backgroundColor: '#eee', height: '100vh',padding: '1rem'}} >

                                <Link to='/'><Button
                                    variant="contained"
                                    color="primary"
                                    startIcon={<HomeIcon />}
                                >Home</Button>
                                </Link>

                                <Grid container spacing={3}>
                                    <Grid item xs={7}>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12}>
                                            {runtime} . {year}
                                            <h1>{title}</h1>
                                            Imdb Rating:  {imdbRating}
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12}>
                                            <Typography variant="h5">Plot:</Typography>
                                            {plot}
                                            </Grid>
                                        </Grid> 
                                        <Grid container spacing={3}>
                                            <Grid item xs={4}>
                                                <Typography variant="h5">Actors:</Typography>
                                                {actors}
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Typography variant="h5">Genere:</Typography>
                                                {genre}
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Typography variant="h5">Writer:</Typography>
                                                {writer}
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12}>
                                                <Button
                                                    onClick={()=> this.tooggleFavories()}
                                                    variant="contained"
                                                    color={favoritesColor}
                                                    startIcon={<FavoriteIcon />}
                                                >{favoritesLabel}</Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={5}>
                                    <img className={this.props.img} alt={title} width="80%" src={poster} />
                                    </Grid>
                                </Grid>
                            </Typography>
                        </Container>
                        
                    </React.Fragment>
        }

        return (
        <div>
            {divResult}
        </div>
        )   
    }  
}

export default Movie;