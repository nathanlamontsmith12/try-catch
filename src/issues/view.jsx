import React, { Component } from 'react';
import styled from 'styled-components';

// Components: 
import NewNote from './NewNote';
import EditNote from './EditNote';

// Styles: 
const StyledDiv = styled.div `
	h1 {
		margin-left: -20px;
	}

	.overflow {
		height: 200px;
	}

	ul {
		list-style: none;
	}
`


class ViewIssue extends Component {
	constructor(props){
		super();
		this.state = {
			view: "view", // --> acceptable: "view", "new", "edit", "detail"
			user: props.userData,
			issue: props.modeData.display,
			notes: [],
			targetNote: null
		}
	}
	componentDidMount(){
		this.updateNotes();
	}
	updateNotes = async () => {
		try {

			const id = this.state.issue.issue_id || this.state.issue.id

			const url = process.env.REACT_APP_API_URL + "/api/v1/issue/note/" + id

			const response = await fetch(url, {
				method: 'GET',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json'
				}
			})

			const responseJson = await response.json();
			// console.log("RESPONSE: ", responseJson)

			let updatedNotes = []

			if (responseJson.found_notes && responseJson.found_notes.length > 0) {
				updatedNotes = responseJson.found_notes
			}

			this.setState({
				notes: updatedNotes,
				view: "view"
			})

		} catch(err) {
			console.log(err);
			return err
		}
	}
	addNote = async (data) => {
		// console.log("ADD NOTE: ", data)

		try {

			const url = process.env.REACT_APP_API_URL + "/api/v1/issue/note"

			const body = {
				name: data.name,
				content: data.content,
				issue_id: data.issue_id,
				owner_id: data.user.id
			}


			if (this.state.issue.issue_id) {
				body.issue_id = this.state.issue.issue_id
			}

			const response = await fetch(url, {
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify( body ),
				headers: {
					'Content-Type': 'application/json'
				}
			})

			const responseJson = await response.json();
			// console.log("RESPONSE: ", responseJson)

			this.updateNotes();

			return responseJson

		} catch(err) {
			console.log(err);
			return err
		}
	}
	editNote = async (data) => {
		// console.log("EDIT NOTE: ", data)

		try {

			const url = process.env.REACT_APP_API_URL + "/api/v1/issue/note/" + data.noteId.toString()

			const body = {
				name: data.name,
				content: data.content
			}

			const response = await fetch(url, {
				method: 'PATCH',
				credentials: 'include',
				body: JSON.stringify( body ),
				headers: {
					'Content-Type': 'application/json'
				}
			})

			const responseJson = await response.json();
			// console.log("RESPONSE: ", responseJson)

			this.updateNotes();

			return responseJson

		} catch(err) {
			console.log(err);
			return err
		}
	}
	deleteNote = async (noteId) => {
		// console.log("DELETE NOTE: ", noteId)

		try {

			const url = process.env.REACT_APP_API_URL + "/api/v1/issue/note/" + noteId.toString()

			const response = await fetch(url, {
				method: 'DELETE',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json'
				}
			})

			const responseJson = await response.json();
			// console.log("RESPONSE: ", responseJson)

			this.updateNotes();

			return responseJson

		} catch(err) {
			console.log(err);
			return err
		}

	}
	changeView = (view) => {
		this.setState({
			view: view,
			needUpdate: true
		})
	}
	toEditView = (id) => {

		const selectedNote = this.state.notes.find( (note) => {
			if (note.id === id) {
				return true
			} else {
				return false 
			}
		})

		this.setState({
			view: "edit",
			targetNote: selectedNote
		})
	}
	render(){

		//console.log("VIEW ISSUE STATE: ", this.state)

		let notes = "No notes for this issue"

		if (this.state.notes && this.state.notes.length > 0) {

			let tempNotes = this.state.notes;

			if (tempNotes.length > 1) {
				tempNotes.sort( (a, b) => {
					return b.id - a.id 
				})
			}

			notes = tempNotes.map( (note, i) => {

				let isHidden = false;
				if (this.state.user.id !== note.owner_id) {
					isHidden = true;
				}

				return (
					<li key={i}> 
						<strong> {note.name} </strong> 
						<br />
						Posted by: {note.owner_name}
						<br />
						<br />
						<button 
							onClick={this.toEditView.bind(null, note.id)}
							hidden={isHidden}
						> 
							Edit 
						</button>
						<br />
						<br />
						<p> {note.content} </p>
						<hr /> 
						<br />
					</li>
				)
			})			
		}

		let isHidden2 = false;

		if (this.state.user.id !== this.state.issue.owner_id) {
			isHidden2 = true;
		}

		return(
			<StyledDiv>
				{ this.state.view === "new" ? 
					<NewNote 
						changeView={this.changeView}
						addNote={this.addNote}
						issue={this.state.issue}
						user={this.state.user}
					/> 

				: null }

				{ this.state.view === "view" ? <h1> VIEW ISSUE </h1> : null}

				{this.state.view === "view" && !isHidden2 ? 
					<span 
						hidden={isHidden2}
						className="fakeLink" 
						style={{display: "block"}}
						onClick={this.props.alterModal.bind(
							null, 
							({
								action: "edit", 
								display: this.props.modeData.display, 
								owner_id: this.props.modeData.display.owner_id,
								form: "issue"
							})
						)}
					> 
						Edit / Remove Issue 
					</span> 
					: null }
						
				{ this.state.view === "view" ?
					<div className="overflow">
						<h3> { this.props.modeData.display.name } </h3>
						<p> { this.props.modeData.display.description } </p>
						
						<span 
							className="fakeLink"
							style={{display: "block"}}
							onClick={this.changeView.bind(null, "new")}
						> 
							Add Note 
						</span>

						<ul>
							<hr />
							{ notes }
						</ul>
					</div> 
				: null }

				{ this.state.view === "edit" && this.state.targetNote ? 
					<EditNote 
						changeView={this.changeView}
						editNote={this.editNote}
						deleteNote={this.deleteNote}
						note={this.state.targetNote}
						user={this.state.user}
					/>
				: null }
			</StyledDiv>
		)
	}
}

export default ViewIssue;


// PROPS: 

// alterModal   (function)

// modeData:
// action: "view"
// display: {id: 13, name: "blueberry", description: "aaaa", owner_id: 4}
// form: "issue"


// userData:
// bio: null
// email: "asdf@asdf.com"
// id: 4
// is_admin: false
// password_digest: "$2a$10$oSMO5pdzOzK3Cwp5YwnpruwLZnDI98wMtevZTzIcaM7c6NnMmAizC"
// reg_time: 1552168474662
// username: "guy"