function sortByDate(items, direction) {
	const multiplier = direction === 'ASC' ? 1 : -1;

	items.sort((a, b) => {
		if (a.date > b.date) return 1 * multiplier;
		else if (b.date > a.date) return -1 * multiplier;
		return 0;
	});
	return items;
}

export default sortByDate;
