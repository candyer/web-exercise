import { withPropsOnChange } from 'recompose';

const didEditRow = (props, nextProps) => {
	// There is no way for us to see if user has changed the name since we changed the value
	// by reference and we don't have access to the previous name.
	// So let's just say if user edit a row we consider it as a change.
	return (props.editingIndex !== -1 && nextProps.editingIndex === -1);
};

export default withPropsOnChange((props, nextProps) => {
	return (
		props.currPage !== nextProps.currPage ||
		props.itemsPerPage !== nextProps.itemsPerPage ||
		props.totalItemsCount !== nextProps.totalItemsCount ||
		props.sort !== nextProps.sort ||
		didEditRow(props, nextProps) === true
	);
}, (props) => {
	const { currPage, itemsPerPage, totalItemsCount } = props;
	const start = (currPage - 1) * itemsPerPage;
	const end = Math.min(currPage * itemsPerPage, totalItemsCount);

	return {
		currentPageItems: props.preNames.slice(start, end),
	};
});
