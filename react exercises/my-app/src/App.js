import React from 'react';
import NameOrPlaceholder from './components/NameOrPlaceholder';
// import PreviousNameOrEmpty from './components/PreviousNameOrEmpty';
import PreviousNamesTable from './components/PreviousNamesTable';
import { withState, compose, withHandlers } from 'recompose';


class App extends React.Component {
	render(){
		return (
			<div>
				<NameOrPlaceholder name={this.props.name} />
				<input 
					type="text" 
					placeholder="name" 
					value={this.props.name} 
					onChange={this.props.onInputChange}
				/>
				<button onClick={this.props.onSaveClick}>Save</button>

				<PreviousNamesTable 
					onNameClick={this.props.onNameClick} 
					onNameDelete={this.props.onNameDelete} 
					onNameEdit={this.props.onNameEdit} 
					onNameCancel={this.props.onNameCancel} 
					onNameConfirm={this.props.onNameConfirm} 
					preNames={this.props.preNames} 
					onChange={this.props.onInputChange}
				/>
			</div>
		)

	}
}

let withName = withState('name', 'setName', '');
let withPreNames = withState('preNames', 'setPreNames', ['Alice', 'Dave', 'Elsa']);

const enhance = compose(
	withName,
	withPreNames,
	withHandlers({
		onInputChange: ({setName}) => (e) => setName(e.target.value),
		onSaveClick: ({setPreNames, preNames, name}) => () => {
			if (preNames.length < 10){
				preNames.unshift(name)
				setPreNames(preNames);
			} else {
				preNames.unshift(name)
				preNames.pop()
				setPreNames(preNames);
			}
		},
		onNameClick: ({setName}) => (e) => setName(e.target.name),
		onNameDelete: ({setPreNames, preNames}) => (e) => {
			preNames.splice(e.target.value, 1)
			setPreNames(preNames);
		},
		onNameEdit: ({setPreNames, preNames}) => (e) => {
			let className = `show${e.target.value}`
			let editClicked = document.querySelector('.' + className)

			let cancelConfirm = editClicked.querySelectorAll('.show')
			cancelConfirm[0].style.display = 'inline'
			cancelConfirm[1].style.display = 'inline'
			cancelConfirm[2].style.display = 'inline'

			let showATag = editClicked.querySelector('.showATag')
			showATag.style.display = 'none'
			
			let editDelete = editClicked.querySelectorAll('.hovershow')
			editDelete[0].style.display = 'none'
			editDelete[1].style.display = 'none'
		},
		onNameConfirm: ({setPreNames, preNames}) => (e) => {
			let className = `show${e.target.value}`
			let editClicked = document.querySelector('.' + className)
			
			let newName = editClicked.querySelector('.newName').value
			let index = e.target.value
			preNames.splice(index, 1, newName)
			setPreNames(preNames)

			let cancelConfirm = editClicked.querySelectorAll('.show')
			cancelConfirm[0].style.display = 'none'
			cancelConfirm[1].style.display = 'none'
			cancelConfirm[2].style.display = 'none'	

			let editDelete = editClicked.querySelectorAll('.hovershow')
			editDelete[0].style.display = 'inline'
			editDelete[1].style.display = 'inline'

			let showATag = editClicked.querySelector('.showATag')
			showATag.style.display = 'inline'
		},
		onNameCancel: ( ) => (e) =>{
			let className = `show${e.target.value}`
			let editClicked = document.querySelector('.' + className)
			let cancelConfirm = editClicked.querySelectorAll('.show')
			cancelConfirm[0].style.display = 'none'
			cancelConfirm[1].style.display = 'none'
			cancelConfirm[2].style.display = 'none'	

			let editDelete = editClicked.querySelectorAll('.hovershow')
			editDelete[0].style.display = 'inline'
			editDelete[1].style.display = 'inline'

			let showATag = editClicked.querySelector('.showATag')
			showATag.style.display = 'inline'
		}
	}))

export default enhance(App);

































