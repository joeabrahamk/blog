import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import AllPosts from './components/AllPost';
import OnePost from './components/OnePost';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route component={AllPosts} path="/" exact />
        <Route component={OnePost} path="/post/:slug" exact />
      </Switch>
    </Router>
  );
};

export default App;