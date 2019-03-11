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
`

class Collab extends Component {
	constructor(){
		super();
		this.state = {

		}
	}
	render(){
		console.log("COLLAB PROPS: ", this.props)
		return (
			<StyledDiv>
				<section>
					<h1> Collab </h1>
				</section>
			</StyledDiv>
		)
	}
}

/*
getUser: ƒ (_x2)
history: {length: 50, action: "PUSH", location: {…}, createHref: ƒ, push: ƒ, …}
location: {pathname: "/collab", search: "", hash: "", state: undefined, key: "gbj5as"}
match: {path: "/collab", url: "/collab", isExact: true, params: {…}}
modalOn: ƒ (data)
staticContext: undefined
userData:
bio: "Normal guy, here"
email: "asdf@asdf.com"
id: 4
is_admin: false
password_digest: "$2a$10$y5vmxBXasEj0UuGpc9SoeumksK.3EO0zNim3gp.lygiQStfbCbzpe"
reg_time: 1552168474662
username: "guy"


    modalOn = (data) => {
        this.setState({
            appModal: data
        })
    }

			modeData: props.data.appModal,
			userData: props.data.userData,
			issues: props.data.issues
*/


export default Collab;
