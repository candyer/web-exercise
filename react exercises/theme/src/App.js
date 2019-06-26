import React, { Component } from 'react';
import './App.css';

const ThemeContext = React.createContext();

class ThemeProvider extends Component {
	state = {
		theme: 'light',
	}

	render() {
		return (
			<ThemeContext.Provider value={{
				state: this.state, 
				themeToggle: () => this.setState({
					theme: this.state.theme === 'light' ? 'dark' : 'light',
				})
			}}>
				{this.props.children}
			</ThemeContext.Provider>
		)
	}
}

class ThemedButton extends React.Component {
	render() {
		return (
			<div>
				<ThemeContext.Consumer>
					{(context) => (
						<button 
							className={context.state.theme}
							onClick={context.themeToggle}>						
							{context.state.theme} Mode
						</button>
					)}
				</ThemeContext.Consumer>
			</div>
		)	
	}			
}

function Toolbar(props) {
	return (
		<ThemedButton />
	);
}


class App extends Component {
	render() {
		return (
			<ThemeProvider >
				<ThemeContext.Consumer>
					{(context) => 
						<div className={`theme ${context.state.theme}`}>
							<Toolbar />
							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
								Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
								Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
								Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
							</p>
							
						</div>}
				</ThemeContext.Consumer>
			</ThemeProvider >
		);	
	}
}

export default App;