window.WEB_CONFIG = {
    title: null,
    columnsGrid: null,
    rowsGrid: null,
    columnsGrid: {
        maxContainerWidth:2600,
        maxNumOfColumns:13,
        minColumWidth:150,
        sideMargin:40,
        hmargin:15,
        showChildrenItems: true,
        galleryTop: 130,
        vMargin:15,
        showFooter: false,
        footerOverlap: false,
        headerOverlap: false
    },
    tags:{
        curretSelectedTag: null //"COMERCIAL"
    } //,
    //defaultsource: null
};

window.DEFAULTS ={
    FOOTER_TOP_MARGIN: 200,
    FOOTER_ROW_HEIGHT:19    
}

window.WEB_CONFIG.MAIN_MENU = {
    showTopMenu: true,
    showBotomMenu: true,
    topOptions: [
        {id: "MNU_ALL",         label: "All",         type: "TAG_FILTER",       tagName: null},
        {id: "MNU_EDITORIAL",   label: "Editorial",   type: "TAG_FILTER",       tagName: "EDITORIAL"},
        {id: "MNU_1",           label: "Comercial",   type: "TAG_FILTER",       tagName: "COMERCIAL"},
        {
            id: "MNU_2",
            label: "Film",
            type: "IFRAME_CONTENT",
            title: "Film title",
            url: "./static/empty.html",
            showCloseButton: true,
            showHeader: false
        },
        {id: "MNU_003",         label: "Personal",    type: "TAG_FILTER",       tagName: "PERSONAL"},
        {id: "MNU_4",           label: "Vacation",    type: "TAG_FILTER",       tagName: "VACATION"},
    ],
    bottomOptions: [
        {id: "MNU_ABOUT",       label: "About",         type: "IFRAME_CONTENT", title: "About title", url: "http://www.subidote.com" },
        {id: "MNU_ABOUT_2",     label: "About blank!",  type: "LINK",           target: "blank", url: "http://www.subidote.com" },
        {id: "MNU_CLIENTS",     label: "Clients",       type: "IFRAME_CONTENT", title: "Clients title", url: "http://www.subidote.com/tv/crazy-waves/" },
        {id: "MNU_CONTACT",     label: "Contact",       type: "IFRAME_CONTENT", title: "Contact title", url: "./static/empty.html" }
    ]
}

window.WEB_CONFIG.ITEMS_HOVER = {
    border: {
        isOn: true,
        color: null
    },
    zoom: {
        isOn: true,
        quantity: null
    },
    translucent: {
        isOn: true,
        opacity: "0.5"
    },
    overlay: {
        isOn: true,
        opacity: 0.5,
        color: "black",
        text: "View"
    },
    banner: {
        isOn: true,
        h: 53,
        src: "void.png"
    }
}