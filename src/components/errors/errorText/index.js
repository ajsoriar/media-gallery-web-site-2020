import React from 'react'
import { Component } from 'react'

class ErrorText extends Component {
    render(props) {
        return ( props && props.text ? <div class="errorText">{props.text}</div>: <div class="errorText">Some kind of error!</div> );
    }
}

export default ErrorText;