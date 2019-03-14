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

		// console.log("COLLAB STATE: ", this.state)

		let sharedIssueDisplayArray = []
		let sharedDisplay = null

		if (this.state.shared_issues && this.state.shared_issues.length > 0) {
			this.state.shared_issues.forEach((shared_issue)=> {
				if (shared_issue.collaboration_id === this.state.collab.id) {
					sharedIssueDisplayArray.push(shared_issue)
				}
			})
		}


		if (sharedIssueDisplayArray.length > 0) {
			sharedDisplay = sharedIssueDisplayArray.map((issue, i)=>{
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

		let issueDisplay = null;

		if (this.state.issues.length > 0) {
			issueDisplay = this.state.issues.map((issue, i)=>{

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

		// console.log("MANAGE COLLAB PROPS: ", this.props)
		return (
			<div>
				<h1> MANAGE COLLAB </h1>
				<br />
				<br />
				<button 
					onClick={this.props.modeData.display.deleteCollab.bind(
						null, 
						this.state.collab.id
					)}> 
					End Collaboration 
				</button>
				<br />
				<h4> Collaborator: </h4>
				{ this.state.displayName }
				<hr />
				<br />
				<h4> Shared Issues: </h4>
				{ sharedDisplay ? <ul>{sharedDisplay}</ul>: <p>None</p>}
				<hr />
				<br />
				<h4> Your Issues: </h4>
				{ issueDisplay ? <ul>{issueDisplay}</ul> : <p>None</p> }
			</div>
		)
	}
}

export default CollabDisplay;

