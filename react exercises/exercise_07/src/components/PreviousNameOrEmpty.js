import React from 'react'

function PreviousNameOrEmpty(props){
    if (typeof props.preName === 'string' && props.preName.length > 0) {
        return (
            <h2>Previous Name: {props.preName} !</h2>
        )
    }
    return null
}


export default PreviousNameOrEmpty;