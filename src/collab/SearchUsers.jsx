import React, { Component } from 'react';

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
			data: props.data,
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
				return (
					<li key={i}> 
						{result.username} 
						<button onClick={this.newCollaborator.bind(
							null, 
							result.id, 
							result.username
						)}>
							Add To Collaborators
						</button>
					</li>
				)
			}) 
		}

		return (
			<div>
				<h2> Find Collaborators By Username </h2>
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
				
				{ this.state.lastQuery ? 
					<div> 
						<h4>Last Search Query: </h4>
						<p> {this.state.lastQuery} </p>
					</div>
				: null }
				
				{ this.state.exactMatch ? 
					<div> 
						<hr />
						<h4>Exact Match: </h4>
						<p> {this.state.exactMatch.username} </p>
						<button 
							onClick={this.newCollaborator.bind(
								null, 
								this.state.exactMatch.id, 
								this.state.exactMatch.username
							)}
						> 
							Add To Collaborators 
						</button> 
					</div>
				: null }

				<hr />
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

			</div>
		)
	}
}

export default SearchUsers;

// { this.state.view === "search" ? 
// 	<SearchUsers 
// 		data={this.state} 
// 		searchUsers={this.searchUsers} 
// 		addCollab={this.addCollab} 
// 	/> 

// view: initView, // "search" or "manage"
// user: props.userData,
// issues: props.issues,
// collaborations: props.collaborations,
// shared_issues: props.shared_issues,
// searchResults: [],
// exactMatch: null,
// message: ""