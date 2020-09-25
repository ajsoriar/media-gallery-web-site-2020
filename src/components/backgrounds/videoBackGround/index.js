
import React from 'react'
import { Component } from 'react'

class VideoBackGround extends Component {

    constructor() {
        super();
        this.state = {
            browser_width: window.innerWidth, 
            screen_height: window.innerHeight,
            id: null
        }
    }

    checkPlay = () => {

        /*

        var id = this.state.id;

        var myCheck = function(){
            console.log("[VideoBackGround]: myCheck()");

            var media = document.getElementById( id );

            if ( media.paused ) {

                console.log("[VideoBackGround]: Media is paused! so ... play()");

                media.pause();
                media.play();
            } else {

                console.log("[VideoBackGround]:  media.paused: ", media.paused );
            }
        };

        console.log("[VideoBackGround]: setTimeout()");
        setTimeout( myCheck, 2000);

        */
    };

    updateVideoBackGroundDimensions = () => {
        //console.log("[VideoBackGround]: updateVideoBackGroundDimensions!");
        this.setState({ 
            browser_width: window.innerWidth, 
            screen_height: window.innerHeight
        }, this.checkPlay);
    };

    componentDidMount() {
        window.addEventListener('resize', this.updateVideoBackGroundDimensions);
        //console.log("[VideoBackGround]: componentDidMount!");

        var id = "videoBg-" + Date.now();
        this.setState({ 
            id: id
        }, this.checkPlay);
    }
    
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateVideoBackGroundDimensions);
    }

    render( props, state ) {

        //console.log("[VideoBackGround]: props:", this.props );

        var frameSize = {
            w: window.innerWidth,
            h: window.innerHeight
        }

        var cssFrameString = {
                                display: "inline-block",
                                width: frameSize.w +"px",
                                height: frameSize.h +"px",
                                top: 0,
                                left: 0,
                                overflow: "hidden",
                                position: "absolute"//,
                                //backgroundColor: "chartreuse"
                            };

        var iw = 1280, //frameSize.w, // TODO: Use real video dimensions here!
            ih = 720, //frameSize.h, // TODO: Use real video dimensions here!
            cw = null,
            ch = null,
            left = 0,
            top = 0;

        //console.log("[VideoBackGround]: iw / ih :", iw / ih );
        //console.log("[VideoBackGround]: frameSize.w  / frameSize.h :", frameSize.w / frameSize.h );

        if (iw > ih ) { // Landscape // TODO: Compare aspect ratio of the frame and the video instead of this!

            //console.log("[VideoBackGround]: -Landscape- !");
            cw = iw * frameSize.h / ih;
            ch = frameSize.h;
            left = ( frameSize.w / 2 - cw / 2);

            if ( frameSize.w / frameSize.h > iw / ih ) { // Needed Fix!!! Compare aspect ratio of the frame and the video!
                cw = frameSize.w;
                ch = ih * frameSize.w / iw; 
                left = 0;
                top = ( frameSize.h / 2 - ch / 2);;
            }
            
        } else if ( ih > iw ){ // Portrait

            //console.log("[VideoBackGround]: -Portrait- !");
            cw = frameSize.w;
            ch = ih * frameSize.w / iw;

        } else { // Squared

            //console.log("[VideoBackGround]: -Squared- !");
            ch = frameSize.h;
            cw = frameSize.w;
        }

        var cssContentString = {
                                display: 'inline-block',
                                width: cw +'px',
                                height: ch +'px',
                                top: top +'px',
                                left: left +'px',
                                overflow: 'hidden',
                                position: 'absolute'
                            };   

        return <div className="imageCropper" style={cssFrameString}>
            <video 
                key={this.props.src}
                id={this.state.id}
                style={cssContentString} 
                loop={this.props.loop} 
                autoPlay 
                muted="muted"
                onError={()=>{ console.log( "VIDEO ERROR! "); }}
                onLoad={()=>{ console.log( "VIDEO LOADED! "); }} 
            >
                <source src={this.props.src} />
                Your browser does not support the video tag.
            </video>
        </div>;
    }
}

export default VideoBackGround;