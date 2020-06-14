import React from 'react';
import Grid from '@material-ui/core/Grid';
import MovieItens from './MovieItens';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      height: 300,
      width: 200,
      margin: 5,
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    control: {
      padding: theme.spacing(2),
    }, 
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    }
}));

function Home(props) {
    
    const classes = useStyles();

    return(
        <Grid container spacing={3}>
            <MovieItens classes={classes} 
                        updateItens={props.updateItens}
                        abortController={props.abortController}
                        items={props.items} 
                        useStyles={props.useStyles}></MovieItens>
        </Grid>
    )
}

export default Home;