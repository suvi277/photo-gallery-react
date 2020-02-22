import React from 'react';
import { Switch, Route } from 'react-router';
import HomePage from '../HomePage';
import Authorize from '../Authorize';
import PhotoCollection from '../PhotoCollection';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'; 
import './App.css';

const App = () => (
  <div className="d-flex vw-100 h-100 flex-column">
    <Header/>
    <ToastContainer />
    <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/authorize" component={Authorize} />
        <Route exact path="/photos" component={PhotoCollection} />
    </Switch>
    <Footer/>
  </div>
)

export default App;