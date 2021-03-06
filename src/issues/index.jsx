import React, { Component } from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div `
	display: flex;
	justify-content: center;
	align-items: center;
	background: rgba(255, 99, 71, 0.8); 
	height: 100%;

	.overflow {
		max-height: 220px;
	}

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

	section div {
		margin-left: 20px;
	}

	section span, section ul {
		margin-left: 40px;
	}
`

class Issues extends Component {
	constructor(props){
		super();
		this.state = {
			user: props.userData,
			issues: props.issues,
			shared_issues: props.shared_issues
		}
	}
	shouldComponentUpdate(nextProps, nextState){
		if (this.state.issues !== nextProps.issues || this.state.shared_issues !== nextProps.shared_issues) {
			this.setState({
				issues: nextProps.issues,
				shared_issues: nextProps.shared_issues
			})
		}
		return true
	}
	render(){
		// console.log("ISSUES STATE: ", this.state)

		let issues = null;

		if (this.state.issues && this.state.issues.length > 0) {

			issues = this.state.issues;

			// sort newest issues first: 
			if (this.state.issues.length > 1) {
				issues.sort((a, b) => {
					return b.id - a.id
				})				
			}

			issues = issues.map((issue, i) => {
				return (
					<li key={`issue-${issue.id}`}>
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
						<br />
						<hr />
					</li>
				)
			})
		}

		let shared_issues = null;


		if (this.state.shared_issues && this.state.shared_issues.length > 0) {

			// filter out shared_issues that current user owns (these will already be listed
			// under "your issues")
			shared_issues = this.state.shared_issues.filter((issue)=>{
				if (issue.owner_id === this.state.user.id) {
					return false
				} else {
					return true 
				}
			});

			// sort newest shared_issues first: 
			if (this.state.shared_issues.length > 1) {
				shared_issues.sort((a, b) => {
					return b.id - a.id
				})
			}

			shared_issues = shared_issues.map((shared_issue)=>{
				return (
					<li key={`issue-${shared_issue.id}`}>
						<strong>
							<span 
								className="fakeLink" 
								onClick={this.props.modalOn.bind(
									null, 
									({form: "issue", action: "view", display: shared_issue})
									)}>
								{shared_issue.name}
							</span>
						</strong>
						<br />
						<p>{ shared_issue.description }</p>
						<br />
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
					<br />
					<br />
					<br />
					<div className="overflow">
						<h4> Your Issues: </h4>
						<br />
						{ issues ? <ul className="noStyleList"> <hr /> {issues} </ul> : <p> None </p> }
						<br />
						<br />
						<br />
						<h4> Shared Issues: </h4>
						<br />
						{ shared_issues ? <ul className="noStyleList"> <hr /> {shared_issues} </ul> : <p> None </p> }
					</div>
				</section>
			</StyledDiv>
		)
	}
}




export default Issues;
