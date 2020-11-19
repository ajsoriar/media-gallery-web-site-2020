import React from 'react'
import { Component } from 'react'
import './index.css'
import BrandLogo from './../brandLogo'
import ImageBackGround from './../backgrounds/imageBackground'

class WelcomeScreen extends Component {

    state = {
        show: window.WEB_CONFIG.welcomeScreen.show,
        opacity: 1
    }

    updateDimensions = () => {
        var f = document.getElementById("pictureFrame");
        this.setState({})
    };

    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions);
        //setTimeout(this.closeSmoothly, window.WEB_CONFIG.welcomeScreen.miliseconds);
    }
    
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
    }

    close = () => {
        this.setState({show: false })
    }

    closeSmoothly = () => {
        if (this.state.opacity > 0 ) {
            this.setState({ opacity: this.state.opacity - 0.1 },()=>{
                setTimeout(this.closeSmoothly, 50);
            })
        } else {
            this.setState({ opacity: 0},()=>{
                this.close();
            })           
        }
    }

    onLoadCallback = () => { 
        setTimeout(this.closeSmoothly, window.WEB_CONFIG.welcomeScreen.miliseconds) 
    };

    render () {
        if ( !this.state.show ) return null
        var bgImage = this.props.welcomeBackground.background.image;
        return (
            <div className="welcomeScreen" onClick={()=>this.closeSmoothly()} style={{opacity: this.state.opacity, backgroundColor: window.WEB_CONFIG.welcomeScreen.background.color}} >
                <ImageBackGround src={bgImage.src} imageSize={{w: bgImage.size.w, h: bgImage.size.h}} onLoadCallback={this.onLoadCallback}></ImageBackGround>
                <div className="centerContent">
                    <BrandLogo source={window.WEB_CONFIG.welcomeScreen.brandLogo} />    
                </div>
            </div>
        )
    }
}

export default WelcomeScreen;