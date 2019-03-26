
function formatDate(timestamp) {
	const dateTime = new Date(timestamp).toLocaleString()	
	return dateTime
}	

export default formatDate;