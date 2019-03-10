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
            issues: [],
            userData: null
        }
    }
    appLogin = async (userData) => {


        const userId = userData.userId;

        const data = await this.getUser(userId);

        // console.log("USER DATA: ", data)
        

        this.setState({
            loggedIn: true,
            username: data.user.username,
            userId: data.user.id,
            regTime: data.user.reg_time,
            userData: data.user,
            issues: data.issues
        })

        // console.log("APP STATE: ", this.state)
    }
    update = async () => {
        try {
            const newData = await this.getUser(this.state.userId)

            this.setState({
                username: newData.user.username,
                userId: newData.user.id,
                regTime: newData.user.reg_time,
                userData: newData.user,
                issues: newData.issues              
            })           

        } catch(err) {
            console.log("ERROR: ", err);
            return err 
        }
    }
    appLogout = (history) => {
        this.setState({
            loggedIn: false, 
            username: "",
            userId: "",
            regTime: "",
            appModal: null,
            issues: [],
            userData: null
        })
    }
    modalOn = (data) => {
        this.setState({
            appModal: data
        })
    }
    modalOff = () => {
        this.setState({
            appModal: null 
        })
    }
    getUser = async (userId) => {
        try {
            const url = (process.env.REACT_APP_API_URL + "/api/v1/user/" + userId)

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

            return responseJson

        } catch(err) {
            console.log(err.name + " " + err.message)
            return err
        }
    }
    // async componentDidMount() {
    //     if (this.state.loggedIn && this.state.userId && !this.state.userLoaded) {
    //         const data = this.getUser(this.state.userId);
    //         this.setState({

    //         })
    //     }
    // }
    render() {    
 //       console.log("APP STATE: ", this.state)
    return (
        <div className="App">
            { this.state.loggedIn && this.state.appModal ? <AppModal modalOff={this.modalOff} data={this.state} update={this.update} /> : null }
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
                            getUser={this.getUser} /> } 
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