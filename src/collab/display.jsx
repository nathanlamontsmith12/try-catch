import React, { Component } from 'react';

class CollabDisplay extends Component {
	constructor(props){
		super();
		this.state = {
			user: props.userData,
			collab: props.modeData.display.collab,
			shared_issues: props.modeData.display.shared_issues,
			issues: props.modeData.display.issues,
			displayName: props.modeData.display.displayName,
			message: props.modeData.display.message
		}
	}
	render(){

		let sharedIssueDisplay = []
		// let otherIssueDisplay = [] 
		
		let otherIssueDisplay = this.state.issues;

		let sharedDisplay = null
		let otherDisplay = null

		if (this.state.shared_issues && this.state.shared_issues.length > 0) {
			this.state.shared_issues.forEach((shared_issue)=> {
				if (shared_issue.collaboration_id === this.state.collab.id) {
					sharedIssueDisplay.push(shared_issue)
				}
			})
		}

		// if (this.state.issues && this.state.issues.length > 0) {
		// 	this.state.issues.forEach((issue)=> {
		// 		if (!sharedIssueDisplay.includes(issue)){
		// 			otherIssueDisplay.push(issue)
		// 		}
		// 	})
		// }

		if (sharedIssueDisplay.length > 0) {
			sharedDisplay = sharedIssueDisplay.map((issue, i)=>{
				return (
					<li key={i}>
						<button onClick={this.props.modeData.display.unshareIssue.bind(
							null,
							issue.id
						)}> 
							Unshare 
						</button> 
						<p>{ issue.name }</p> 
						<p>Owner: { issue.owner_name } </p>
					</li>
				)
			})
		}

		// shareIssue func. needs (in order): 
		// owner_id, collaborator_id, collaboration_id, issue_id

		// if (otherIssueDisplay.length > 0) {
		// 	otherDisplay = otherIssueDisplay.map((issue, i)=>{

		// 		let collaboratorId = this.state.collab.user_id;

		// 		if (collaboratorId === issue.owner_id) {
		// 			collaboratorId = this.state.collab.collaborator_id;
		// 		}

		// 		let isDisabled = false;

		// 		this.state.shared_issues.forEach((shared_issue)=>{
		// 			if (shared_issue.id === issue.id) {
		// 				isDisabled = true 
		// 			}
		// 		})

		// 		return (
		// 			<li key={i}>
		// 				<button 
		// 					disabled={isDisabled}
		// 					onClick={this.props.modeData.display.shareIssue.bind(
		// 						null,
		// 						this.state.user.id,
		// 						collaboratorId,
		// 						this.state.collab.id,
		// 						issue.id
		// 				)}> 
		// 					Share 
		// 				</button> 
		// 				&nbsp; &nbsp; { issue.name }
		// 			</li>
		// 		)
		// 	})
		// }

		if (otherIssueDisplay.length > 0) {
			otherDisplay = otherIssueDisplay.map((issue, i)=>{

				let collaboratorId = this.state.collab.user_id;

				if (collaboratorId === issue.owner_id) {
					collaboratorId = this.state.collab.collaborator_id;
				}

				let isDisabled = false;

				this.state.shared_issues.forEach((shared_issue)=>{
					if (shared_issue.issue_id === issue.id) {
						isDisabled = true 
					}
				})

				return (
					<li key={i}>
						<button 
							disabled={isDisabled}
							onClick={this.props.modeData.display.shareIssue.bind(
								null,
								this.state.user.id,
								collaboratorId,
								this.state.collab.id,
								issue.id
						)}> 
							Share 
						</button> 
						&nbsp; &nbsp; { issue.name }
					</li>
				)
			})
		}

		console.log("MANAGE COLLAB PROPS: ", this.props)
		return (
			<div>
				<h1> MANAGE COLLAB </h1>
				<br />
				<h4> Collaborator: </h4>
				{ this.state.displayName }
				<hr />
				<br />
				<h4> Issues You Have Shared With { this.state.displayName } : </h4>
				{ sharedIssueDisplay.length > 0 ? <ul>{sharedDisplay}</ul>: <p>None</p>}
				<hr />
				<br />
				<h4> Your Issues: </h4>
				{ otherIssueDisplay.length > 0 ? <ul>{otherDisplay}</ul> : <p>None</p> }
			</div>
		)
	}
}

export default CollabDisplay;

/*
CREATE TABLE shared_issues(
	id SERIAL PRIMARY KEY,
	owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
	owner_name VARCHAR(127),
	issue_id INTEGER REFERENCES issues(id) ON DELETE CASCADE,
	collaborator_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
	collaborator_name VARCHAR(127),
	collaboration_id INTEGER REFERENCES collaborations(id) ON DELETE CASCADE
);

*/

/*
alterModal: ƒ (newData)
deleteItem: ƒ (_x5, _x6)
editItem: ƒ (_x3, _x4)
modeData:
action: "view"
display:
collab: {id: 2, pending: false, user_id: 1, initiator: "rando", collaborator_id: 2, …}
issues: []
shareIssue: ƒ (_x7, _x8)
shared_issues: []
unshareIssue: ƒ (_x9)
__proto__: Object
form: "collab"
__proto__: Object
newItem: ƒ (_x, _x2)
userData: {id: 2, username: "guy", email: "asdf@asdf.com", bio: null, password_digest: "$2a$10$EINwjfs1bzhFT7yr/pcAneeFMWYMukGKuFVlk0Q4iqmOvKUPyoBO2", …}
__proto__: Object
*/
