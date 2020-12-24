import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import NewArticle from './pages/NewArticle/NewArticle';
import Register from './pages/Register/Register';


function App() {

  return (
    <div>
      <Router>
        <Switch>
          <Route path="/home" exact component={Home} />
          <Route path="/new-article" exact component={NewArticle} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Redirect from="/" to="/home" exact />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
