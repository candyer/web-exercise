import React from 'react';
import Page from './Page';

function Pagination(props){
	const {totalItemsCount, itemsPerPage, currPage} = props
	return (
		<div>
			<p>Entries {1 + (currPage - 1) * itemsPerPage}-{Math.min(currPage * itemsPerPage, totalItemsCount)} of {totalItemsCount}</p>
			<ul className='page'>
				<li><a href="javascript:;">«</a></li>
				<li><a href="javascript:;">＜</a></li>
				{renderPages(props)}
				<li><a href="javascript:;">＞</a></li>
				<li><a href="javascript:;">»</a></li>
			</ul>
		</div>
	)

}

function renderPages(props){
	const {totalPages, currPage, onPageChange} = props
	return [...Array(totalPages).keys()].map(pageNumber => {
		return <Page 
				key={`${pageNumber}`}
				pageNumber={pageNumber}
				currPage={currPage}
				onPageChange={onPageChange}/>
	})
}
export default Pagination
