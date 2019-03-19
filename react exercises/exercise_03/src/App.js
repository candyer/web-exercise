
import React, { Component } from 'react';
import NameOrPlaceholder from './components/NameOrPlaceholder';
import { withState } from 'recompose';

class App extends React.Component {
    render(){
        return (
            <div>
                <NameOrPlaceholder name={this.props.name} />
                <input 
                    type="text" 
                    placeholder="name" 
                    value={this.props.name} 
                    onChange={e => this.props.setName(e.target.value)}
                />
            </div>
        )
    }
}

const withName = withState('name', 'setName', '');

export default withName(App);




