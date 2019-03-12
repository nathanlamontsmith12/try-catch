import React, { Component } from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div `
	margin-left: 20px;
`

class SearchUsers extends Component {
	constructor(props){
		super();

		let prevResults = [];
		if (props.searchResults && props.searchResults.length > 0) {
			prevResults = props.searchResults
		} 

		let prevExactMatch = null;
		if (props.exactMatch) {
			prevExactMatch = props.exactMatch
		}

		this.state = {
			query: "",
			lastQuery: "",
			user: props.data.user,
			issues: props.data.issues,
			collaborations: props.data.collaborations,
			shared_issues: props.data.shared_issues,
			searchResults: prevResults,
			exactMatch: prevExactMatch
		}
	}
	submit = async (evt) => {

		evt.preventDefault();

		const lastQuery = this.state.query;

		try {
			
			const response = await this.props.searchUsers(this.state.query)

			this.setState({
				lastQuery: lastQuery,
				query: "",
				searchResults: response.similar_matches,
				exactMatch: response.exact_match
			})

		} catch(err) {
			console.log(err);
			return err
		}

	}
	newCollaborator = (id, username) => {
		console.log("Add collaborator: ", username)
		console.log("Collaborator Id: ", id)

		this.props.addCollab(id, username)
	}
	handleChange = (evt) => {
		this.setState({
			query: evt.currentTarget.value 
		})
	}
	render(){

		let results = null

		if (this.state.searchResults && this.state.searchResults.length > 0) {
			results = this.state.searchResults.map( (result, i) => {
				
				// should user be able to add collaborator? 
				let isDisabled = false;

				if (this.state.user.id === result.id) {
					isDisabled = true
				} else {
					this.state.collaborations.forEach((collaboration)=>{
						if (collaboration.user_id === result.id || collaboration.collaborator_id === result.id) {
							isDisabled = true 
						}
					})
				}

				return (
					<li key={i}> 
						<button 
							onClick={this.newCollaborator.bind(
								null, 
								result.id, 
								result.username
							)}
							disabled={isDisabled}
						>
							Add 
						</button>
						&nbsp; &nbsp; {result.username}
						<br />
					</li>
				)
			}) 
		}

		let exactMatchIsDisabled = false;

		if (this.state.exactMatch) {
			if (this.state.user.id === this.state.exactMatch.id) {
				exactMatchIsDisabled = true;
			} else {
				this.state.collaborations.forEach((collaboration)=>{
					if (collaboration.user_id === this.state.exactMatch.id || collaboration.collaborator_id === this.state.exactMatch.id) {
						exactMatchIsDisabled = true;
					}
				})
			}
		}

		return (
			<StyledDiv>
				<br />
				<br />
				<h2> Find Collaborators By Username </h2>
				<br />
				<br />
				<form>
					<input 
						type="text"
						name="query"
						value={this.state.query}
						onChange={this.handleChange}
					/>
					<br />
					<button onClick={this.submit}> Search </button>
				</form>	
				<br />				
				{ this.state.lastQuery ? 
					<div> 
						<h4>Last Search Query: </h4>
						<p> {this.state.lastQuery} </p>
					</div>
				: null }
				<br />
				{ this.state.exactMatch ? 
					<div> 
						<hr />
						<h4>Exact Match: </h4>
						<button 
							onClick={this.newCollaborator.bind(
								null, 
								this.state.exactMatch.id, 
								this.state.exactMatch.username
							)}
							disabled={exactMatchIsDisabled}
						> 
							Add  
						</button> 
						<span> &nbsp; &nbsp; {this.state.exactMatch.username} </span>
					</div>
				: null }

				<hr />
				<br />
				<h4> Results: </h4>
				
				{ this.state.searchResults && this.state.searchResults.length > 0 ? 
					<div>
						<ul>
							{ results }
						</ul>
					</div> 
				: 
					<div>
						<p> No results from search query </p>
					</div> 
				}

			</StyledDiv>
		)
	}
}

export default SearchUsers;
