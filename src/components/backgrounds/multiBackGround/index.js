import React from 'react'
import './index.css'
import { Component, PureComponent } from 'react'
import VideoBackGround from '../videoBackGround';
import ImageBackGround from '../imageBackground';
import Utils from '../../../utils';

class MultiBackGround extends PureComponent {
//class MultiBackGround extends Component {

    render() {

        var gi = this.props.gi;

        //console.log("[MultiBackGround] render(), gi: ", gi );

        var SHOW_COLOR_BG = false,
            SHOW_GRADIENT_BG = false,
            SHOW_IMAGE_BG = false,
            SHOW_VIDEO_BG = false;

        if ( Utils.notEmpty(gi.background) ){
            if ( Utils.notEmpty(gi.background.video) ){
                SHOW_VIDEO_BG = true;
            } else if ( Utils.notEmpty(gi.background.image) ){
                SHOW_IMAGE_BG = true;
            } else if ( Utils.notEmpty(gi.background.gradient) ) {
                SHOW_GRADIENT_BG = true;
                var c1 = gi.background.gradient.color1;
                var c2 = gi.background.gradient.color2;
                var multiBackGroundGradientBgStyleObj = {};
                if (c1 && c2){
                    // multiBackGroundGradientBgStyleObj = ""+
                    //     "background: "+ c1 +";"+
                    //     "background: -moz-linear-gradient(top,  "+ c1 +" 0%, "+ c2 +" 100%);"+
                    //     "background: -webkit-linear-gradient(top,  "+ c1 +" 0%, "+ c2 +" 100%);"+
                    //     "background: linear-gradient(to bottom,  "+ c1 +" 0%, "+ c2 +" 100%);"+
                    //     "filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='"+ c1 +"', endColorstr='"+ c2 +"',GradientType=0 );";
                    // multiBackGroundGradientBgStyleObj = Utils.styleStringToObj( multiBackGroundGradientBgStyleObj );
                    multiBackGroundGradientBgStyleObj = {
                        "background": "linear-gradient(to bottom,  "+ c1 +" 0%, "+ c2 +" 100%)",
                        "filter": "progid:DXImageTransform.Microsoft.gradient( startColorstr='"+ c1 +"', endColorstr='"+ c2 +"',GradientType=0 )"
                    };
                }
            }

            /*
            else if ( Utils.notEmpty(gi.background.color) ){
                SHOW_COLOR_BG = true;
            }
            */

            SHOW_COLOR_BG = true; // Allways render bg color
        }

        //const frameStyleString = { };

        //console.log("[MultiBackGround] SHOW_COLOR_BG:", SHOW_COLOR_BG);
        //console.log("[MultiBackGround] SHOW_GRADIENT_BG:", SHOW_GRADIENT_BG);
        //console.log("[MultiBackGround] SHOW_IMAGE_BG:", SHOW_IMAGE_BG);
        //console.log("[MultiBackGround] SHOW_VIDEO_BG:", SHOW_VIDEO_BG);

        // var BG_color_jsonStyles = { 
        //     backgroundColor: window.WEB_CONFIG.viewer.reversedBgColor?Utils.invertColor( gi.background.color ):gi.background.color 
        // }

        var getPicBgCol = () => {
            var col = "#000";
            if ( gi.background && gi.background.color) {
                col = gi.background.color;
                if ( window.WEB_CONFIG.viewer.reversedBgColor ) {
                    col = tils.invertColor( gi.background.color )
                }                
            }
            return col
        };
        var BG_color_jsonStyles = { backgroundColor: getPicBgCol() }

        return <div className={'multiBackGround'}>
            { SHOW_COLOR_BG && <div id="multiBackGroundBgColor" className="multiBackGroundBgColor" style={ BG_color_jsonStyles }></div> } 

            { SHOW_GRADIENT_BG && <div id="multiBackGroundGradientBg" className="multiBackGroundGradientBg" style={multiBackGroundGradientBgStyleObj}></div> } 

            { SHOW_IMAGE_BG && <ImageBackGround src={gi.background.image.src} imageSize={{w: gi.background.image.size.w, h: gi.background.image.size.h}}></ImageBackGround> }

            { SHOW_VIDEO_BG && <VideoBackGround placeholder={null} src={gi.background.video.src} loop={true} realWidth={640} realHeight={480}></VideoBackGround> }
        </div>;
    }
}

export default MultiBackGround;
