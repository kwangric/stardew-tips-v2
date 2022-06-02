/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <Link className="nav-item" to="/"><p>Home</p></Link>
          <Link className="nav-item" to="/crops">Crops</Link>
          <Link className="nav-item" to="/villagers">Villagers</Link>
          <Link className="nav-item" to="/fish">Fish</Link>
          <Link className="nav-item" to="/bundles">Bundles</Link>
        </nav>
        <main>
          <h1>
            Welcome to Stardew Tips!
          </h1>
          {/* <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/crops" component={Crops} />
            <Route exact path="/villagers" component={Villagers} />
            <Route exact path="/fish" component={Fish} />
            <Route exact path="/bundles" component={Bundles} />
          </Switch> */}
        </main>
      </div>
    </Router>
  );
};

export default App;
