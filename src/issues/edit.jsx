import React, { Component } from 'react';

class EditIssue extends Component {
	constructor(props){
		super();
		this.state = {
			check: false,
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
	toggleCheck = (evt) => {
		evt.preventDefault();

		console.log("toggle check view triggered")

		if (this.state.check) {
			this.setState({
				check: false
			})
		} else {
			this.setState({
				check: true
			})
		}
	}
	deleteIssue = (evt) => {
		evt.preventDefault();

		this.props.deleteItem(this.state, "issue")
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
				{ this.state.check ? 
					<div className="check"> 
						<p>Are you sure? This will delete all saved data 
						related to the issue, and cannot be undone </p>
						<br />
						<button onClick={this.deleteIssue}> 
							Yes, Delete 
						</button> 
						<br />
						<br />
						<button onClick={this.toggleCheck}> No! Keep it </button> 
					</div>
				: null }
				{ !this.state.check ? 
					<div>
						<h1> EDIT ISSUE </h1>
						<br />
						<button onClick={this.toggleCheck}> Delete Issue </button>
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
						<span 
							className="fakeLink" 
							onClick={this.reset}> 
								Reset Form 
						</span>
					</div> 
				: null }
			</div>
		)
	}
}

export default EditIssue;