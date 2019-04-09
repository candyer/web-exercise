// function showPages(currPage, pageNeighbours, totalPages) {
// 	let visiblePages = {}
// 	if (currPage - pageNeighbours <= 1) {
// 		visiblePages['begin'] = []
// 	} else {
// 		visiblePages['begin'] = [1]
// 	}

// 	let mid = []
// 	for (let i=Math.max(1, currPage - pageNeighbours); i <= Math.min(currPage + pageNeighbours, totalPages); i++){
// 		mid.push(i)
// 	}
// 	visiblePages['mid'] = mid

// 	if (currPage + pageNeighbours >= totalPages) {
// 		visiblePages['end'] = []
// 	} else {
// 		visiblePages['end'] = [10]
// 	}	
	
// 	return visiblePages
// }


function showPages(currPage, pageNeighbours, totalPages) {
	currPage = parseInt(currPage)
	let visiblePages = []
	if (currPage - pageNeighbours > 1) {
		visiblePages.push(1)
	}

	let start = Math.max(1, currPage - pageNeighbours);
	let end = Math.min(currPage + pageNeighbours, totalPages);
	console.log('debug start, end', start, end)
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
// console.log('helper test:', showPages(1, 1, 11))


export default showPages;