import React from 'react';
import './index.css';

const AndresCheckBox = ({ callback, checked, label }) => {
    return (
        <div className="styledCheckBox">
            <span>{label}</span>
            <label className="">
                <input type="checkbox" checked={checked} onChange={callback} ></input>
                <span className="" />
            </label>
        </div>
    )
}

export default AndresCheckBox;