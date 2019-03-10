import React, { Component } from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div `
	form input {
		display: block;
	}
`

class ProfileEdit extends Component {
	constructor(props){
		super();

		let bio = props.modeData.display.bio;

		if (!props.modeData.display.bio) {
			bio = ""
		}

		this.state = {
			email: props.modeData.display.email,
			bio: bio,
			username: props.modeData.display.username,
			currentPassword: "",
			newPassword: "",
			confirmation: "",
			userId: props.modeData.display.id,
			message: ""
		}
	}
	reset = () => {

		console.log("reset form triggered")

		// NEED TO BUGFIX THIS TO APPLY IT FOR THIS

		// this.setState({
		// 	email: this.props.modeData.display.email,
		// 	bio: this.props.modeData.display.bio,
		// 	username: this.props.modeData.display.username,
		// 	password: "",
		// 	confirmation: ""
		// })
	}
	handleChange = (evt) => {
		this.setState({
			[evt.currentTarget.name]: evt.currentTarget.value,
			message: ""
		})
	}
	quickCheck = () => {

		console.log("quick check invoked")
		
		let pass = {message: "", status: true};

		if (!this.state.currentPassword) {
			pass.status = false;
			pass.message = "You must enter your password to make any changes"
		}

		if (this.state.newPassword) {
			if (this.state.newPassword !== this.state.confirmation) {
				pass.status = false;
				pass.message = "New password must match confirmation";
				pass.clear = true;
			}
		}

		if (!this.state.email) {
			pass.status = false;
			pass.message = "Invalid email"
		}

		return pass;
	}
	submit = (evt) => {
		evt.preventDefault();

		console.log("submit form triggered")

		const check = this.quickCheck();

		if (check.status) {

			const body = {
				currentPassword: this.state.currentPassword,
				newPassword: this.state.newPassword,
				email: this.state.email,
				bio: this.state.bio,
				username: this.state.username,
				userId: this.state.userId,
				id: this.state.userId
			}

			if (this.state.password) {
				body.newPassword = this.state.newPassword 
			}
			
			this.setState({
				message: ""
			})

			this.props.editItem(body, "profile")

		} else {
			if (check.clear) {
				this.setState({
					message: check.message,
					newPassword: "",
					confirmation: ""
				})
			} else {
				this.setState({
					message: check.message
				})
			}
		}
	}
	render(){

		let disable = true;

		if (this.state.currentPassword) {
			disable = false;
		}

		return(
			<StyledDiv>
				<h1> EDIT PROFILE </h1>
				<h3> {this.state.username} </h3>
				<p> {this.state.message} &nbsp; </p>
				<form>
					<h4> Enter your password to make any changes </h4>
					<input 
						type="password" 
						name="currentPassword" 
						value={this.state.currentPassword} 
						placeholder="Enter your password..." 
						onChange={this.handleChange} 
					/>
					<br />
					<br />
					<input 
						type="password" 
						name="newPassword" 
						value={this.state.newPassword} 
						placeholder="Enter new password..." 
						onChange={this.handleChange} 
					/>
					<input 
						type="password" 
						name="confirmation" 
						value={this.state.confirmation} 
						placeholder="Confirm new password..." 
						onChange={this.handleChange} 
					/>
					<input 
						type="email" 
						name="email" 
						value={this.state.email} 
						placeholder="Enter new email..." 
						onChange={this.handleChange} 
					/>
					<input 
						type="text" 
						name="bio" 
						value={this.state.bio} 
						placeholder="Enter your bio..." 
						onChange={this.handleChange} 
					/>
					<button disabled={disable} onClick={this.submit}> Save Changes </button>
				</form>
				<span 
					className="fakeLink" 
					onClick={this.reset}> 
						Reset Form 
				</span>
			</StyledDiv>
		)
	}
}	

export default ProfileEdit;