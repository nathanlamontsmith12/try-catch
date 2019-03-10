import React, { Component } from 'react';

class EditIssue extends Component {
	constructor(props){
		super();
		this.state = {
			name: props.modeData.display.name,
			id: props.modeData.display.id,
			description: props.modeData.display.description
		}
	}
	reset = () => {
		this.setState({
			name: this.props.modeData.display.name,
			description: this.props.modeData.display.description
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
			id: this.state.id,
			description: this.state.description
		}

		this.setState({
			name: "",
			description: ""
		})

		this.props.editItem(body, "issue")
	}
	render(){
		return(
			<div>
				<h1> EDIT ISSUE </h1>
				<br />
				<br />
				<form>
					<input 
						name="name" 
						type="text"
						placeholder="Enter issue name..." 
						value={this.state.name}
						onChange={this.handleChange}
					/> 
					<br />
					<input 
						name="description"
						type="text" 
						placeholder="Enter issue description..."
						value={this.state.description}
						onChange={this.handleChange}
					/>
					<br />
					<button onClick={this.submit}> Update </button>
				</form>
				<br />
				<br />
				<br />
				<span className="fakeLink" onClick={this.reset}> Reset Form </span>
			</div>
		)
	}
}

export default EditIssue;