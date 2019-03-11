import React, { Component } from 'react';

// Components: 
import NewNote from './NewNote';
import EditNote from './EditNote';


class ViewIssue extends Component {
	constructor(props){
		super();
		this.state = {
			view: "view", // --> acceptable: "view", "new", "edit", "detail"
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

			const url = process.env.REACT_APP_API_URL + "/api/v1/issue/note/" + this.state.issue.id

			const response = await fetch(url, {
				method: 'GET',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json'
				}
			})

			const responseJson = await response.json();
			console.log("RESPONSE: ", responseJson)

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
		console.log("ADD NOTE: ", data)

		try {

			const url = process.env.REACT_APP_API_URL + "/api/v1/issue/note"

			const body = {
				name: data.name,
				content: data.content,
				issue_id: data.issue_id
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
			console.log("RESPONSE: ", responseJson)

			this.updateNotes();

		} catch(err) {
			console.log(err);
			return err
		}
	}
	editNote = async (data) => {
		console.log("EDIT NOTE: ", data)

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
			console.log("RESPONSE: ", responseJson)

			this.updateNotes();

		} catch(err) {
			console.log(err);
			return err
		}
	}
	deleteNote = async (noteId) => {
		console.log("DELETE NOTE: ", noteId)

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
			console.log("RESPONSE: ", responseJson)

			this.updateNotes();

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

		let notes = "No notes for this issue"

		if (this.state.notes && this.state.notes.length > 0) {

			let tempNotes = this.state.notes;

			if (tempNotes.length > 1) {
				tempNotes.sort( (a, b) => {
					return a.id - b.id 
				})
			}

			notes = tempNotes.map( (note, i) => {
				return (
					<li key={i}> 
						<hr />
						<strong> {note.name} </strong> 
						<br />
						<button 
							onClick={this.toEditView.bind(null, note.id)}
						> 
							Edit 
						</button>
						<br />
						<p> {note.content} </p>
						<hr /> 
					</li>
				)
			})			
		}


		return(
			<div>
				{ this.state.view === "new" ? 
					<NewNote 
						changeView={this.changeView}
						addNote={this.addNote}
						issue={this.state.issue}
					/> 

				: null }

				{ this.state.view === "view" ? 
					<div>
						<h1> VIEW ISSUE </h1>

						<span 
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
					/>
				: null }
			</div>
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