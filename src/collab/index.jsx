import React, { Component } from 'react';
import styled from 'styled-components';

// Components: 
import SearchUsers from './SearchUsers.jsx';
import ManageCollab from './ManageCollab.jsx';

const StyledDiv = styled.div `
	display: flex;
	justify-content: center;
	align-items: center;
	background: rgba(255, 99, 71, 0.8); 
	height: 100%;

	section .message {
		margin-left: 20px;
	}

	.innerNav {
		display: flex;
		align-items: center;
		justify-content: space-around;
	}

	section {
		height: 100%;
		width: 70%;
		opacity: 0.9;
		background: white;
	}
`

class Collab extends Component {
	constructor(props){
		super();

		let initView = "search"

		if (props.collaborations && props.collaborations.length > 0) {
			initView = "manage"
		}

		this.state = {
			view: initView, // "search" or "manage"
			user: props.userData,
			issues: props.issues,
			collaborations: props.collaborations,
			shared_issues: props.shared_issues,
			searchResults: [],
			exactMatch: null,
			message: ""
		}
	}
	changeView = async (view) => {
		
		await this.updateCollab();
		
		this.setState({
			view: view
		})
	}
	shouldComponentUpdate(nextProps, nextState){
		if (this.state.user !== nextProps.userData || 
			this.state.issues !== nextProps.issues || 
			this.state.shared_issues !== nextProps.shared_issues || 
			this.state.collaborations !== nextProps.collaborations) {
			
			this.setState({
				user: nextProps.userData,
				issues: nextProps.issues,
				shared_issues: nextProps.shared_issues,
				collaborations: nextProps.collaborations
			})

		}

		return true
	}
	updateCollab = async (inputMessage = false) => {
		try {

			const update = await this.props.getUser(this.state.user.id);

			const message = inputMessage || ""

			this.setState({
				user: update.user,
				issues: update.issues,
				collaborations: update.collaborations,
				shared_issues: update.shared_issues,
				message: message 
			})

		} catch(err){
			console.log(err);
			return err
		}
	}
	searchUsers = async (query) => {
		// needs: query  
		try {
			
			const url = process.env.REACT_APP_API_URL + "/api/v1/user/search"

			const response = await fetch(url, {
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify({query: query}),
				headers: {
					'Content-Type': 'application/json'
				}
			})

			const responseJson = await response.json();
			console.log("RESPONSE: ", responseJson)

			let exactMatch = null;

			if (responseJson.exactMatch) {
				exactMatch = responseJson.exactMatch
			}

			this.setState({
				searchResults: responseJson.similar_matches,
				exactMatch: exactMatch
			})

			return responseJson 

		} catch(err){
			console.log(err);
			return err
		}

	}
	addCollab = async (collaborator_id, username) => {
		// needs: user_id, collaborator_id 
		try {
			const url = process.env.REACT_APP_API_URL + "/api/v1/collab"

			const response = await fetch(url, {
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify({
					user_id: this.state.user.id,
					collaborator_id: collaborator_id
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			})

			if (!response.ok) {
				throw new Error("Server communication error. Failed to add collaborator")
			}

			const responseJson = await response.json();
			console.log("RESPONSE: ", responseJson)

			if (!responseJson.done) {
				this.setState({
					message: responseJson.message
				})
				throw new Error(responseJson.message)
			}


			this.updateCollab(`Added collaborator - awaiting confirmation from ${username}`)

			return responseJson

		} catch(err){
			console.log(err);
			return err
		}

	}
	acceptCollab = async (collaboration_id, user_id) => {
		// needs: collaboration_id, user_id  

		// console.log("accept collab: ")
		// console.log("collab id: ", collaboration_id)
		// console.log("user id: ", user_id) 

		try {

			const url = process.env.REACT_APP_API_URL + "/api/v1/collab/" + collaboration_id

			const response = await fetch(url, {
				method: 'PATCH',
				credentials: 'include',
				body: JSON.stringify({
					user_id: user_id
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			})

			if (!response.ok) {
				throw new Error("Server communication error. Failed to add collaborator")
			}

			const responseJson = await response.json();
			console.log("RESPONSE: ", responseJson)

			if (!responseJson.done) {
				this.setState({
					message: responseJson.message
				})
				throw new Error(responseJson.message)
			}


			this.updateCollab("Activated collaboration")

			return responseJson

		} catch(err){
			console.log(err);
			return err
		}

	}
	deleteCollab = async (collaboration_id) => {
		// needs: collaboration_id  

		// console.log("DELETE COLLAB: ", collaboration_id)

		try {
			const url = process.env.REACT_APP_API_URL + "/api/v1/collab/" + collaboration_id

			const response = await fetch(url, {
				method: 'DELETE',
				credentials: 'include',
				body: JSON.stringify({
					collaboration_id: collaboration_id
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			})

			if (!response.ok) {
				throw new Error("Server communication error. Action failed.")
			}

			const responseJson = await response.json();
			console.log("RESPONSE: ", responseJson)

			if (!responseJson.done) {
				this.setState({
					message: responseJson.message
				})
				throw new Error(responseJson.message)
			}


			this.updateCollab("Dropped collaboration")

			return responseJson

		} catch(err){
			console.log(err);
			return err
		}
	}
	shareIssue = async (owner_id, collaborator_id, collaboration_id, issue_id) => {
		// needs: owner_id, collaborator_id, collaboration_id, issue_id 
		try {

			const url = process.env.REACT_APP_API_URL + "/api/v1/collab/share"

			const body = {
				owner_id: owner_id,
				collaborator_id: collaborator_id,
				collaboration_id: collaboration_id,
				issue_id: issue_id
			}

			const response = await fetch(url, {
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify( body ),
				headers: {
					'Content-Type': 'application/json'
				}
			})

			if (!response.ok) {
				throw new Error("Server communication error. Failed to share file.")
			}

			const responseJson = await response.json();
			console.log("RESPONSE: ", responseJson)

			if (!responseJson.done) {
				this.setState({
					message: responseJson.message
				})
				throw new Error(responseJson.message)
			}


			this.updateCollab("Shared issue successfully")

			return responseJson

		} catch(err){
			console.log(err);
			return err
		}

	}
	unshareIssue = async (shared_issue_id) => {
		// needs: shared_issue_id  
		try {
			const url = process.env.REACT_APP_API_URL + "/api/v1/collab/shared_issue/" + shared_issue_id
			// console.log("UNSHARE ISSUE: ", shared_issue_id)

			const response = await fetch(url, {
				method: 'DELETE',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json'
				}
			})

			if (!response.ok) {
				throw new Error("Server communication error. Failed to unshare file.")
			}

			const responseJson = await response.json();
			console.log("RESPONSE: ", responseJson)

			if (!responseJson.done) {
				this.setState({
					message: responseJson.message
				})
				throw new Error(responseJson.message)
			}

			this.updateCollab("Unshared issue successfully")

			return responseJson

		} catch(err){
			console.log(err);
			return err
		}

	}
	render(){

//		console.log("COLLAB STATE: ", this.state)

		return (
			<StyledDiv>
				<section>
					<h1> Collab </h1>
					<div className="innerNav">
						<span 
							className="fakeLink"
							onClick={this.changeView.bind(null, "search")}
						> 
							Find / Add Collabs
						</span>
						<span 
							className="fakeLink"
							onClick={this.changeView.bind(null, "manage")}
						> 
							Manage Collabs
						</span>
						<span 
							className="fakeLink"
							onClick={this.updateCollab.bind(null, "Refreshed")}
						>
							Refresh
						</span>
					</div>
					<br />
					<p className="message"> {this.state.message} &nbsp; </p>
					{ this.state.view === "search" ? 
						<SearchUsers 
							data={this.state} 
							searchUsers={this.searchUsers} 
							addCollab={this.addCollab}
							getUser={this.props.getUser} 
						/> 
					: null }

					{ this.state.view === "manage" ? 
						<ManageCollab 
							data={this.state}
							getUser={this.props.getUser}
							modalOn={this.props.modalOn}
							acceptCollab={this.acceptCollab}
							deleteCollab={this.deleteCollab}
							shareIssue={this.shareIssue}
							unshareIssue={this.unshareIssue}
						/> 
					: null}

				</section>
			</StyledDiv>
		)
	}
}


export default Collab;
