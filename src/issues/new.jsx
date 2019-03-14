import React, { Component } from 'react';

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
			<div>
				<h1> NEW ISSUE </h1>
				<br />
				<br />
				<br />
				<form>
					Name: <br />
					<input 
						name="name" 
						type="text"
						placeholder="Enter issue name..." 
						value={this.state.name}
						onChange={this.handleChange}
					/> 
					<br />
					<br />
					Description: <br />
					<input 
						name="description"
						type="text" 
						placeholder="Enter issue description..."
						value={this.state.description}
						onChange={this.handleChange}
					/>
					<br />
					<br />
					<button onClick={this.submit}> Create </button>
				</form>
				<br />
				<br />
				<br />
				<span className="fakeLink" onClick={this.clear}> Clear Form </span>
			</div>
		)
	}
}

export default NewIssue;