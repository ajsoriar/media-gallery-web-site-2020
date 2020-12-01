//import React from 'react'
//import './index.css'
import { Component } from 'react'
import Icon from './../icon'

import React, { useState, useEffect } from 'react';

const Cursor = () => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(seconds => seconds + 1);
    }, 10);
    return () => clearInterval(interval);
  }, []);

  var cssString = {
    top: window.WEB_GLOBAL.cursor.y -22,
    //left: window.WEB_GLOBAL.cursor.x,
    left: window.WEB_GLOBAL.cursor.x < window.innerWidth/2?window.WEB_GLOBAL.cursor.x: window.WEB_GLOBAL.cursor.x - 45,
    position: "fixed",
    transform: window.WEB_GLOBAL.cursor.x < window.innerWidth/2?"rotate(0deg)": "rotate(180deg)"
};

  return (
    <div className="cursor" style={cssString}>
        <Icon width={45} name={'cursor-arrow'} clickFunc={()=>{ this.getNextPictureNum(1); }}/>
    </div>
  );
};

export default Cursor;