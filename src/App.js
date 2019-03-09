import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from "react-router-dom";

// Components — presentational: 
import Footer from './presentational/footer';
import Header from './presentational/header';
import My404 from './presentational/my404';

// Components - containers: 
import Home from './home';
import Issues from './issues';
import Collab from './collab'; 
import Profile from './profile';


class App extends Component {
    constructor(){
        super();
        this.state = {
            loggedIn: false,
            username: "",
            userId: "",
            regTime: ""
        }
    }
    appLogin = (userData) => {
        this.setState({
            loggedIn: true,
            username: userData.username,
            userId: userData.userId,
            regTime: userData.regTime
        })
    }
    appLogout = (history) => {
        this.setState({
            loggedIn: false,
            username: "",
            userId: "",
            regTime: ""
        })
    }
    render() {
    return (
        <div className="App">
            <Header loggedIn={this.state.loggedIn} appLogout={this.appLogout} />  
            <main>  
                <Switch>

                    { !this.state.loggedIn ? 
                        <Route 
                            exact path="/" 
                            render={ (props) => <Home {...props} appLogin={this.appLogin} /> }
                        /> 
                    : null }

                    { this.state.loggedIn ? 
                        <Route 
                            exact path="/" 
                            render={ (props) => <Issues {...props} /> } 
                        /> 
                    : null }

                     { this.state.loggedIn ? 
                        <Route 
                            exact path="/issues" 
                            render={ (props) => <Issues {...props} /> } 
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
                        render={ (props) => <My404 {...props} />}
                    />
                </Switch>

            </main>
            { !this.state.loggedIn ? <Footer /> : null }
        </div>
    )}
}

export default App;