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
	changeView = (view) => {
		this.setState({
			view: view
		})
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

			this.setState({
				message: `Added collaborator — awaiting confirmation from ${username}`
			})

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

			this.setState({
				message: "Activated collaboration"
			})

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

			this.setState({
				message: "Undid collaboration"
			})

			return responseJson

		} catch(err){
			console.log(err);
			return err
		}
	}
	shareIssue = async (issue_id, collaboration_id) => {
		// needs: owner_id, collaborator_id, collaboration_id, issue_id 
		try {
//			const url = process.env.REACT_APP_API_URL 

		} catch(err){
			console.log(err);
			return err
		}

	}
	unshareIssue = async (shared_issue_id) => {
		// needs: shared_issue_id  
		try {
//			const url = process.env.REACT_APP_API_URL 

		} catch(err){
			console.log(err);
			return err
		}

	}
	render(){
		console.log("COLLAB STATE: ", this.state)
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
					</div>
					
					{ this.state.view === "search" ? 
						<SearchUsers 
							data={this.state} 
							searchUsers={this.searchUsers} 
							addCollab={this.addCollab} 
						/> 
					: null }

					{ this.state.view === "manage" ? 
						<ManageCollab 
							data={this.state}
							modalOn={this.props.modalOn}
							acceptCollab={this.acceptCollab}
							deleteCollab={this.deleteCollab}
						/> 
					: null}

				</section>
			</StyledDiv>
		)
	}
}


/*
    modalOn = (data) => {
        this.setState({
            appModal: data
        })
    }

<Route 
	exact path="/collab" 
	render={ (props) => <Collab {...props}
	    modalOn={this.modalOn} 
	    userData={this.state.userData} 
	    getUser={this.getUser} 
	    issues={this.state.issues}
	    collaborations={this.state.collaborations}
	    shared_issues={this.state.shared_issues}
	/>

getUser: ƒ (_x2)
history: {length: 50, action: "PUSH", location: {…}, createHref: ƒ, push: ƒ, …}
location: {pathname: "/collab", search: "", hash: "", state: undefined, key: "gbj5as"}
match: {path: "/collab", url: "/collab", isExact: true, params: {…}}
modalOn: ƒ (data)
staticContext: undefined
userData:
bio: "Normal guy, here"
email: "asdf@asdf.com"
id: 4
is_admin: false
password_digest: "$2a$10$y5vmxBXasEj0UuGpc9SoeumksK.3EO0zNim3gp.lygiQStfbCbzpe"
reg_time: 1552168474662
username: "guy"

*/


export default Collab;
