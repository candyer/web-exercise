import React from 'react'
import { withState, compose, withHandlers, withProps } from 'recompose';

function Search(props){
	const { onInputChange, searchDisabled } = props
	return  <div>
		<input
			type="text"
			placeholder="search by name"
			onChange={onInputChange}
			disabled={searchDisabled}
		/>
	</div>
}

function debounce(callback, timeoutMs) {
	let timeoutId;

	return function () {
		if (timeoutId) {
			clearTimeout(timeoutId);
		}
		timeoutId = setTimeout(() => callback.apply(this, arguments), timeoutMs);
	};
}

export default compose(
	withProps({
		debounceSearch: debounce((props, keyword) => {
			const { setPreNames, copy } = props;
			console.log('filter names !', new Date());
			if (typeof keyword === 'string' && keyword.length > 0) {
				setPreNames(copy.filter(person => person.name.toLowerCase().includes(keyword)));
			} else {
				setPreNames(copy);
			}
		}, 500),
	}),
	withHandlers({
		onInputChange: (props) => (e) => {
			console.log(props)
			const keyword = e.target.value.trim().toLowerCase();
			props.debounceSearch(props, keyword);
		},
	}),
)(Search);






