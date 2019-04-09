import React from 'react';
import { withHandlers } from 'recompose';

function Page(props){
	const { pageNumber, currPage, onPageClick } = props;
	if (pageNumber == currPage) {
		return(
			<li className='active'>
				<a href="javascript:;" onClick={onPageClick}>
					{pageNumber}
				</a>
			</li>
		)
	} else {
		return (
			<li>
				<a href="javascript:;" onClick={onPageClick}>
					{pageNumber}
				</a>
			</li>
		)
	}

}

export default withHandlers({
	onPageClick: (props) => () => {
		props.onPageChange(props.pageNumber);
	},
})(Page);
