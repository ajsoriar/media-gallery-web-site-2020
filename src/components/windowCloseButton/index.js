import React from 'react';
import './index.css';
import Icon from './../icon';

const WindowCloseButton = ({ clickFunc }) => <div className="windowCloseButton">
    <Icon width={24} name={'closeWindow'} clickFunc={clickFunc}></Icon>
</div>

export default WindowCloseButton;