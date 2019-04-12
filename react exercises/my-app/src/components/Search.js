import React from 'react'
import { withState, compose, withHandlers } from 'recompose';

function Search(props){
	const {preNames, setPreNames,onInputChange, copy, disable} = props
	return 	<div>
				<input
					type="text"
					placeholder="search by name"
					onChange={onInputChange}
					disabled={disable}
				/>
			</div>
}

const withKeyword = withState('keyword', 'setKeyword', '');
export default compose(
	withKeyword,
	withHandlers({
		onInputChange: ({keyword, setKeyword, preNames, setPreNames, copy}) => (e) => {

			keyword = e.target.value.trim().toLowerCase()
			if (keyword !== ''){
				setTimeout( function(){
					setPreNames(copy.filter(person => person.name.toLowerCase().includes(keyword)))
				}, 1000)
			} else {
				setTimeout( function(){
					setPreNames(copy)
				}, 200)				
			}
			}

	}),
)(Search);