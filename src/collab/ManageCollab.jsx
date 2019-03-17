import React, { Component } from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div `
	margin-left: 20px;

	.overflow {
		max-height: 190px;
	}
`

class ManageCollab extends Component {
	constructor(props){
		super();
		this.state = {
			message: props.data.message,
			user: props.data.user,
			issues: props.data.issues,
			collaborations: props.data.collaborations,
			shared_issues: props.data.shared_issues,
			activeCollaborations: [],
			pendingCollaborationsSent: [],
			pendingCollaborationsReceived: []
		}
	}
	async shouldComponentUpdate(nextProps, nextState){
		if (this.props.data !== nextProps.data) {

			try {
				const newData = await this.props.getUser(this.state.user.id);
				this.setCollaborations(newData.collaborations)
			} catch (err) {
				console.log(err)
				return err
			}
		}

		return true
	}
	setCollaborations = (collabArray) => {

		const pendingCollaborationsSent = [];
		const pendingCollaborationsReceived = [];
		const activeCollaborations = [];

		if (collabArray && collabArray.length > 0) {
			collabArray.forEach((collaboration)=>{
			
				if (!collaboration.pending) {
					activeCollaborations.push(collaboration)
				} else {
					if (collaboration.user_id === this.state.user.id && collaboration.pending) {
						pendingCollaborationsSent.push(collaboration)
					}
					if (collaboration.collaborator_id === this.state.user.id && collaboration.pending) {
						pendingCollaborationsReceived.push(collaboration)
					}
				}
			})
		}

		this.setState({
			collaborations: collabArray,
			activeCollaborations: activeCollaborations,
			pendingCollaborationsSent: pendingCollaborationsSent,
			pendingCollaborationsReceived: pendingCollaborationsReceived
		})
	}
	async componentDidMount(){
		try {
			const newData = await this.props.getUser(this.state.user.id);
			
			this.setCollaborations(newData.collaborations);
		} catch(err) {
			console.log(err)
			return err
		}
	}
	render(){

		// console.log("Manage collab state: ", this.state)

		// recieved, sent, active 
		let received = null;
		let sent = null;
		let active = null;

		if (this.state.pendingCollaborationsReceived.length > 0) {
			received = this.state.pendingCollaborationsReceived.map((collab, i)=>{
				return (
					<li key={i}> 
						<button 
							onClick={this.props.acceptCollab.bind(
								null, 
								collab.id, 
								this.state.user.id
						)}> 
							Accept 
						</button> &nbsp; &nbsp; 
						{collab.initiator} &nbsp; &nbsp; 
						<button onClick={this.props.deleteCollab.bind(
							null,
							collab.id
						)}> 
							Decline 
						</button> 
					</li>
				)
			})
		}

		if (this.state.pendingCollaborationsSent.length > 0) {
			sent = this.state.pendingCollaborationsSent.map((collab, i)=>{
				return (
					<li key={i}> 
						{collab.collaborator} &nbsp; &nbsp; 
						<button onClick={this.props.deleteCollab.bind(
							null,
							collab.id
						)}> 
							Undo 
						</button> 
					</li>
				)
			})
		}

		if (this.state.activeCollaborations.length > 0) {
			active = this.state.activeCollaborations.map((collab, i)=>{
				let display;
				if (collab.collaborator_id !== this.state.user.id) {
					display = collab.collaborator
				} else {
					display = collab.initiator  
				}
				return (
					<li key={i}> 
						<button 
							onClick={this.props.modalOn.bind(
								null, 
								({
									form: "collab", 
									action: "view", 
									display: { 
										collab: collab,
										displayName: display,
										message: this.state.message,
										// modalOff: this.props.modalOff,
										getUser: this.props.getUser,
										shareIssue: this.props.shareIssue,
										unshareIssue: this.props.unshareIssue,
										deleteCollab: this.props.deleteCollab,
										issues: this.state.issues,
										shared_issues: this.state.shared_issues
									}
								})
						)}> 
							Manage 
						</button> &nbsp; &nbsp; {display} 
					</li>
				) 			
			})
		}

		return(
			<StyledDiv>
				<br />
				<h2> Manage Collaborations </h2>
				<br />
				<br />
				<div className="overflow">
					<h4> Received: </h4>
						{ received ? 
							<ul> {received} </ul> 
							: 
							<p> None </p> 
						}
					<hr />
					<br />
					<h4> Sent: </h4>
						{ sent ? 
							<ul> {sent} </ul> 
							: 
							<p> None </p> 
						}
					<hr />
					<br />
					<h4> Active: </h4>
						{ active ? 
							<ul> {active} <br /> <br /> <br /> </ul> 
							: 
							<p> None <br /> <br /> <br /> </p> 
						}
				</div>
			</StyledDiv>
		)
	}
}


export default ManageCollab;


// user: props.data.user,
// issues: props.data.issues,
// collaborations: props.data.collaborations,
// shared_issues: props.data.shared_issues,