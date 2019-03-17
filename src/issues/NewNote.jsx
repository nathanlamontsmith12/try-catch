import React, { Component } from 'react';
import styled from 'styled-components';

// Styles: 
const StyledDiv = styled.div `
	h1 {
		margin-left: -20px;
	}

	.overflow {
		height: 120px;
	}

	textarea {
		margin-top: 20px;
	}

	.nameText {
		height: 40px;
		maxlength: 120;
	}

	.contentText {
		height: 160px;
	}
`

class NewNote extends Component {
	constructor(props){
		super();
		this.state = {
			user: props.user,
			issue_id: props.issue.id,
			name: "",
			content: "",
			message: ""
		}
	}
	handleChange = (evt) => {
		this.setState({
			[evt.currentTarget.name]: evt.currentTarget.value,
			message: "" 
		})
	}
	submit = async (evt) => {

		evt.preventDefault();
		// console.log("SUBMIT NOTE HIT")

		if (!this.state.name || !this.state.content) {
			this.setState({
				message: "Invalid input"
			})

			return 
		} 

		try {

			this.setState({
				issue_id: this.props.issue.id,
				name: "",
				content: "",
				message: ""
			})

			await this.props.addNote(this.state);

			this.props.changeView("view");
			
		} catch(err) {
			console.log(err);
			return err
		}
	}
	render(){

		// console.log("NEW NOTE STATE: ", this.state)

		return (
			<StyledDiv>
				<span
					className="fakeLink"
					onClick={this.props.changeView.bind(null, "view")}
				> 
					back 
				</span>
				<h1>ADD NOTE</h1>
				<br />
				<form className="overflow">
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
					<br />
					<br />
				</form>
				<br />
				<button onClick={this.submit}> SAVE </button>
			</StyledDiv>
		)
	}
}

export default NewNote;


// changeView(view)
// addNote(data)
