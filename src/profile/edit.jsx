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
	reset = (evt, message = "") => {

		let bio = this.props.modeData.display.bio;

		if (!this.props.modeData.display.bio) {
			bio = ""
		}

		this.setState({
			email: this.props.modeData.display.email,
			bio: bio,
			currentPassword: "",
			newPassword: "",
			confirmation: "",
			message: message
		})
	}
	handleChange = (evt) => {
		this.setState({
			[evt.currentTarget.name]: evt.currentTarget.value,
			message: ""
		})
	}
	quickCheck = async () => {

		console.log("quick check invoked")

		try { 

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

			if (pass.status === true) {

				const url = process.env.REACT_APP_API_URL + "/api/v1/user/check"

				const body = {
					user_id: this.state.userId,
					password: this.state.currentPassword
				}

				const response = await fetch(url, {
					method: 'POST',
					credentials: 'include',
					body: JSON.stringify( body ),

				})

				const responseJson = await response.json()
				console.log("RESPONSE: ", responseJson)

				if (!responseJson.done) {
					pass.status = false;
					pass.message = "Incorrect password. Failed to authenticate."
					pass.clear = true;
				}

			}

			return pass;

		} catch(err) {
			console.log(err);
			return false 
		}
	}
	submit = async (evt) => {

		evt.preventDefault();
		console.log("submit form triggered")

		try { 
			const check = await this.quickCheck();

			if (check === false) {
				throw new Error("Failed to authenticate due to server problem")
			}

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
		} catch(err) {
			console.log(err);
			this.reset(null, "Error — failed to authenticate")
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
				<br />
				<form>
					{ this.state.message ? 
						<h4> {this.state.message} </h4> 
					: 
						<h4> Enter your password to make any changes </h4>
					}
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