// import React from 'react';
// import NameOrPlaceholder from './components/NameOrPlaceholder';
// // import PreviousNameOrEmpty from './components/PreviousNameOrEmpty';
// import PreviousNamesTable from './components/PreviousNamesTable';
// import { withState, compose, withHandlers } from 'recompose';


// class App extends React.Component {
// 	render(){
// 		return (
// 			<div>
// 				<NameOrPlaceholder name={this.props.name} />
// 				<input 
// 					type="text" 
// 					placeholder="name" 
// 					value={this.props.name} 
// 					onChange={this.props.onInputChange}
// 				/>
// 				<button onClick={this.props.onSaveClick}>Save</button>

// 				<PreviousNamesTable 
// 					onNameClick={this.props.onNameClick} 
// 					onNameDelete={this.props.onNameDelete} 
// 					onNameEdit={this.props.onNameEdit} 
// 					onNameCancel={this.props.onNameCancel} 
// 					onNameConfirm={this.props.onNameConfirm} 
// 					preNames={this.props.preNames} 
// 					onChange={this.props.onInputChange}
// 				/>
// 			</div>
// 		)

// 	}
// }

// let withName = withState('name', 'setName', '');
// let withPreNames = withState('preNames', 'setPreNames', ['Alice', 'Dave', 'Elsa']);

// const enhance = compose(
// 	withName,
// 	withPreNames,
// 	withHandlers({
// 		onInputChange: ({setName}) => (e) => setName(e.target.value),
// 		onSaveClick: ({setPreNames, preNames, name}) => () => {
// 			if (preNames.length < 10){
// 				preNames.unshift(name)
// 				setPreNames(preNames);
// 			} else {
// 				preNames.unshift(name)
// 				preNames.pop()
// 				setPreNames(preNames);
// 			}
// 		},
// 		onNameClick: ({setName}) => (e) => setName(e.target.name),
// 		onNameDelete: ({setPreNames, preNames}) => (e) => {
// 			preNames.splice(e.target.value, 1)
// 			setPreNames(preNames);
// 		},
// 		onNameEdit: ({setPreNames, preNames}) => (e) => {
// 			console.log(e.target.value);
// 			let className = `show${e.target.value}`
// 			let editClicked = document.querySelector('.' + className)
// 			console.log('table row:', editClicked);

// 			let cancelConfirm = editClicked.querySelectorAll('.show')
// 			console.log('show input/cancel/confirm:', cancelConfirm);
// 			cancelConfirm[0].style.display = 'inline'
// 			cancelConfirm[1].style.display = 'inline'
// 			cancelConfirm[2].style.display = 'inline'

// 			let showATag = editClicked.querySelector('.showATag')
// 			showATag.style.display = 'none'
			
// 			let editDelete = editClicked.querySelectorAll('.hovershow')
// 			console.log('hide edit/delete', editDelete);
// 			editDelete[0].style.display = 'none'
// 			editDelete[1].style.display = 'none'
// 		},
// 		onNameConfirm: ({setPreNames, preNames}) => (e) => {
// 			let className = `show${e.target.value}`
// 			let editClicked = document.querySelector('.' + className)
// 			let newName = editClicked.querySelector('.newName').value
// 			let index = e.target.value
// 			preNames.splice(index, 1, newName)
// 			setPreNames(preNames)
// 		},
// 		onNameCancel: ({}) => (e) =>{
// 			console.log('cancel button clicked:', e);
// 			let className = `show${e.target.value}`
// 			let editClicked = document.querySelector('.' + className)
// 			let cancelConfirm = editClicked.querySelectorAll('.show')
// 			cancelConfirm[0].style.display = 'none'
// 			cancelConfirm[1].style.display = 'none'
// 			cancelConfirm[2].style.display = 'none'	

// 			let editDelete = editClicked.querySelectorAll('.hovershow')
// 			editDelete[0].style.display = 'inline'
// 			editDelete[1].style.display = 'inline'

// 			let showATag = editClicked.querySelector('.showATag')
// 			showATag.style.display = 'inline'
// 		}
// 	}))

// export default enhance(App);





















