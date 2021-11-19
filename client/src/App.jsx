import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import { LandingPage, DetailPage, AddBlogPage, EditBlogPage } from "./pages";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <LandingPage/>
        </Route>
        <Route path="/detail-blog/:id">
          <DetailPage/>
        </Route>
        <Route path="/edit-blog/:id">
          <EditBlogPage/>
        </Route>
        <Route path="/add-blog">
          <AddBlogPage/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
