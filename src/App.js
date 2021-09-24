
import './App.css';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Games from './components/Games/Games';
import TopStreams from './components/TopStreams/TopStreams';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Live from './components/Live/Live';
import GameStreams from './components/GameStreams/GameStreams';
import Resultats from './components/Resultats/Resultats';
import Erreur from './components/Erreur/Erreur';



function App() {
  return (
    <Router forceRefresh={false}>
      <div className="App">
        <Header />
        <Sidebar />
        <Switch>
          <Route exact path="/" component={Games} />
          <Route exact path="/top-streams" component={TopStreams} />
          <Route exact path="/live/:slug" component={Live} />
          <Route exact path="/game/:slug" component={GameStreams} />
          <Route exact path="/resultas/:slug" component={Resultats} />
          <Route exact path="/resultas/" component={Erreur} />

        </Switch>
      </div>
    </Router>

  );
}

export default App;
