import React from 'react';
import { Component } from 'react';
import './index.css'

class Aboutinfo extends Component {

    state = {
        show: false,
        showLeft: true,
        showRight: true
    }

    aboutinfoOnClick = () => {
        this.setState( prev => ({
            show: !prev.show
        }));
    }

    updateDimensions = () => {
        //console.log("[Aboutinfo] updateDimensions!");
        var v = document.getElementById("aboutInfoVideo");
        var f = document.getElementById("pictureFrame");
        var b = document.getElementById("informationSection");
        var v_h = v.offsetHeight;
        var b_h = b.offsetHeight;
        var w_h = window.innerHeight;
        var new_vf_h = w_h - b_h -200;
        var calc = 0;
        f.style.height = new_vf_h + "px";
        if( v_h > new_vf_h )calc = -(v_h - new_vf_h) / 2; 
        v.style.top = calc + "px";
    };

    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions);
    }
    
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
    }

    render () {

        var state = this.state;

        if (!state.show) {
            
            document.body.classList.remove("overflow-y-hidden"); 

            return (
                <div className="aboutInfoSmall">
                    <div className="authorName" onClick={this.aboutinfoOnClick}>
                        {state.showLeft && <div className="left ">JOSÉ</div>}
                        {state.showRight && <div className="right ">SORIA</div>}
                    </div>
                </div>
            );            
        }

        document.body.classList.add("overflow-y-hidden");

        var videoSrc = 'https:/www.subidote.com/video/sources/demo2/mp4/videobg-1280x720.mp4';
        
        return  <>
            state.show && <div className="aboutInfo" onClick={this.aboutinfoOnClick}>
                <div className="aboutInfoContainer">
                    <div className="authorName">
                        <div className="left bigFont">JOSÉ</div>
                        <div className="right bigFont">SORIA</div>
                    </div>

                    <div id="pictureFrame" className="pictureFrame">
                        <video id="aboutInfoVideo" loop autoPlay onPlay={()=>{
                            this.updateDimensions();
                        }}>
                            <source src={videoSrc} />
                            Your browser does not support the video tag.
                        </video>
                    </div>

                    <div id="informationSection" className="informationSection">
                        <div className="informationGroup">
                            <div className="title">EUROPE</div> 
                            <p>
                                Hello!<br/>
                                We are here<br/>
                                to stay.<br/>
                                temazo@subidote.com<br/>
                                maximo@subidote.com<br/>
                                +44 000 00 00 00<br/>
                            </p>
                        </div>
                        <div className="informationGroup blur">
                            <div className="title">INSTAGRAM</div> 
                            <p>
                                Hi!<br/>
                                We are here<br/>
                                to play.<br/>
                                #maximosubidote<br/>
                            </p>
                        </div>
                        <div className="informationGroup ">
                            <div className="title">The World</div> 
                            <p>
                                Hello!<br/>
                                Do it harder, better, faster and stronger!<br/>
                                maximo@subidote.com<br/>
                                +34 000 00 00 00<br/>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    }
}

export default Aboutinfo;