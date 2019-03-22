import React from 'react'

function NameOrPlaceholder(props){
	if (typeof props.name === 'string' && props.name.length > 0) {
		return (
			<h2>Hello {props.name} !</h2>
		)
	}
	return (
		<h2> What is your name ? </h2>
	)
}


export default NameOrPlaceholder;