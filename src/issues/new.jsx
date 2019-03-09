import React, { Component } from 'react';

class NewIssue extends Component {
	constructor(props){
		super();
		this.state = {

		}
	}
	render(){
		console.log("NEW ISSUE PROPS: ", this.props);
		return(
			<h1> NEW ISSUE </h1>
		)
	}
}

export default NewIssue;