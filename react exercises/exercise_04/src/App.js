import React from 'react';
import NameOrPlaceholder from './components/NameOrPlaceholder';
import PreviousNameOrEmpty from './components/PreviousNameOrEmpty';
import { withState, compose, withHandlers } from 'recompose';


class App extends React.Component {
    render(){
        // console.log(this.props)
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
                <PreviousNameOrEmpty preName={this.props.preName} />
            </div>
        )

    }
}


const withName = withState('name', 'setName', '');
const withPreName = withState('preName', 'setPreName', '');

const enhance = compose(
    withName,
    withPreName,
    withHandlers({
        onInputChange: ({setName}) => (e) => setName(e.target.value),
        onSaveClick: ({name, setName, setPreName}) => () => {
            setPreName(name);
            setName('');
        },

    })
)

export default enhance(App);
