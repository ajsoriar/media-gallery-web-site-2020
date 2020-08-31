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
        curretSelectedTag: "COMERCIAL"
    }
};

window.WEB_MENU = {
    showTopMenu: true,
    showBotomMenu: true,
    topOptions: [
        {id: "MNU_ALL",         label: "All",         type: "TAG_FILTER",       tagName: null},
        {id: "MNU_EDITORIAL",   label: "Editorial",   type: "TAG_FILTER",       tagName: "EDITORIAL"},
        {id: "MNU_1",           label: "Comercial",   type: "TAG_FILTER",       tagName: "COMERCIAL"},
        {id: "MNU_2",           label: "Film",        type: "IFRAME_CONTENT",   url: "./static/empty.html" },
        {id: "MNU_003",           label: "Personal",    type: "TAG_FILTER",       tagName: "PERSONAL"},
        {id: "MNU_4",           label: "Vacation",    type: "TAG_FILTER",       tagName: "VACATION"},
    ],
    bottomOptions: [
        {id: "MNU_ABOUT",   label: "About",   type: "IFRAME_CONTENT",   url: "http://www.subidote.com" },
        {id: "MNU_ABOUT_2", label: "About blank!",  type: "LINK", target: "blank", url: "http://www.subidote.com" },
        {id: "MNU_CLIENTS", label: "Clients",   type: "IFRAME_CONTENT",   url: "http://www.subidote.com/tv/crazy-waves/" },
        {id: "MNU_CONTACT", label: "Contact",    type: "IFRAME_CONTENT",   url: "./static/empty.html" }
    ]
}