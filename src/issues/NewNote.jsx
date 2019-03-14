import React, { Component } from 'react';
import styled from 'styled-components';

// Styles: 
const StyledDiv = styled.div `
	input {
		display: block;
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
				<p> {this.state.message} &nbsp; </p>
				<br />
				<form>
					<input 
						type="text"
						name="name"
						value={this.state.name}
						placeholder="Enter note name..."
						onChange={this.handleChange}
					/>
					<input 
						type="text"
						name="content"
						value={this.state.content}
						placeholder="Enter note text..."
						onChange={this.handleChange}
					/>
					<br />
					<button onClick={this.submit}> SAVE </button>
				</form>
			</StyledDiv>
		)
	}
}

export default NewNote;


// changeView(view)
// addNote(data)
