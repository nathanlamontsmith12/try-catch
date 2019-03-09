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
import AppModal from './modal/index';


class App extends Component {
    constructor(){
        super();
        this.state = {
            loggedIn: false, 
            username: "",
            userId: "",
            regTime: "",
            appModal: null, 
            userLoaded: false,
            issues: [],
            userData: null
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
    modalOn = (mode) => {
        this.setState({
            appModal: mode
        })
    }
    modalOff = () => {
        this.setState({
            appModal: null 
        })
    }
    getUser = async () => {
        try {
            const url = (process.env.REACT_APP_API_URL + "/api/v1/user/" + this.state.userId)

            const response = await fetch(url, {
                method: 'GET',
                credentials: 'include', 
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (!response.ok) {
                throw new Error("Server error!") 
            }

            const responseJson = await response.json();
            console.log("RESPONSE: ", responseJson)
            
            if (!responseJson.done) {
                throw new Error("Failed to load user!")
            } 

            this.setState({
                userLoaded: true,
                userData: responseJson.user,
                issues: responseJson.issues
            })

        } catch(err) {
            console.log(err.name + " " + err.message)
            return err
        }
    }
    componentDidMount() {
        if (this.state.loggedIn && this.state.userId && !this.state.userLoaded) {
            this.getUser();
        }
    }
    render() {    
        console.log("APP STATE: ", this.state)
    return (
        <div className="App">
            { this.state.loggedIn && this.state.appModal ? <AppModal modalOff={this.modalOff} mode={this.state.appModal} /> : null }
            <Header loggedIn={this.state.loggedIn} appLogout={this.appLogout} />  
            <main>  
                <Switch>

                    { !this.state.loggedIn ? 
                        <Route 
                            exact path="/" 
                            render={ (props) => <Home {...props} 
                            appLogin={this.appLogin} /> }
                        /> 
                    : null }

                    { this.state.loggedIn ? 
                        <Route 
                            exact path="/" 
                            render={ (props) => <Issues {...props}
                            modalOn={this.modalOn} 
                            userData={this.state.userData} 
                            getUser={this.getUser} 
                            issues={this.state.issues} /> } 
                        /> 
                    : null }

                     { this.state.loggedIn ? 
                        <Route 
                            exact path="/issues" 
                            render={ (props) => <Issues {...props}
                            modalOn={this.modalOn} 
                            userData={this.state.userData} 
                            getUser={this.getUser} 
                            issues={this.state.issues} /> } 
                        /> 
                     : null }

                    { this.state.loggedIn ? 
                        <Route 
                            exact path="/collab" 
                            render={ (props) => <Collab {...props}
                            modalOn={this.modalOn} 
                            userData={this.state.userData} 
                            getUser={this.getUser}/> } 
                        /> 
                    : null } 

                    { this.state.loggedIn ? 
                        <Route 
                            exact path="/profile" 
                            render={ (props) => <Profile {...props}
                            modalOn={this.modalOn} 
                            userData={this.state.userData} 
                            getUser={this.getUser} /> } 
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