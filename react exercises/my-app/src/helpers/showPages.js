
function showPages(currPage, pageNeighbours, totalPages) {
	currPage = parseInt(currPage)
	let visiblePages = []
	if (currPage - pageNeighbours > 1) {
		visiblePages.push(1)
	}

	let start = Math.max(1, currPage - pageNeighbours);
	let end = Math.min(currPage + pageNeighbours, totalPages);

	if (start > 2) {
		visiblePages.push(-1)
	}

	for (var i=start; i<end + 1; i++) {
		visiblePages.push(i)	
	}	

	if (end < totalPages - 1) {
		visiblePages.push(-1)
	}

	if (currPage + pageNeighbours < totalPages) {
		visiblePages.push(totalPages)
	} 

	return visiblePages
}

export default showPages;