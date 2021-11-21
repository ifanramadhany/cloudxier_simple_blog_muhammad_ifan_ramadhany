import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import { LandingPage, DetailPage, AddBlogPage, EditBlogPage } from "./pages";
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
        <ToastContainer autoClose={1000} />
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
