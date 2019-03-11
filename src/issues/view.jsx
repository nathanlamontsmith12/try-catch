import React, { Component } from 'react';

// Components: 
import NewNote from './NewNote';


class ViewIssue extends Component {
	constructor(props){
		super();
		this.state = {
			view: "view", // --> acceptable: "view", "new", "edit"
			issue: props.modeData.display,
			needUpdate: false,
			firstLoad: true,
			notes: []
		}
	}
	async shouldComponentUpdate(nextProps, nextState){

		if (this.state.needUpdate && !this.state.firstLoad) {
			try {
				await this.updateNotes(); 
			} catch(err) {
				console.log(err);
				return false
			}
		}

		return true
	}
	componentDidMount(){
		if (this.state.firstLoad) {
			this.updateNotes();
		}
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
				needUpdate: false,
				firstLoad: false,
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
	render(){

		let notes = "No notes for this issue"

		if (this.state.notes && this.state.notes.length > 0) {
			notes = this.state.notes.map( (note, i) => {
				return (<li key={i}> <strong> {note.name} </strong> <br /> {note.content} </li>)
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

				:

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
				</div> }
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