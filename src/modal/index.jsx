import React, { Component } from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div `
	position: absolute;
	height: 100%;
	width: 100%;
	z-index: 10;
	display: flex;
	align-items: center;
	justify-items: center;
	background: rgba(112, 128, 144, 0.7);

	div {
		margin: auto;
		height: 85%;
		width: 85%;
		z-index: 20;
		background: white;
	}

	div span {
		display: block;
		margin: 20px;
	}
`


class AppModal extends Component {
	constructor(props){
		super();
		this.state = {
			mode: props.mode 
		}
	}
	render(){

		console.log("MODAL STATE: ", this.state)

		return (
			<StyledDiv>
				<div>
					<span className="fakeLink" onClick={this.props.modalOff} >close</span>
					<h1> LIST / EDIT COMPONENT HERE </h1>
					<span className="fakeLink" onClick={this.props.modalOff} >close</span>
				</div>
			</StyledDiv>
		)
	}
}


export default AppModal;