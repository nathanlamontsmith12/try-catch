import React, { Component } from 'react';
import './App.css';
import { Route, Switch, Link } from "react-router-dom";
import styled from 'styled-components';

// Components: 
import Footer from './presentational/footer';
import Header from './presentational/header';
import Nav from './presentational/nav';
import Home from './home';

// Styles: 
const StyledMain = styled.main`
  background: slategray;
`

class App extends Component {
    constructor(){
        super();
        this.state = {
            page: "home"
        }
    }
    render() {
    return (
        <div className="App">
            { this.state.page === "home" ? <Header /> : null }
            <StyledMain>
                <Switch>
                    <Route exact path="/" render={ (props) => <Home /> } />
                </Switch>
            </StyledMain>
            <Footer />
        </div>
    )}
}

export default App;

    // return (
    //   <main>
    //     <Header authData={authData} setLogOut={this.setLogOut} />
    //     <div className="mainCon">
    //       <section>
    //         <Switch>
    //           { access ? <Route exact path="/" render={ (props) => <Dashboard {...props} setLogOut={this.setLogOut} authData={authData} /> } /> : <Route exact path="/" render={ (props) => <Search {...props} authData={authData} viewBtns={true} viewLow={true} />} /> }
    //           <Route 
    //             exact path="/auth" 
    //             render={ (props) => <Authorization {...props} authData={authData} setLogIn={this.setLogIn} setLogOut={this.setLogOut} />} 
    //           />
    //           <Route 
    //             exact path="/decks" 
    //             render={ (props) => <Decks {...props} authData={authData} setLogOut={this.setLogOut} /> }
    //           />
    //           <Route 
    //             exact path="/cards"
    //             render={ (props) => <Cards {...props} authData={authData} setLogOut={this.setLogOut} /> } 
    //           />
    //           <Route 
    //             exact path="/about"
    //             render={ (props) => <About {...props} authData={authData} /> }
    //           />
    //           <Route 
    //             component = { My404 } 
    //           />
    //         </Switch>
    //       </section> 
    //       <Footer />
    //     </div>
    //   </main>
    // );