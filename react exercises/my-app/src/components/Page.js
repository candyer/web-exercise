import React from 'react';

function Page(props){
	const { pageNumber, currPage, onPageChange} = props;
	if (pageNumber + 1 == currPage) {
		return( 
			<li className='currpage'>
				<a href="javascript:;" onClick={onPageChange}>
					{`${props.pageNumber + 1}`}
				</a>
			</li>
		)
	} else {
		return (
			<li>
				<a href="javascript:;" onClick={onPageChange}>
					{`${props.pageNumber + 1}`}
				</a>
			</li>
		)
	}
	
}
export default Page