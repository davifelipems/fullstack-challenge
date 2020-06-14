import React from 'react';
import './App.css';
import Movie from './components/Movie'
import Home from './components/Home'
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";

function Child() {
  let { id } = useParams();

  return (
    <Movie id={id}></Movie>
  );
}


class App extends React.Component {
  constructor(props) {
      super(props)
      this.state = {
          items:[]
      };
      this._updateItens = this.updateItens.bind(this);
      this._isMounted = false;
      this.abortController = new AbortController();
  }

  componentWillUnmount() {
      this._isMounted = false;
      this.abortController.abort();
  }

  componentDidMount() {
      this._isMounted = true;
  }

  updateItens(itens){
      this.setState({
          items: itens,
          });
  }
  
  render() {
    
    return(
      <React.Fragment>
          <CssBaseline />
              <Container maxWidth="lg">
              <Typography component="div" style={{ backgroundColor: '#eee', height: '100vh',padding: '2rem'}} >
                      <Router>
                        <Switch>
                          <Route path="/movie-:id" children={<Child />} />
                          <Route path='/' component={() => 
                                          <Home updateItens={this._updateItens} 
                                                abortController={this.abortController}
                                                items={this.state.items} />
                                          } />
                        </Switch>
                      </Router>  
              </Typography>
          </Container>
      </React.Fragment>
    )
  }
  
}

export default App;
