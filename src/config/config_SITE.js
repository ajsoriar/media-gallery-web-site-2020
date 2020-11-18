window.WEB_CONFIG = {
    title: null,
    columnsGrid: {
        maxContainerWidth:2600,
        maxNumOfColumns:13,
        minColumWidth:200,
        sideMargin:40,
        hmargin:15,
        galleryTop: 130,
        vMargin:15,
        headerOverlap: false,
        footerOverlap: false,
        showFooter: false,
        showChildrenItems: false,
    },
    hoverEffects: {
        bannerSrc: './images/brand/brand-logo-white.svg'
    },
    showGalleriesHeader: false,
    showGalleriesBg: true,
    showGoBack: true,
    showNavigationMap: true,
    fadeInAndOut: {
        showFadeIn: true,
        showFadeOut: true,
        fadeInColor: { r: 255, g: 255, b: 255},
        fadeOutColor: { r: 255, g: 255, b: 255},
        fadeInHeight: 100,
        fadeOutHeight: 75
    },
    tags:{
        curretSelectedTag: null //"COMERCIAL"
    },
    dataPath: "", //"./galleries/", //'./data/',
    rootDataFile: "galleries/golang-generated-gallery/golang-generated-gallery.json", //'my-home-data_root.json',
    aboutInfoVideoSrc: 'https://www.subidote.com/video/sources/demo2/mp4/videobg-1280x720.mp4',
    brandLogo: {
        src: './images/brand/brand-logo.svg',
        brandText: 'JOSÉ SORIA',
        size:{
            w: 513,
            h: 53
        },
        top: 15,
        color: "red"
    },
    fixedTopBrandAndMenu: true,
    viewer: {
        showImageCounters: false,
        showBrandLogo: true, //window.WEB_CONFIG.viewer.showBrandLogo:
        reversedBgColor: false,
        showNavigationArrows: true,
        hideMouse:true
    },
    welcomeScreen: { // WEB_CONFIG.welcomeScreen.background.image
        show: true,
        background: {
            color: "#d1d219",
            image: {
                "size":{
                    "w": 3593,
                    "h": 1217
                },
                "src": "./images/brand/welcome.png",
                "cropStrategy": "FILL-THE-FRAME",
                "color": "orange"
            },
        },
        brandLogo: {
            src: './images/brand/brand-logo-white.svg',
            size:{
                w: 513,
                h: 53
            },
            top: -32,
            left: -124,
            color: "white"
        },
    }
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
        {id: "MNU_1",           label: "Comercial",   type: "OPEN_GALLERY",     targetFile: './data/data.3.root.json' },
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
    // bottomOptions: [
    //     {id: "MNU_ABOUT",       label: "About",         type: "IFRAME_CONTENT", title: "About title", url: "http://www.subidote.com" },
    //     {id: "MNU_ABOUT_2",     label: "About blank!",  type: "LINK",           target: "blank", url: "http://www.subidote.com" },
    //     {id: "MNU_CLIENTS",     label: "Clients",       type: "IFRAME_CONTENT", title: "Clients title", url: "http://www.subidote.com/tv/crazy-waves/" },
    //     {id: "MNU_CONTACT",     label: "Contact",       type: "IFRAME_CONTENT", title: "Contact title", url: "./static/empty.html" }
    // ]

    bottomOptions: []
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