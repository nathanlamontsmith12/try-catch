import React from 'react';
// import styled from 'styled-components';

// Components: 
import NewIssue from './new';
import ViewIssue from './view';
import EditIssue from './edit';


function IssueDisplay (props) {
	return (
		<div>
			{ props.modeData.action === "new" ? 
				<NewIssue 
					modeData={props.modeData}
					userData={props.userData}
					newItem={props.newItem}
				/> 
			: null }
			{ props.modeData.action === "view" ? 
				<ViewIssue 
					modeData={props.modeData}
					userData={props.userData}
					alterModal={props.alterModal}
				/> 
			: null }
			{ props.modeData.action === "edit" ? 
				<EditIssue 
					modeData={props.modeData}
					userData={props.userData}
					editItem={props.editItem}
				/> 
			: null }
		</div>
	)
}

export default IssueDisplay;