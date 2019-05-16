// function applyTheme(theme) {
// 	if (theme === 'Dark') {
// 		document.body.classList.add('darkMode')
// 		document.body.classList.remove('lightMode')

// 		document.querySelectorAll('.sortable-column').forEach(icon => {
// 			icon.classList.add('dark')
// 		})		

// 	} else {
// 		document.body.classList.add('lightMode')
// 		document.body.classList.remove('darkMode')

// 		document.querySelectorAll('.sortable-column').forEach(icon => {
// 			icon.classList.remove('dark')
// 		})
// 	}	
// }

// export default applyTheme;




// function applyTheme(theme) {
// 	if (theme === 'Dark') {
// 		document.body.classList.add('darkMode')
// 		document.body.classList.remove('lightMode')

// 		document.querySelectorAll('.sortable-column').forEach(icon => {
// 			icon.classList.add('dark')
// 		})	
// 		// console.log('---------------------', document.querySelectorAll('button'))
// 		document.querySelectorAll('button').forEach(btn => {
// 			btn.classList.add('dark')
// 			// btn.style.background = '#666'
// 			// btn.style.color = '#ccc'

// 		})	

// 		// document.querySelectorAll('input').forEach(btn => {
// 		// 	btn.classList.add('dark')
// 		// })	



// 	} else {
// 		document.body.classList.add('lightMode')
// 		document.body.classList.remove('darkMode')

// 		document.querySelectorAll('.sortable-column').forEach(icon => {
// 			icon.classList.remove('dark')
// 		})

// 		document.querySelectorAll('button').forEach(btn => {
// 			btn.classList.remove('dark')
// 			// btn.style.background = '#fff'
// 			// btn.style.color = '#000'
// 		})	
		
// 		// document.querySelectorAll('input').forEach(btn => {
// 		// 	btn.classList.remove('dark')
// 		// })	
// 	}	


// }

// export default applyTheme;


function applyTheme(theme) {
	if (theme === 'Dark') {
		document.body.classList.add('darkMode')
		document.body.classList.remove('lightMode')

		document.querySelectorAll('.sortable-column').forEach(icon => {
			icon.classList.add('dark')
		})	
		// console.log('---------------------', document.querySelectorAll('button'))
		document.querySelectorAll('button').forEach(btn => {
			btn.classList.add('dark')
			// btn.style.background = '#666'
			// btn.style.color = '#ccc'

		})	

		// document.querySelectorAll('input').forEach(btn => {
		// 	btn.classList.add('dark')
		// })	



	} else {
		document.body.classList.add('lightMode')
		document.body.classList.remove('darkMode')

		document.querySelectorAll('.sortable-column').forEach(icon => {
			icon.classList.remove('dark')
		})

		document.querySelectorAll('button').forEach(btn => {
			btn.classList.remove('dark')
			// btn.style.background = '#fff'
			// btn.style.color = '#000'
		})	
		
		// document.querySelectorAll('input').forEach(btn => {
		// 	btn.classList.remove('dark')
		// })	
	}	


}

export default applyTheme;




