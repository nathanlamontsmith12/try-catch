import React, { Component } from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div `
	display: flex;
	justify-content: center;
	align-items: center;
	background: rgba(255, 99, 71, 0.8); 
	height: 100%;

	section {
		height: 100%;
		width: 70%;
		opacity: 0.9;
		background: white;
	}

	section span {
		margin-left: 40px;
	}

	section div {
		margin-left: 40px;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		height: 30%;
	}
`

class Profile extends Component {
	constructor(props){
		super();
		this.state = {
			userData: props.userData
		}
	}
	shouldComponentUpdate(nextProps, nextState){
		if (this.state.userData !== nextProps.userData) {
			this.setState({
				userData: nextProps.userData
			})
		}
		
		return true
	}
	render(){
//		console.log("PROFILE PROPS: ", this.props)

		let bio = "No bio. Click 'Edit Profile, above, to add some info about yourself!'"

		if (this.state.userData.bio) {
			bio = this.state.userData.bio 
		}

		const regDate = new Date(this.state.userData.reg_time)
		const reg = regDate.toDateString();

		return (
			<StyledDiv>
				<section>
					<h1> Profile </h1>
					<br />
					<span 
						className="fakeLink"
						onClick={this.props.modalOn.bind(
							null,
							({form: "profile", action: "edit", display: this.state.userData})
							)}
						>
						Edit Profile
					</span>
					<br />
					<br />
					<div>
						<h3> { this.state.userData.username } </h3>
						<h4> Registered: { reg } </h4>
						<h4> Preferred Email: </h4>
						<h4><small> { this.state.userData.email } </small></h4>
						<p> { bio } </p>
					</div>
				</section>
			</StyledDiv>
		)
	}
}

export default Profile;
