import { Router, Switch, Route } from 'react-router-dom';
import history from '../history';
import Login from './log/Login';
import Navbar from './navbar/Navbar';
import SearchPokemon from './pokemon/SearchPokemon';
import ShowAllPokemons from './pokemon/ShowAllPokemons';

function App() {
  return (
    <Router history={history}>
      <Navbar />
      <Switch>
        <Route path="/search" exact component={SearchPokemon} />
        <Route path="/all" exact component={ShowAllPokemons} />
        <Route path="/login" exact component={Login} />
      </Switch>
    </Router>
    
  );
}

export default App;
