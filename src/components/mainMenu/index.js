import React from 'react';
import { Component } from 'react';
import './index.css';
import Icon from './../icon';

class MainMenu extends Component {

    constructor() {
        super();
        //this.updateDimensions = this.updateDimensions.bind(this);
    }

    state = {
        showMenu: false
    }

    closeMenu() {
        this.setState({ 
            showMenu: false
        });
    };

    openCloseMenu() {
        this.setState({ 
            showMenu: !this.state.showMenu
        });
    };

    render () {

        //var { maxContainerWidth, maxNumOfColumns, minColumWidth, vMargin, sideMargin, hmargin, browser_width, browser_height, galleryTop} = this.state;
        
        var showBrandLogo = false;
        const mnuOp = (item) => <li 
            key={item.id} 
            onClick={ 
                () => {
                    this.props.onClickFunction(item);
                     this.closeMenu();
                }
            } 
            
            id={item.id} 
            className="menu-item">{item.label}</li>
    
        const topLiItems = window.WEB_CONFIG.MAIN_MENU.topOptions.map((item) => mnuOp(item));
        const bottomItems = window.WEB_CONFIG.MAIN_MENU.bottomOptions.map((item) => mnuOp(item));
    
        return <div className="app-menu-container">
            { showBrandLogo && <div className="brand-logo"></div> }
            <ul className="app-horizontal-menu top-menu">
                {topLiItems}
            </ul>
            <ul className="app-horizontal-menu bottom-menu">
                {bottomItems}
            </ul>
            <ul className="app-hamburger-menu top-menu">

                { this.state.showMenu && <div className="hamburger-content">
                    <div className="btn close" onClick={
                        ()=>{ 
                            console.log("close!");
                            this.openCloseMenu();
                        }
                    }><Icon width={70} name={'btn-close'} clickFunc={()=>{}}/></div>
                    {topLiItems}
                    {bottomItems}
                </div>}

                <div className="hamburger-icon">
                    <Icon width={70} name={'btn-hamburger'} clickFunc={
                        ()=>{ 
                            console.log("mnu!");
                            this.openCloseMenu();
                        }
                    }/>
                    <div className="hamburger-text">Menu</div>
                </div>

            </ul>
        </div>
    }
}

export default MainMenu;