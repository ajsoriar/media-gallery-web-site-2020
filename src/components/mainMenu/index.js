import React from 'react';
import './index.css';
import ItemFooter from '../items/itemFooter';
const MainMenu = ( props )=>{

    var showBrandLogo = false;
    const mnuOp = (item) => <li onClick={ () => props.onClickFunction(item) || ( () => { console.log("[MainMenu] click!"); })} id={item.id} className="menu-item">{item.label}</li>
    const topLiItems = window.WEB_MENU.topOptions.map((item) => mnuOp(item));
    const bottomItems = window.WEB_MENU.bottomOptions.map((item) => mnuOp(item));

    return (
        <div className="app-menu-container">
            { showBrandLogo && <div className="brand-logo"></div> }
            <ul className="app-menu top-menu">
                {topLiItems}
            </ul>
            <ul className="app-menu bottom-menu">
                {bottomItems}
            </ul>
        </div>
    );
}

export default MainMenu;