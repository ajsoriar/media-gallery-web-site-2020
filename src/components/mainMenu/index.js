import React from 'react';
import { Component } from 'react';
import './index.css';
import Icon from './../icon';
import BrandLogo2 from './../../assets/images/brand/brand-logo.svg'

class MainMenu extends Component {

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
        var showBrandLogo = false;
        const mnuOp = (item) => <li 
            key={item.id} 
            onClick={() => {
                    this.props.clickFunc(item);
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
            <div className="app-hamburger-menu top-menu">

                { this.state.showMenu && <div className="hamburger-content">

                    <BrandLogo2 id="viewer-brand-logo" className="brandLogo" style={{fill: "#00f", top: window.WEB_CONFIG.brandLogo.top, left: "15px"}}></BrandLogo2>
                    <div className="btn close" onClick={
                        ()=>{ 
                            console.log("close!");
                            this.openCloseMenu();
                        }
                    }><Icon width={70} name={'btn-close-black'} clickFunc={()=>{}}/></div>
                    <ul className="clear-ul">
                    {topLiItems}
                    {bottomItems}</ul>
                </div>}

                <div className="hamburger-icon">
                    <Icon width={70} name={'btn-hamburger'} margin={'5px 0 0 0'} clickFunc={
                        ()=>{ 
                            console.log("mnu!");
                            this.openCloseMenu();
                        }
                    }/>
                    {/* <div className="hamburger-text">Menu</div> */}
                </div>

            </div>
        </div>
    }
}

export default MainMenu;