import React, { Component } from 'react';
import styled from 'styled-components';

// Components: 
import IssueDisplay from '../issues/display';
import CollabDisplay from '../collab/display';
import ProfileDisplay from '../profile/display';

// Styles: 
const StyledDiv = styled.div `
	position: absolute;
	height: 100%;
	width: 100%;
	z-index: 10;
	display: flex;
	align-items: center;
	justify-items: center;
	background: rgba(112, 128, 144, 0.7);

	div {
		margin: auto;
		height: 85%;
		width: 85%;
		z-index: 20;
		background: white;
	}

	div span {
		display: block;
		margin: 20px;
	}
`


class AppModal extends Component {
	constructor(props){
		super();
		this.state = {
			modeData: props.data.appModal,
			userData: props.data.userData,
			issues: props.data.issues
		}
	}
	alterModal = (newData) => {
		this.setState({
			modeData: newData
		})

		this.forceUpdate();
	}
	makeBody = (data, kind) => {
		let newBody = null;

		switch (kind) {
			case "issue":
				newBody = ({
					name: data.name,
					description: data.description,
					user_id: this.state.userData.id
				})
			break
			default:
				newBody = null;
			break
		}

		if (data.id) {
			newBody.id = data.id
		}

		return newBody;
	}
	newItem = async (data, kind) => {
		console.log(`NEW ${kind}`, data)

		try {

	  		const body = this.makeBody(data, kind);
//	  		console.log("NEW BODY: ", body)

			const url = process.env.REACT_APP_API_URL + "/api/v1/" + kind;
//			console.log("URL: ", url)
			

			const response = await fetch(url, {
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify( body ),
				headers: {
					'Content-Type': 'application/json'
				}
			})

			const responseJson = await response.json();
			console.log("RESPONSE: ", responseJson)

			// load new user data into state: 
			await this.props.update();

			this.props.modalOff();

		} catch(err) {
			console.log(err);
			return err
		}
	}
	editItem = async (data, kind) => {
		console.log(`EDIT ${kind}`, data)

		try {

	  		const body = this.makeBody(data, kind);
//	  		console.log("NEW BODY: ", body)

			const url = process.env.REACT_APP_API_URL + "/api/v1/" + kind + "/" + body.id;
//			console.log("URL: ", url)			

			// body._method = "PATCH"

			const response = await fetch(url, {
				method: 'PATCH',
				credentials: 'include',
				body: JSON.stringify( body ),
				headers: {
					'Content-Type': 'application/json'
				}
			})

			const responseJson = await response.json();
			console.log("RESPONSE: ", responseJson)

			// load new user data into state: 
			await this.props.update();

			this.props.modalOff();

		} catch(err) {
			console.log(err);
			return err
		}
	}
	deleteItem = async (data, kind) => {
		console.log(`DELETE ${kind}`, data)

		try {

		} catch(err) {
			console.log(err);
			return err
		}
	}
	render(){

		// console.log("MODAL STATE: ", this.state)

		return (
			<StyledDiv>
				<div>
					<span className="fakeLink" onClick={this.props.modalOff} >close</span>
					{ this.state.modeData.form === "issue" ? 
						<IssueDisplay 
							modeData={this.state.modeData} 
							userData={this.state.userData} 
							newItem={this.newItem}
							editItem={this.editItem}
							alterModal={this.alterModal}
						/> 
					: null }
					{ this.state.modeData.form === "collab" ? 
						<CollabDisplay 
							modeData={this.state.modeData} 
							userData={this.state.userData}
							newItem={this.newItem}
							editItem={this.editItem}
							alterModal={this.alterModal} 
						/> 
					: null }
					{ this.state.modeData.form === "profile" ? 
						<ProfileDisplay 
							modeData={this.state.modeData} 
							userData={this.state.userData}
							editItem={this.editItem}
							alterModal={this.alterModal}
						/> 
					: null }
				</div>
			</StyledDiv>
		)
	}
}


export default AppModal;