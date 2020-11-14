import React from 'react'
import './index.css'

const EYE = "./images/eye.svg";
const ARROW_RIGHT = "./images/arrow-right.svg";
const ARROW_LEFT = "./images/arrow-left.svg";
const CURSOR_ARROW = "./images/cursor-arrow.svg";
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
        case "cursor-arrow":
            return CURSOR_ARROW;
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