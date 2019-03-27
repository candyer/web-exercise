function sortByName(items, direction) {
	const multiplier = direction === 'ASC' ? 1 : -1;

	items.sort((a, b) => {
		const aName = (
			typeof a.name === 'string' ?
				a.name.toLowerCase() :
				a.name
		);
		const bName = (
			typeof b.name === 'string' ?
				b.name.toLowerCase() :
				b.name
		);

		if (aName > bName) return 1 * multiplier;
		else if (bName > aName) return -1 * multiplier;
		return 0;
	});
	return items;
}

export default sortByName;
