import React, { Component } from 'react';
import './App.css';
import { Route, Switch, Link } from "react-router-dom";

// Components — presentational: 
import Footer from './presentational/footer';
import Header from './presentational/header';
import Nav from './presentational/nav';

// Components - containers: 
import Home from './home';
import Errors from './errors';
import Collab from './collab'; 
import Profile from './profile';


const My404 = () => {
  return(
    <div>
        <h2>Not all who wander are lost...</h2>
        <h3> But you are. </h3> 
        <p> If you are trying to access your dashboard, click <span className="fakeLink"><Link to="/">here</Link></span> </p>
    </div>
  )
}

class App extends Component {
    constructor(){
        super();
        this.state = {
            loggedIn: false,
            username: "",
            userId: ""
        }
    }
    render() {
    return (
        <div className="App">
            <Header /> 
            <main>

                { this.state.loggedIn ? <Nav /> : null }
            
                <Switch>

                    { !this.state.loggedIn ? 
                        <Route 
                            exact path="/" 
                            render={ (props) => <Home {...props} /> }
                        /> 
                    : null }

                    { this.state.loggedIn ? 
                        <Route 
                            exact path="/" 
                            render={ (props) => <Errors {...props} /> } 
                        /> 
                    : null }

                     { this.state.loggedIn ? 
                        <Route 
                            exact path="/error" 
                            render={ (props) => <Errors {...props} /> } 
                        /> 
                     : null }

                    { this.state.loggedIn ? 
                        <Route 
                            exact path="/collab" 
                            render={ (props) => <Collab {...props} /> } 
                        /> 
                    : null } 

                    { this.state.loggedIn ? 
                        <Route 
                            exact path="/profile" 
                            render={ (props) => <Profile {...props} /> } 
                        /> 
                    : null }

                    <Route 
                        component = { My404 } 
                    />
                </Switch>

            </main>
            <Footer />
        </div>
    )}
}

export default App;