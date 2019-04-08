import React from 'react';

function Page(props){
	const { pageNumber, currPage, onPageChange, totalPages} = props;
	if (pageNumber == currPage) {
		return( 
			<li className='active'>
				<a href="javascript:;" onClick={onPageChange}>
					{pageNumber}
				</a>
			</li>
		)
	} else {
		return (
			<li>
				<a href="javascript:;" onClick={onPageChange}>
					{pageNumber}
				</a>
			</li>
		)
	}
	
}
export default Page