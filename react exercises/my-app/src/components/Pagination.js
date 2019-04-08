import React from 'react';
import Page from './Page';
import { compose, withHandlers } from 'recompose';
import showPages from '../helpers/showPages';
function Pagination(props){
	const {totalItemsCount, totalPages, itemsPerPage, currPage, pageNeighbours, onFirstPage, onPreviousPage, onNextPage, onLastPage} = props
	return (
		<div>
			<p>Entries {1 + (currPage - 1) * itemsPerPage}-{Math.min(currPage * itemsPerPage, totalItemsCount)} of {totalItemsCount}</p>
			<ul className='page'>
				<li><a href="javascript:;" onClick={onFirstPage}>«</a></li>
				<li><a href="javascript:;" onClick={onPreviousPage}>＜</a></li>
				{renderPages(props)}
				<li><a href="javascript:;" onClick={onNextPage}>＞</a></li>
				<li><a href="javascript:;" onClick={onLastPage}>»</a></li>
			</ul>
		</div>
	)

}

function renderPages(props){
	const {totalPages, currPage, onPageChange, pageNeighbours} = props
	let pages = showPages(currPage, pageNeighbours, totalPages)
	console.log('currpage', currPage, 'totalPages', totalPages, pages)
	return pages.map((pageNumber, index) => {
		if (pageNumber === -1) {
			return <li key={index}>...</li>
		} else {
		return <Page 
				key={`${index}`}
				pageNumber={pageNumber}
				currPage={currPage}
				pageNeighbours={pageNeighbours}
				totalPages={totalPages}
				onPageChange={onPageChange}
				/>
		}
	})
}

export default compose(
	withHandlers({
		onFirstPage: ({setCurPage}) => () => {
			setCurPage(1)},
		onPreviousPage: ({currPage, setCurPage}) => () => {
			currPage = Math.max(1, currPage - 1)
			setCurPage(currPage)},
		onNextPage: ({currPage, totalPages, setCurPage}) => () => {
			currPage = Math.min(parseInt(currPage) + 1, totalPages)
			setCurPage(currPage)},
		onLastPage: ({totalPages, setCurPage}) => () => {
			setCurPage(totalPages)},
	}),
)(Pagination);
