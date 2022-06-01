/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <Link className="nav-item" to="/"><p>Home</p></Link>
          <Link className="nav-item" to="/robots">All Robots</Link>
          <Link className="nav-item" to="/projects">All Projects</Link>
        </nav>
        <main>
          <h1>
            Welcome to Stardew Tips!
          </h1>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/robots" component={AllRobots} />
            <Route path="/robots/:robotId" component={SingleRobot} />
            <Route exact path="/projects" component={AllProjects} />
            <Route path="/projects/:projectId" component={SingleProject} />

          </Switch>
        </main>
      </div>
    </Router>
  );
};

export default App;
