import React from 'react'

function MainMenu() {
    return (
        <div className="header clear" role="banner">
            <div className="logo">
                <a href="https://subidote.com">Hi, I'm LOL.</a>
            </div>
            <div className="nav clear" role="navigation">
                <ul className="clear" id="menu-principal">
                    <li id="menu-item-5" className="menu-item menu-item-type-custom menu-item-object-custom current-menu-item menu-item-has-children menu-item-5"><a target="_blank" href="http://subidote.com/tv/crazy-waves/">Work</a>
                        <ul className="sub-menu">
                            <li id="menu-item-361" className="menu-item menu-item-type-taxonomy menu-item-object-category_work menu-item-361"><a target="_blank" href="http://subidote.com/tv/crazy-waves/">Editorial</a></li>
                            <li id="menu-item-362" className="menu-item menu-item-type-taxonomy menu-item-object-category_work menu-item-362"><a target="_blank" href="http://subidote.com/tv/crazy-waves/">Commercial</a></li>
                            <li id="menu-item-363" className="menu-item menu-item-type-taxonomy menu-item-object-category_work menu-item-363"><a target="_blank" href="http://subidote.com/tv/crazy-waves/">Film</a></li>
                            <li id="menu-item-364" className="menu-item menu-item-type-taxonomy menu-item-object-category_work menu-item-364"><a target="_blank" href="http://subidote.com/tv/crazy-waves/">Personal</a></li>
                            <li id="menu-item-527" className="menu-item menu-item-type-taxonomy menu-item-object-category_work menu-item-527"><a target="_blank" href="http://subidote.com/tv/crazy-waves/">Cover</a></li>
                        </ul>
                    </li>
                    <li id="menu-item-6" className="nav-about menu-item menu-item-type-custom menu-item-object-custom menu-item-6"><a target="_blank" href="http://subidote.com/tv/crazy-waves/">About</a></li>
                    <li id="menu-item-7" className="nav-clients menu-item menu-item-type-custom menu-item-object-custom menu-item-7"><a target="_blank" href="http://subidote.com/tv/crazy-waves/">Clients</a></li>
                    <li id="menu-item-8" className="nav-contact menu-item menu-item-type-custom menu-item-object-custom menu-item-8"><a target="_blank" href="http://subidote.com/tv/crazy-waves/">Contact</a></li>
                </ul>
            </div>
        </div>
    );
}

export default MainMenu;