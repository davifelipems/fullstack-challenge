import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Cookies from 'universal-cookie';
import {Link} from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';
import FavoriteIcon from '@material-ui/icons/Favorite';

class MovieItens extends React.Component {
    
    constructor(props) {
      super(props);
      
      this.state = {
        error: null,
        resultError:null,
        isLoaded: true,
        termoBusca:""
      };
      
    }

    abortController = new AbortController();

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidMount() {
        this._isMounted = true;
    }

    search(){
      const {termoBusca } = this.state;  
      const cookies = new Cookies();
      if(cookies.get('items')){
        this.setState({
            items: cookies.get('items')
            });
      }

      if(termoBusca){
            const stripped = termoBusca.replace(/ /g, '+')
            this.setState({isLoaded: false});
            fetch("http://localhost:8000/itens?s="+stripped,
                 { signal: this.props.abortController.signal})
            .then(res => res.json())
            .then(
            (result) => {
                if (this._isMounted) {
                    if(result.Search){
                        Object.keys(result.Search).forEach(function(key) {
                            if(result.Search[key] ){
                                const cookies = new Cookies(); 
                                var favorites_ids = cookies.get('favorites_ids');
                                result.Search[key].isFavorite = false;
                                Object.keys(favorites_ids).forEach(function(keycookies) {
                                    if(favorites_ids[keycookies] 
                                    && favorites_ids[keycookies].id === result.Search[key].imdbID){
                                        result.Search[key].isFavorite = <FavoriteIcon color="secondary" />;
                                    }
                                });
                            }
                        });
                        this.props.updateItens(result.Search);
                    }
                    
                    if(result.Error){
                        this.setState({
                            isLoaded: true,
                            resultError:result.Error
                            });
                    }
                    
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
    }

    handleChange = (e) =>{ 
        this.setState({termoBusca: e.target.value});
    }

    getBtnFavorite(id){
        const cookies = new Cookies(); 
        var favorites_ids = cookies.get('favorites_ids');
        var isFavorite = false;
        Object.keys(favorites_ids).forEach(function(key) {
            if(favorites_ids[key] 
            && favorites_ids[key].id === id){
                isFavorite = true;
            }
        });

        if(isFavorite){
            return (<Button
                variant="contained"
                color="secondary"
                startIcon={<FavoriteIcon />}
            >Added to favorites</Button>);
        }else{
            return null;
        }
        
    }
    
    
    render() {
        const { error, isLoaded, resultError } = this.state;
        
        var divResult = <div></div>;
        if (error) {
            divResult = <div>Error: {error.message}</div>;
        }else if(resultError){
            divResult = <div>{resultError}</div>;
        }else if (!isLoaded) {
            divResult = <CircularProgress />;
        }else if(this.props.items){
            divResult = <Grid container spacing={3}>
                            {this.props.items.map(row => (
                                <Link to={'/movie-'+row.imdbID} key={row.imdbID}>
                                    <Grid item key={row.imdbID} >
                                    <Paper className={this.props.classes.paper}>
                                        <div>
                                            <img className={this.props.img} alt={row.Title} width="80%" src={row.Poster} />
                                        </div>
                                        {row.isFavorite} {row.Title} - {row.Year}
                                    </Paper>
                                    </Grid>
                                </Link>
                            ))}
                        </Grid>
        }
        

        return (
          <div>  
            <Grid container spacing={3}>
                <Grid item xs={7}>
                <TextField id="filled-search" label="Type here" onChange={this.handleChange} value={this.state.termoBusca} type="search" variant="filled" />
                </Grid>
                <Grid item xs={5}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={()=> this.search()}
                        className={this.props.classes.button}>
                            Search
                    </Button>
                </Grid>
            </Grid>
            {divResult}
          </div>
        );
    }
  }

  export default MovieItens;
  