import React, { Component } from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div `
	margin-left: 20px;
`

class ManageCollab extends Component {
	constructor(props){
		super();

		const pendingCollaborationsSent = [];
		const pendingCollaborationsReceived = [];
		const activeCollaborations = [];

		if (props.data.collaborations && props.data.collaborations.length > 0) {
			props.data.collaborations.forEach((collaboration)=>{
			
				if (!collaboration.pending) {
					activeCollaborations.push(collaboration)
				} else {
					if (collaboration.user_id === props.data.user.id && collaboration.pending) {
						pendingCollaborationsSent.push(collaboration)
					}
					if (collaboration.collaborator_id === props.data.user.id && collaboration.pending) {
						pendingCollaborationsReceived.push(collaboration)
					}
				}
			})
		}

		this.state = {
			user: props.data.user,
			issues: props.data.issues,
			collaborations: props.data.collaborations,
			shared_issues: props.data.shared_issues,
			activeCollaborations: activeCollaborations,
			pendingCollaborationsSent: pendingCollaborationsSent,
			pendingCollaborationsReceived: pendingCollaborationsReceived
		}
	}
	render(){

		// recieved, sent, active 
		let received = null;
		let sent = null;
		let active = null;

		if (this.state.pendingCollaborationsReceived.length > 0) {
			received = this.state.pendingCollaborationsReceived.map((collab, i)=>{
				return <li key={i}> {collab.initiator} </li>
			})
		}

		if (this.state.pendingCollaborationsSent.length > 0) {
			sent = this.state.pendingCollaborationsSent.map((collab, i)=>{
				return <li key={i}> {collab.collaborator} </li>
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
				return <li key={i}> {display} </li>				
			})
		}

		return(
			<StyledDiv>
				<br />
				<br />
				<h2> Manage Collaborations </h2>
				<br />
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
						<ul> {active} </ul> 
						: 
						<p> None </p> 
					}
			</StyledDiv>
		)
	}
}


export default ManageCollab;


// user: props.data.user,
// issues: props.data.issues,
// collaborations: props.data.collaborations,
// shared_issues: props.data.shared_issues,