import React from 'react'
import './index.css'
import { Component } from 'react'

class NoResultsMessage extends Component {

    render() {

        // const frameStyleString = {
        //     width: this.props.paneSize.w,
        //     height:  this.props.h,
        //     top: this.props.top,
        //     backgroundSize: 'cover',
        //     backgroundImage: 'url('+ window.WEB_CONFIG.brandLogo.src +')'
        // };

        //return <div className="noResultsMessage about-move-bg" style={frameStyleString} />
        
        return <div className="noResultsMessage">
            <div className="welcome">Oops!</div>
            <div className="noResultsMessage">Nothing to see here.</div>
        </div>;
    }
}

export default NoResultsMessage;