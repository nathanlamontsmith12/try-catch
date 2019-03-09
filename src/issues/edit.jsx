import React, { Component } from 'react';

class EditIssue extends Component {
	constructor(props){
		super();
		this.state = {

		}
	}
	render(){
		console.log("EDIT ISSUE PROPS: ", this.props);
		return(
			<h1> EDIT ISSUE </h1>
		)
	}
}

export default EditIssue;