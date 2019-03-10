import React from 'react';
// import styled from 'styled-components';

// Components: 
import EditProfile from './edit';

function ProfileDisplay (props) {
	return (
		<div>
			{ props.modeData.action === "edit" ? 
				<EditProfile 
					modeData={props.modeData}
					userData={props.userData}
					editItem={props.editItem}
					deleteItem={props.deleteItem}
				/> 
			: null }
		</div>
	)
}

export default ProfileDisplay;