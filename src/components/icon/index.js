import React from 'react'
import './index.css'

// import EYE from "./../../assets/images/eye.svg";
// import ARROW_RIGHT from "./../../assets/images/arrow-right.svg";
// import ARROW_LEFT from "./../../assets/images/arrow-left.svg";
// import BTN_CLOSE from "./../../assets/images/btn-close.svg";
// import BTN_HAMBURGER from "./../../assets/images/hamburger.svg";
// import CLOSEWINDOW from "./../../assets/images/btn-close-debug-black.svg";
// import VIDEO_ITEM from "./../../assets/video-item-play.svg";
// import NO_PICTURE from "./../../assets/images/image.svg";
// import FOLDER_ITEM from "./../../assets/images/folders/blue-folder-icon-256x256.svg";
// import FOLDER_ICON from "./../../assets/images/folders/folder-icon_black-border_256x256.svg";

const EYE = "./images/eye.svg";
const ARROW_RIGHT = "./images/arrow-right.svg";
const ARROW_LEFT = "./images/arrow-left.svg";
const BTN_CLOSE = "./images/btn-close.svg";
const BTN_CLOSE_BLACK = "./images/btn-close-black.svg";
const BTN_HAMBURGER = "./images/hamburger.svg";
const CLOSEWINDOW = "./images/btn-close-debug-black.svg";
const VIDEO_ITEM = "./images/video-item-play.svg";
const NO_PICTURE = "./images/image.svg";
const FOLDER_ITEM = "./images/folders/blue-folder-icon-256x256.svg";
const FOLDER_ICON = "./images/folders/folder-icon_black-border_256x256.svg";

const loadIcon2 = (name) => {
    switch (name) {
        case "eye":
            return EYE;
            break;
        case "arrow-right":
            return ARROW_RIGHT;
            break;
        case "arrow-left":
            return ARROW_LEFT;
            break;
        case "btn-close":
            return BTN_CLOSE;
            break;
        case "btn-close-black":
            return BTN_CLOSE_BLACK;
            break;  
        case "btn-hamburger":
            return BTN_HAMBURGER;
            break;
        case "closeWindow":
            return CLOSEWINDOW;
            break;
        case "video-item":
            return VIDEO_ITEM;
            break;
        case "no-picture":
            return NO_PICTURE;
            break;
        case "folder-item":
            return FOLDER_ITEM;
            break;
        case "folder-icon":
            return FOLDER_ICON;
            break;
    }
}

const Icon = ({width, name, clickFunc, center, margin }) => {

    var jsonCss = {
        "width": (width+'px') || '32px',
        "height": (width+'px') || '32px',
        "backgroundSize": (width+'px') || '32px',
        "top": center ? -width/2+'px': 0,
        "left": center ? -width/2+'px': 0,
        "margin": margin ? margin : 0,
        backgroundImage: 'url("'+ loadIcon2(name) +'")'
    }

    return <div 
        onClick={clickFunc} 
        className={'ui-ico '+ name} 
        style={jsonCss}/>
}

export default Icon;