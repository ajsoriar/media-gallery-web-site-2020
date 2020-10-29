window.WEB_CONFIG = {
    title: null,
    columnsGrid: {
        maxContainerWidth:2600,
        maxNumOfColumns:13,
        minColumWidth:150,
        sideMargin:40,
        hmargin:15,
        galleryTop: 250,
        vMargin:15,
        headerOverlap: true,
        footerOverlap: true,
        showFooter: true,
        showChildrenItems: true
    },
    showGalleriesHeader: true,
    showGalleriesBg: true,
    tags:{
        curretSelectedTag: null //"COMERCIAL"
    },
    dataPath: './data/',
    rootDataFile: 'data.4.folder1.json', //'my-home-data_root.json',
    aboutInfoVideoSrc: 'https://www.subidote.com/video/sources/demo2/mp4/videobg-1280x720.mp4',
    brandLogo: {
        src: './images/brand/brand-logo.svg',
        brandText: 'JOSÉ SORIA LOL',
        size:{
            w: 513,
            h: 53
        }
    },
    fixedTopBrandAndMenu: true
};

window.DEFAULTS = {
    FOOTER_TOP_MARGIN: 200,
    FOOTER_ROW_HEIGHT: 18    
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
        opacity: 0.5
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
    },
    shadow: {
        isOn: true,
        color: null
    },
    overlayText: {
        isOn: false,
        color: null,
        brandText: "JOSÉ RODRÍGUEZ"
    }
}