import React from 'react';
import './index.css';
import { Component } from 'react';
import Icon from '../icon';
import Spinner from './../spinner';

class IframeContent extends Component {

    state = {
        loading: true
    }

    hideSpinner = () => {
        this.setState({
          loading: false
        });
    };

    render() {
        console.log("[IframeContent] RENDER, this.props:", this.props );
        const {closeFunction, configParams} = this.props;
        return <div className="iframeViewer">
                <div className="btn close" onClick={ () => closeFunction(null) || ( () => { console.log("[] Close!")} ) }>
                    <Icon width={70} name={'btn-close'} clickFunc={()=>{}}/>
                </div>
                <div className="title">{configParams.title}</div>    
                <iframe 
                    style={{
                        display: this.state.loading? 'none': 'block'
                    }}
                    src={ !configParams.url? './static/empty.html': configParams.url } 
                    className="contentIframe" 
                    title="Iframe Example"
                    onLoad={this.hideSpinner}
                    frameBorder="0"
                    marginHeight="0"
                    marginWidth="0"
                />
                {this.state.loading ? ( <Spinner/>) : null}
        </div>;
    }
}

export default IframeContent;