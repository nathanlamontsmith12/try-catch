import React, { Component } from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div `
	height: 100%;
	margin-top: 40px;

	input {
		display: block;
		height: 20px;
		margin: 20px;
	}
`


class Auth extends Component {
	constructor(props){
		super();
		this.state = {
			username: "",
			email: "",
			password: "",
			confirmation: "",
			processing: false
		}
	}
	handleChange = (evt) => {
		this.setState({
			[evt.currentTarget.name]: evt.currentTarget.value
		})
	}
	quickCheck = (type) => {

		if (!this.state.username || !this.state.password) {
			this.quickFail("Invalid input")
			return false 
		}

		if (type === "reg") {
			if (this.state.password !== this.state.confirmation) {
				this.quickFail("Password =/= confirmation")
				return false
			}
			if (!this.state.email) {
				this.quickFail("Email required")
				return false 
			}
		} 

		return true 
	}
	quickFail = (message) => {
		this.setState({
			username: "",
			email: "",
			password: "",
			confirmation: "",
			processing: false,			
		})

		this.props.setMessage(message)
	}
	submit = (type) => {

		this.props.setMessage("")

		if (!this.quickCheck(type)) {
			return 
		}

		const authData = this.state;

		this.setState({
			username: "",
			email: "",
			password: "",
			confirmation: ""
		})

		if (type === "reg") {
			this.props.register(authData)
			return
		} else if (type === "login") {
			this.props.login(authData)
			return
		} else {
			this.quickFail("Unknown Error")
			return
		}
	}
	render() {

		let h2InnerText = "";

		if (this.props.view === "reg") {
			h2InnerText = "create account"
		} else {
			h2InnerText = "log in"
		}

		return (
			<StyledDiv>
				<h2> { h2InnerText } </h2>
				{ this.props.message ? <p><small> {this.props.message} </small></p> : <p> &nbsp; </p>}
				<form> 
					<input name="username" type="text" value={this.state.username} onChange={this.handleChange} placeholder="Enter username..." /> 
					{ this.props.view === "reg" ? <input name="email" type="email" value={this.state.email} onChange={this.handleChange} placeholder="Enter email..." /> : null }
					<input name="password" type="password" value={this.state.password} onChange={this.handleChange} placeholder="Enter password..."/>
					{ this.props.view === "reg" ? <input name="confirmation" type="password" value={this.state.confirmation} onChange={this.handleChange} placeholder="Confirm password..." /> : null }
				</form>
				{ this.props.view === "reg" ? <button onClick={this.submit.bind(null, "reg")}> register </button> : <button onClick={this.submit.bind(null, "login")}> log in </button>}
			</StyledDiv>
		)
	}
}

export default Auth;