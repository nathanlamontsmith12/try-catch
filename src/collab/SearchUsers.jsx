import React, { Component } from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div `
	margin-left: 20px;
`

class SearchUsers extends Component {
	constructor(props){
		super();
		this.state = {
			query: "",
			lastQuery: "",
			user: props.data.user,
			issues: props.data.issues,
			collaborations: props.data.collaborations,
			shared_issues: props.data.shared_issues,
			searchResults: [],
			exactMatch: null
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
	newCollaborator = async (id, username) => {
		try {

			await this.props.addCollab(id, username);

			this.update()
		} catch(err) {
			console.log(err)
			return err 
		}
	}
	handleChange = (evt) => {
		this.setState({
			query: evt.currentTarget.value 
		})
	}
	async shouldComponentUpdate(nextProps, nextState){
		
		if (this.state.collaborations !== nextProps.data.collaborations) {
			this.update()
		}

		return true
	}
	update = async () => {
		try {
			const newData = await this.props.getUser(this.state.user.id)

			this.setState({
				collaborations: newData.collaborations
			})
		} catch(err) {
			console.log(err)
			return err
		}		
	}
	async componentDidMount(){
		try {

			await this.update();
		
		} catch(err) {
			console.log(err)
			return err
		}
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
					</div>
				: null}

				{ this.state.exactMatch && !exactMatchIsDisabled ? 
					<button 
						onClick={this.newCollaborator.bind(
							null, 
							this.state.exactMatch.id, 
							this.state.exactMatch.username
						)}> 
						Add  
					</button> 
				: null }

				{ this.state.exactMatch ? <span> &nbsp; &nbsp; {this.state.exactMatch.username} </span> : null }

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
