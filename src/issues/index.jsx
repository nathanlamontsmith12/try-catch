import React, { Component } from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div `
	display: flex;
	justify-content: center;
	align-items: center;
	background: rgba(255, 99, 71, 0.8); 
	height: 100%;

	div {
		height: 100%;
	}

	.center {
		display: flex;
		justify-content: center;
	}

	section {
		height: 100%;
		width: 70%;
		opacity: 0.9;
		background: white;
	}

	section span, section span, section ul {
		margin-left: 40px;
	}
`

class Issues extends Component {
	constructor(props){
		super();
		this.state = {
			issues: props.issues
		}
	}
	render(){
		// console.log("ISSUES STATE: ", this.state)

		let issues = null;

		if (this.state.issues && this.state.issues.length > 0) {

			issues = this.state.issues;

			// sort oldest issues first: 
			if (this.state.issues.length > 1) {
				issues.sort((a, b) => {
					return a.id - b.id
				})				
			}

			issues = issues.map((issue, i) => {
				return (
					<li key={`issue-${issue.id}`}>
						<hr />
						<strong>
							<span 
								className="fakeLink" 
								onClick={this.props.modalOn.bind(
									null, 
									({form: "issue", action: "view", display: issue})
									)}>
								{issue.name}
							</span>
						</strong>
						<br />
						<p>{ issue.description }</p>
						<hr />
					</li>
				)
			})
		}

		return (
			<StyledDiv>
				<section>
					<h1> Issues </h1>
					<br />
					<span 
						className="fakeLink" 
						onClick={this.props.modalOn.bind(
							null, 
							({form: "issue", action: "new", display: null})
							)}> 
						New Issue 
					</span>
					<ul> 
						{issues} 
					</ul>
				</section>
			</StyledDiv>
		)
	}
}




export default Issues;
