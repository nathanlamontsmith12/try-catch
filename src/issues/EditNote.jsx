import React, { Component } from 'react';

class EditNote extends Component {
	constructor(props){
		super();
		this.state = {
			message: "",
			name: props.note.name,
			note: props.note,
			content: props.note.content,
			noteId: props.note.id 
		}
	}
	reset = () => {
		this.setState({
			name: this.props.note.name,
			content: this.props.note.content,
			message: ""
		})
	}
	handleChange = (evt) => {
		this.setState({
			[evt.currentTarget.name]: evt.currentTarget.value,
			message: "" 
		})
	}
	submit = async (evt) => {

		evt.preventDefault();
		console.log("SUBMIT NOTE EDITS")

		if (!this.state.name || !this.state.content) {

			this.setState({
				message: "Invalid input",
				name: this.props.note.name,
				content: this.props.note.content
			})

			return 
		} 

		try {

			await this.props.editNote(this.state);

			this.props.changeView("view");
			
		} catch(err) {
			console.log(err);
			return err
		}
	}
	render(){
		return(
			<div>
				<span
					className="fakeLink"
					onClick={this.props.changeView.bind(null, "view")}
				> 
					back 
				</span>
				<h1>EDIT NOTE</h1>
				<br />
				<p> {this.state.message} &nbsp; </p>

				<br />

				<button 
					onClick={this.props.deleteNote.bind(null, this.state.noteId)}
				> 
					Delete Note 
				</button>

				<br />

				<form>
					<input 
						type="text"
						name="name"
						value={this.state.name}
						onChange={this.handleChange}
					/>
					<br />
					<input 
						type="text"
						name="content"
						value={this.state.content}
						onChange={this.handleChange}
					/>
					<br />
					<button onClick={this.submit}> SAVE CHANGES </button>
				</form>
				<span 
					className="fakeLink"
					onClick={this.reset}
				>
					Reset Form 
				</span>
			</div>
		)
	}
}


export default EditNote;
