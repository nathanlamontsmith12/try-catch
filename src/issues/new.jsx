import React, { Component } from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div `
	h1 {
		margin-left: -20px;
	}

	.overflow {
		height: 200px;
	}

	textarea {
		margin-top: 20px;
	}

	.nameText {
		width: 350px;
		height: 40px;
		maxlength: 120;
	}

	.descriptionText {
		width: 350px;
		height: 160px;
	}
`

class NewIssue extends Component {
	constructor(props){
		super();
		this.state = {
			name: "",
			description: ""
		}
	}
	clear = () => {
		this.setState({
			name: "",
			description: ""
		})
	}
	handleChange = (evt) => {
		this.setState({
			[evt.currentTarget.name]: evt.currentTarget.value
		})
	}
	submit = (evt) => {
		evt.preventDefault();

		const body = {
			name: this.state.name,
			description: this.state.description
		}

		this.setState({
			name: "",
			description: ""
		})

		this.props.newItem(body, "issue")
	}
	render(){
//		console.log("NEW ISSUE PROPS: ", this.props);
		return(
			<StyledDiv>
				<h1> NEW ISSUE </h1>
				<br />
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
					Description: <br />
					<textarea 
						className="descriptionText" 
						name="description"
						value={this.state.description}
						onChange={this.handleChange}
					/>
					<br />
					<br />
					<button onClick={this.submit}> Create </button>
				</form>
				<br />
				<span className="fakeLink" onClick={this.clear}> Clear Form </span>
			</StyledDiv>
		)
	}
}

export default NewIssue;