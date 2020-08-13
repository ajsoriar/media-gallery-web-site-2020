import React from 'react'
import { Component } from 'react'

class LoadingLayer extends Component { // includes crop functionality

    componentDidMount() {
        window.LL.show();
    }
    
    componentWillUnmount() {
        window.LL.hide();
    }

    render () {

        return null
    }
}

export default LoadingLayer;