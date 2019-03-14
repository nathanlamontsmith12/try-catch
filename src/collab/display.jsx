import React, { Component } from 'react';

class CollabDisplay extends Component {
	constructor(props){
		super();
		this.state = {
			user: props.userData,
			collab: props.modeData.display.collab,
			displayName: props.modeData.display.displayName,
			message: props.modeData.display.message,
			shared_issues: [],
			issues: []
		}
	}
	unshare = async (id) => {
		try {
			const check = await this.props.modeData.display.unshareIssue(id);
			
			if (!check.done) {
				throw new Error("Failed to unshare")
			}

			this.updateModal("Unshared the issue")

		} catch(err){
			console.log(err)
			this.setState({
				message: "Failed to unshare"
			})
			return err
		}
	}
	share = async (collaboratorId, issueId) => {
		try {
			const check = await this.props.modeData.display.shareIssue(
				this.state.user.id, 
				collaboratorId, 
				this.state.collab.id, 
				issueId
			)
			if (!check.done) {
				throw new Error("Failed to share")
			}

			this.updateModal("Shared the issue")

		} catch(err) {
			console.log(err)
			this.setState({
				message: "Failed to share"
			})
			return err 
		}
	}
	endCollab = async () => {
		try {
			await this.props.modeData.display.deleteCollab(this.state.collab.id)
			this.props.modalOff();
		} catch(err) {
			console.log(err)
			return err
		}
	}
	updateModal = async (message = "") => {
		try {
			const newData = await this.props.modeData.display.getUser(this.state.user.id);
			
			this.setState({
				shared_issues: newData.shared_issues,
				issues: newData.issues,
				message: message 
			})

		} catch(err) {
			console.log(err);
			return err
		}
	}
	async componentDidMount(){
		try {
			await this.updateModal(); 
		} catch(err) {
			console.log(err);
			return err
		}
	}
	render(){

		console.log("COLLAB STATE: ", this.state)

		let sharedIssueDisplayArray = []
		let sharedDisplay = null

		if (this.state.shared_issues) {
			if (this.state.shared_issues.length > 0) {
				this.state.shared_issues.forEach((shared_issue)=> {
					if (shared_issue.collaboration_id === this.state.collab.id) {
						sharedIssueDisplayArray.push(shared_issue)
					}
				})
			}
		}


		if (sharedIssueDisplayArray.length > 0) {
			sharedDisplay = sharedIssueDisplayArray.map((issue, i)=>{
				return (
					<li key={i}>
						<button onClick={this.unshare.bind(null, issue.id)}> 
							Unshare 
						</button> 
						<p>{ issue.name }</p> 
						<p>Owner: { issue.owner_name } </p>
					</li>
				)
			})
		}

		let issueDisplay = null;

		if (this.state.issues) {
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
								onClick={this.share.bind(
									null, 
									collaboratorId, 
									issue.id
							)}>
								Share 
							</button> 
							&nbsp; &nbsp; { issue.name }
						</li>
					)
				})
			}
		}
		// console.log("MANAGE COLLAB PROPS: ", this.props)
		return (
			<div>
				<h1> MANAGE COLLAB </h1>
				<br />
				<button 
					onClick={this.endCollab}> 
					End Collaboration 
				</button>
				<br />
				<br />
				{ this.state.message ? <p> {this.state.message} </p> : <p> &nbsp; </p> }
				<br />
				<br />
				<h4> Collaborator: </h4>
				{ this.state.displayName }
				<hr />
				<br />
				<h4> Shared Issues: </h4>
				{ sharedDisplay ? <ul>{sharedDisplay}</ul> : <p>None</p>}
				<hr />
				<br />
				<h4> Your Issues: </h4>
				{ issueDisplay ? <ul>{issueDisplay}</ul> : <p>None</p> }
			</div>
		)
	}
}

export default CollabDisplay;
