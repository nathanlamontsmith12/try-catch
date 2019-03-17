import React, { Component } from 'react';
import styled from 'styled-components';

// Styles: 
const StyledDiv = styled.div `

	h1 {
		margin-left: -50px;
	}

	.overflow {
		height: 100px;
	}

	textarea {
		margin-top: 20px;
	}

	.nameText {
		width: 92%;
		height: 40px;
		maxlength: 120;
	}

	.contentText {
		width: 92%;
		height: 160px;
	}
`

class EditNote extends Component {
	constructor(props){
		super();
		this.state = {
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
			<StyledDiv>
				<span
					className="fakeLink"
					onClick={this.props.changeView.bind(null, "view")}
				> 
					back 
				</span>
				<h1>EDIT NOTE</h1>
				<br />
				<br />
				<button 
					onClick={this.props.deleteNote.bind(null, this.state.noteId)}
				> 
					Delete Note 
				</button>
				<br />
				<br />
				<form className="overflow">
					<br />
					<br />
					Name: <br />
					<textarea 
						className="nameText"
						name="name"
						value={this.state.name}
						onChange={this.handleChange}
					/>
					<br />
					<br />
					<br />
					Content: <br />
					<textarea 
						className="contentText"
						name="content"
						value={this.state.content}
						onChange={this.handleChange}
					/>
					<br />
					<button onClick={this.submit}> SAVE CHANGES </button>
					<br />
					<br />
					<br />
					<span 
						className="fakeLink"
						onClick={this.reset}
					>
						Reset Form 
					</span>
				</form>
			</StyledDiv>
		)
	}
}


export default EditNote;
