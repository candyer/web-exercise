import React from 'react';
import Page from './Page';
import { compose, withHandlers, withPropsOnChange } from 'recompose';
import showPages from '../helpers/showPages';

function Pagination(props){
	const {totalItemsCount, itemsPerPage, currPage, onFirstPage, onPreviousPage, onNextPage, onLastPage} = props
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
	const {totalPages, currPage, onPageChange, pageNeighbours, pages} = props

	return pages.map((pageNumber, index) => {
		if (pageNumber === -1) {
			return <li key={index}>...</li>
		} else {
			return <Page
					key={index}
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
	withPropsOnChange((props, nextProps) => (
		props.totalPages !== nextProps.totalPages ||
		props.currPage !== nextProps.currPage ||
		props.pageNeighbours !== nextProps.pageNeighbours
	), (props) => {
		const {totalPages, currPage, pageNeighbours} = props;

		return {
			pages: showPages(currPage, pageNeighbours, totalPages),
		};
	}),
	withHandlers({
		onFirstPage: ({onPageChange}) => () => {
			onPageChange(1)},
		onPreviousPage: ({currPage, onPageChange}) => () => {
			currPage = Math.max(1, currPage - 1)
			onPageChange(currPage)},
		onNextPage: ({currPage, totalPages, onPageChange}) => () => {
			currPage = Math.min(parseInt(currPage) + 1, totalPages)
			onPageChange(currPage)},
		onLastPage: ({totalPages, onPageChange}) => () => {
			onPageChange(totalPages)},
	}),
)(Pagination);
