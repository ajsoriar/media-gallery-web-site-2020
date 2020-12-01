import React from 'react'
import './index.css'
import FadeInAndOut from './fadeInAndOut'

const Fade = () => {

    if ( !window.WEB_CONFIG.fadeInAndOut ) return null

    var ir = window.WEB_CONFIG.fadeInAndOut.fadeInColor.r;
    var ig = window.WEB_CONFIG.fadeInAndOut.fadeInColor.g;
    var ib = window.WEB_CONFIG.fadeInAndOut.fadeInColor.b;
    var ih = window.WEB_CONFIG.fadeInAndOut.fadeInHeight;

    var or = window.WEB_CONFIG.fadeInAndOut.fadeOutColor.r;
    var og = window.WEB_CONFIG.fadeInAndOut.fadeOutColor.g;
    var ob = window.WEB_CONFIG.fadeInAndOut.fadeOutColor.b;
    var oh = window.WEB_CONFIG.fadeInAndOut.fadeOutHeight;

    return <>
        { window.WEB_CONFIG.fadeInAndOut.showFadeIn && <FadeInAndOut r={ir} g={ig} b={ib} fade={'IN'} h={ih}/> }
        { window.WEB_CONFIG.fadeInAndOut.showFadeOut && <FadeInAndOut r={or} g={og} b={ob} fade={'OUT'} h={oh}/> }
    </>
}

export default Fade;