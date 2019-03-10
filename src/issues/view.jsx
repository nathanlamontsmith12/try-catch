import React from 'react';

function ViewIssue (props) {
	return(
		<div>
			<h1> VIEW ISSUE </h1>

			<span 
				className="fakeLink" 
				style={{display: "block"}}
				onClick={props.alterModal.bind(
					null, 
					({
						action: "edit", 
						display: props.modeData.display, 
						owner_id: props.modeData.display.owner_id,
						form: "issue"
					})
				)}
			> 
				Edit 
			</span>
			
			<h3> { props.modeData.display.name } </h3>
			<p> { props.modeData.display.description } </p>
			<button> Delete </button>
		</div>
	)
}

export default ViewIssue;


// PROPS: 

// alterModal   (function)

// modeData:
// action: "view"
// display: {id: 13, name: "blueberry", description: "aaaa", owner_id: 4}
// form: "issue"


// userData:
// bio: null
// email: "asdf@asdf.com"
// id: 4
// is_admin: false
// password_digest: "$2a$10$oSMO5pdzOzK3Cwp5YwnpruwLZnDI98wMtevZTzIcaM7c6NnMmAizC"
// reg_time: 1552168474662
// username: "guy"