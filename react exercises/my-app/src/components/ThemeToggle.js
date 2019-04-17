import React from 'react';
import { withState, compose, withHandlers } from 'recompose';
import applyTheme from '../helpers/themeSwitcher.js';

function ThemeToggle(props){
	const { theme, setTheme, onThemeChange} = props;
	return <button className='themeToggle' onClick={onThemeChange}>{theme} Mode On</button>
}

const withTheme = withState('theme', 'setTheme', 'Light')
export default compose(
	withTheme,
	withHandlers({
		onThemeChange:({theme, setTheme}) => () => {
			if (theme === 'Light') {				
				setTheme('Dark')
				applyTheme('Dark');
			} else {
				setTheme('Light')
				applyTheme('Light');
			}
		},
	}),
)(ThemeToggle);